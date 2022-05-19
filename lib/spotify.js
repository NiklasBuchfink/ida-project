
import axios from 'axios'

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';
const TOPARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists';
const TOPTRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50';

const getAccessToken = async (refresh_token) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

export const getUsersPlaylists = async (refresh_token) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getUsersTopArtists = async (refresh_token) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(TOPARTISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getUsersTopTracks = async (refresh_token) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(TOPTRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getPlaylistItems = async (refresh_token, playlistId) => {
  const { access_token } = await getAccessToken(refresh_token);
  return await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
          Authorization: `Bearer ${access_token}`
      },
      params: {
        playlist_id: playlistId,
        fields: "items(track(id, name, artists, preview_url))",
        limit: 50
      }
  })
}

export const getSearch = async (refresh_token, searchTerm) => {
  const { access_token } = await getAccessToken(refresh_token);
  return await axios.get("https://api.spotify.com/v1/search", {
      headers: {
          Authorization: `Bearer ${access_token}`
      },
      params: {
          q: searchTerm,
          type: "playlist",
          limit: 5
      }
  })
}

export const getTracksAudioFeatures = async (refresh_token, trackId) => {
  const { access_token } = await getAccessToken(refresh_token);
  return await axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
      headers: {
          Authorization: `Bearer ${access_token}`
      },
      params: {
        id: trackId,
      }
  })
}
