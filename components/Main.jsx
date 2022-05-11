import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";

export default function Main() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      }, (err) => {
        console.log("Something went wrong!", err);
      });
    }
  }, [session, spotifyApi]);

  console.log(session);
  console.log(playlists);

  return (
    <div className="">
      <h1>Main element</h1>
      <p>{session?.user.name}</p>
      <img className="w-10 h-10" src={session?.user.image} alt="Profile pic"></img>
    </div>
  );
}
