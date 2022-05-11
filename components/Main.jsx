import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";

export default function Main() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then(
        (data) => {
          setPlaylists(data.body.items);
        },
        (err) => {
          console.log("Something went wrong!", err);
        }
      );

      spotifyApi.getMyTopArtists().then(
        (data) => {
          setTopArtists(data.body.items)
        },
        (err) => {
          console.log("Something went wrong!", err);
        }
      );
    }
  }, [session, spotifyApi]);

  console.log(session);
  console.log(playlists);
  console.log(topArtists)

  return (
    <div className="">
      <h1>Main element</h1>
      <p>{session?.user.name}</p>
      <img
        className="w-10 h-10"
        src={session?.user.image}
        alt="Profile pic"
      ></img>

      <p>Playlists</p>
      {playlists.map((playlist) => {
        <p key={playlist.id} className="cursor-pointer">
          {playlist.name}
        </p>;
      })}
            <p>Top Artists</p>
      {topArtists.map((topArtist) => {
        <p key={topArtist.id} className="cursor-pointer">
          {topArtist.name}
        </p>;
      })}
    </div>
  );
}
