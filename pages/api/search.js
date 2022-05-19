import { getSearch, getPlaylistItems, getTracksAudioFeatures } from '../../lib/spotify';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const {
    token: { accessToken },
  } = await getSession({ req });
  // search for playlistId
  let playlistArray = []
  for (let i = new Date().getFullYear()-1; i > 2009 ; i--) {
    let { data } = await getSearch(accessToken, 'Top Songs ' + i);
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

  // get first 50 playlistItems from playlistId
  await Promise.all(playlistArray.map(async (playlist) => {
    let { data } = await getPlaylistItems(accessToken, playlist.id);
    playlist.tracks = data.items;
  }));
  console.log(playlistArray[0])

  // await Promise.all(playlistArray.map(async (playlist) => {
  //   let features = []
  //   await Promise.all(playlist.tracks.map(async (track) => {
  //     let { data } = await getTracksAudioFeatures(accessToken, track.id);
  //     // console.log(data.items);
  //     playlist.tracks = data.items;
  //   }));
  // }))

  // get Tracks' Audio Features
    // average energy, valence, danceability
    // optional: average acousticness, loudness, tempo, instrumentalness+
    // tracks with trackId, name, artists, previewlink
  return res.status(200).json({ });
};

export default handler;
