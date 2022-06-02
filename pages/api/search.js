import { getSpotify } from '../../lib/spotify';
import { getSession } from 'next-auth/react';
import { topLevelGenre, mostPopularGenre, subLevelGenre } from '/lib/subgenre.js';

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
        limit: 50
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
    playlist.tracks.map( (track, index) => {
        trackIds.push(track.track.id);
        track.track.ranking = index;
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
    while (albumIds.length > 0) {
      if (albumIds.length <= 20) {
        let { data } = await getSpotify(accessToken, "https://api.spotify.com/v1/albums", { ids: albumIds.splice(0,albumIds.length).join(',') })
        data.albums.map( (album)=> {
          albumGenre.push(album.genres)
        })
        break;
      }
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
/*       console.log(albumGenre)
      albumGenre[index].map( (genre) => {
        allGenres.push(genre);
      })
 */
      for (let i = 0; i < trackArtistsLength[index]; i++) {
        artistGenre[0].map( (genre) => {
          allGenres.push(genre)
        })
        artistGenre.shift()
      }

      if (allGenres.length === 0) {
        allGenres.push('unclassified genre')
      }

      // get mainGenre
      let mainGenre = 'unclassified genre';
      let mainObj = {};
      allGenres.map ((trackGenre) => {
        let topLevel = topLevelGenre(trackGenre)
        if (topLevel === 'unclassified genre') {
          if (trackGenre.includes('pop')) {
            topLevel = 'pop'
          } else if (trackGenre.includes('house')) {
            topLevel = 'house'
          } else if (trackGenre.includes('r&b')) {
            topLevel = 'r&b'
          } else if (trackGenre.includes('hip hop')) {
            topLevel = 'hip hop'
          } else if (trackGenre.includes(' z ')) {
            topLevel = 'indie'
          }
        }
        if (mainObj.hasOwnProperty(topLevel)) {
          mainObj[topLevel]++
        } else {
          mainObj[topLevel] = 1
        }
      })

      let mainArr = sortObject(mainObj)
      if (mainArr.length > 1) {
        // same value -> popularity
        if (mainArr[0].value === mainArr[1].value) {
          let genreArr = []
          mainArr.map( (trackGenre) => {
            genreArr.push(trackGenre.genre)
          })
          mainGenre = mostPopularGenre(genreArr)
        } else {
          mainArr.map( (trackGenre) => {
            if (trackGenre.genre !== 'unclassified genre') {
              mainGenre = trackGenre.genre
            }
          })
          mainGenre = mainArr[0].genre
        }
      } else {
        mainGenre = mainArr[0].genre
      }
      
      
      // get subGenre
      let subGenre = 'unclassified genre';
      let subObj = {};
      allGenres.map ((trackGenre) => {
        let topLevel = subLevelGenre(trackGenre)
        if (topLevel === 'unclassified genre') {
          topLevel = trackGenre
          // if (trackGenre.includes('pop')) {
          //   topLevel = 'pop'
          // } else if (trackGenre.includes('house')) {
          //   topLevel = 'house'
          // } else if (trackGenre.includes('r&b')) {
          //   topLevel = 'r&b'
          // } else if (trackGenre.includes('hip hop')) {
          //   topLevel = 'hip hop'
          // } else if (trackGenre.includes(' z ')) {
          //   topLevel = 'indie'
          // }
        }
        if (subObj.hasOwnProperty(topLevel)) {
          subObj[topLevel]++
        } else {
          subObj[topLevel] = 1
        }
      })

      let subArr = sortObject(subObj)
      if (subArr.length > 1) {
        // same value -> popularity
        if (subArr[0].value === subArr[1].value) {
          let genreArr = []
          subArr.map( (trackGenre) => {
            genreArr.push(trackGenre.genre)
          })
          subGenre = mostPopularGenre(genreArr)
        } else {
          subArr.map( (trackGenre) => {
            if (trackGenre.genre !== 'unclassified genre') {
              subGenre = trackGenre.genre
            }
          })
          subGenre = subArr[0].genre
        }
      } else {
        subGenre = subArr[0].genre
      }

      track.track.genre = {
        main: mainGenre,
        sub: subGenre,
        all: allGenres
      }
    })
    
    let playlistGenre = {
      main: {},
      sub: {},
      all: {}
    }

    playlist.tracks.map( (track) => {
      track.track.genre.all.map( (trackGenre) => {
        if (playlistGenre.all.hasOwnProperty(trackGenre)) {
          playlistGenre.all[trackGenre]++
        } else {
          playlistGenre.all[trackGenre] = 1
        }
      })
      if (playlistGenre.sub.hasOwnProperty(track.track.genre.sub)) {
        playlistGenre.sub[track.track.genre.sub]++
      } else {
        playlistGenre.sub[track.track.genre.sub] = 1
      }
      if (playlistGenre.main.hasOwnProperty(track.track.genre.main)) {
        playlistGenre.main[track.track.genre.main]++
      } else {
        playlistGenre.main[track.track.genre.main] = 1
      }
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

    playlistGenre.all = sortObject(playlistGenre.all)
    playlistGenre.sub = sortObject(playlistGenre.sub)
    playlistGenre.main = sortObject(playlistGenre.main)
    playlist.genre = playlistGenre

  }))
  
  return res.status(200).json({ items: playlistArray });
};

export default handler;
