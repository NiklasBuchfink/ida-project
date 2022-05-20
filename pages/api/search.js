import { getSearch, getPlaylistItems, getTracksAudioFeatures } from '../../lib/spotify';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const {
    token: { accessToken },
  } = await getSession({ req });
  // search for playlistId
  let playlistArray = []
  // 2009
  for (let i = new Date().getFullYear()-1; i > 2020 ; i--) {
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

  await Promise.all(playlistArray.map(async (playlist) => {
    let { data } = await getPlaylistItems(accessToken, playlist.id);
    playlist.tracks = data.items;
  }));

  await Promise.all(playlistArray.map(async (playlist) => {
    let features = {
      "danceability": null,
      "energy": null,
      "valence": null,
    }
    let danceabilitySum = 0
    let energySum = 0
    let valenceSum = 0
    let tempoSum = 0
    await Promise.all(playlist.tracks.map(async (track) => {
      let { data } = await getTracksAudioFeatures(accessToken, track.track.id);
      danceabilitySum += data.danceability
      energySum += data.energy
      valenceSum += data.valence
      tempoSum += data.tempo;
      track.track.features = {
        danceability: data.danceability,
        energy: data.energy,
        valence: data.valence,
        tempo: data.tempo
      }
    }));
    let tracksNum = playlist.tracks.length
    features.danceability = danceabilitySum / tracksNum
    features.energy = energySum / tracksNum
    features.valence = valenceSum / tracksNum
    features.tempo = tempoSum / tracksNum
    playlist.features = features
  }))

  return res.status(200).json({ items: playlistArray });
};

export default handler;
