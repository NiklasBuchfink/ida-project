import { getSpotify } from '../../lib/spotify';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const {
    token: { accessToken },
  } = await getSession({ req });

  let playlistArray = []
  // 2009
  for (let i = new Date().getFullYear()-1; i > 2020 ; i--) {
    let { data } = await getSpotify(accessToken, "https://api.spotify.com/v1/search", {
        q: 'Top Songs ' + i,
        type: "playlist",
        limit: 5
    });
    for (let j = 0; j < data.playlists.items.length; j++) {
      if (
          data.playlists.items[j].owner.uri === "spotify:user:spotify"
          && data.playlists.items[j].name.search('Your Top Songs ' + i) !== -1  
        ) {
        playlistArray.push({
          year: i, 
          name: data.playlists.items[j].name,
          id: data.playlists.items[j].id
        })
        break
      }
    }
  }

  await Promise.all(playlistArray.map(async (playlist) => {
    let { data } = await getSpotify(accessToken, `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
        playlist_id: playlist.id,
        fields: "items(track(id, name, artists, album, preview_url))",
        limit: 100
    })
    playlist.tracks = data.items;
  }));

  await Promise.all(playlistArray.map(async (playlist) => {
    // Audio Features
    let features = {
      "danceability": 0,
      "energy": 0,
      "valence": 0,
      "tempo": 0
    }

    let trackIds = [];
    playlist.tracks.map( (track) => {
        trackIds.push(track.track.id);
    });
        
    let { data } = await getSpotify(accessToken, "https://api.spotify.com/v1/audio-features/", { ids: trackIds.join(',') })
    
    playlist.tracks.map( (track, index) => {
      features.danceability += data.audio_features[index].danceability
      features.energy += data.audio_features[index].energy
      features.valence += data.audio_features[index].valence
      features.tempo += data.audio_features[index].tempo;
      track.track.features = {
        danceability: data.audio_features[index].danceability,
        energy: data.audio_features[index].energy,
        valence: data.audio_features[index].valence,
        tempo: data.audio_features[index].tempo
      }
    });
    let tracksNum = playlist.tracks.length
    features.danceability = features.danceability / tracksNum
    features.energy = features.energy / tracksNum
    features.valence = features.valence / tracksNum
    features.tempo = features.tempo / tracksNum
    playlist.features = features

    // Genre
    let albumIds = [];
    let artistIds = [];
    let trackArtistsLength = [];
    playlist.tracks.map( (track) => {
      albumIds.push(track.track.album.id)
      trackArtistsLength.push(track.track.artists.length)
      track.track.artists.map( (artist) => {
        artistIds.push(artist.id)
      })
    })

    let albumGenre = [];
    for (let i = 0; Math.floor(albumIds.length / 20); i++) {
      let { data } = await getSpotify(accessToken, "https://api.spotify.com/v1/albums", { ids: albumIds.splice(0,20).join(',') })
      data.albums.map( (album)=> {
        albumGenre.push(album.genres)
      })      
    }

    let artistGenre = [];
    while (artistIds.length > 0) {
      if (artistIds.length <= 50) {
        let { data } = await getSpotify(accessToken, "https://api.spotify.com/v1/artists", { ids: artistIds.splice(0,artistIds.length).join(',') })
        data.artists.map( (artist)=> {
          artistGenre.push(artist.genres)
        })
        break;
      }
      let { data } = await getSpotify(accessToken, "https://api.spotify.com/v1/artists", { ids: artistIds.splice(0,50).join(',') })
      data.artists.map( (artist)=> {
        artistGenre.push(artist.genres)
      })
    }

    playlist.tracks.map( (track, index) => {
      let allGenres = [];
      albumGenre[index].map( (genre) => {
        allGenres.push(genre);
      })

      for (let i = 0; i < trackArtistsLength[index]; i++) {
        artistGenre[0].map( (genre) => {
          allGenres.push(genre)
        })
        artistGenre.shift()
      }

      if (allGenres.length === 0) {
        allGenres.push('unclassified genre')
      }

      track.track.genre = {
        main: null,
        sub: null,
        all: allGenres
      }
    })
    
    let playlistGenre = {
      main: {},
      sub: {}
    }

    playlist.tracks.map( (track) => {
      track.track.genre.all.map( (trackGenre) => {
        if (playlistGenre.sub.hasOwnProperty(trackGenre)) {
          playlistGenre.sub[trackGenre]++
        } else {
          playlistGenre.sub[trackGenre] = 1
        }
      })
    })

    function sortObject(obj) {
      let arr = [];
      for (let prop in obj) {
          if (obj.hasOwnProperty(prop)) {
              arr.push({
                  'genre': prop,
                  'value': obj[prop]
              });
          }
      }
      arr.sort(function(a, b) { return b.value - a.value; });
      //arr.sort(function(a, b) { a.value.toLowerCase().localeCompare(b.value.toLowerCase()); }); //use this to sort as strings
      return arr;
    }

    playlistGenre.sub = sortObject(playlistGenre.sub)
    playlist.genre = playlistGenre

  }))
  
  return res.status(200).json({ items: playlistArray });
};

export default handler;
