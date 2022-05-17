
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';
const TOPARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists';
const TOPTRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50';

const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search?query='
const SEARCH = 'https://api.spotify.com/v1/search?q=Top%20Songs%202020&type=playlist&limit=5'
// https://api.spotify.com/v1/search?q=Top%20Songs%20....&type=playlist"
// tracksofplaylist:	/v1/playlists/{playlist_id}/tracks

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

export const getSearch = async (refresh_token, searchTerm, searchType, limit) => {
  const { access_token } = await getAccessToken(refresh_token);
  const API_URL = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=${searchType}&limit=${limit}`;
  return fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

