import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-mail",
  "playlist-read-private",
  "user-read-private",
  "user-read-recently-played",
].join(',');

const params = {
  scopes: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = "https://accounts.spotify.com/authorize?" + queryParamString.toString();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };