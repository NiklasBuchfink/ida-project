import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";

export default function Main() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

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
          setTopArtists(data.body.items);
        },
        (err) => {
          console.log("Something went wrong!", err);
        }
      );

      spotifyApi.getMyTopTracks().then(
        (data) => {
        setTopTracks(data.body.items);
      }, function(err) {
        console.log('Something went wrong!', err);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div>
      <h1>Main element</h1>
      <p>{session?.user.name}</p>
      {session?.user.image
        ? <Image
            className="w-10 h-10"
            src={session?.user.image}
            alt="Profile pic"
          /> 
        : null
      }
      
      <div className="flex gap-8 mt-8">
        <div>
          <h2>Playlists</h2>
          <ul className="flex flex-col gap-2 mt-2">
            {playlists.map(playlist =>
              <li className="cursor-pointer" key={playlist.id}>{playlist.name}</li>
            )}
          </ul>
        </div>
        
        <div>
          <h2>Top Artists</h2>
          <ul className="flex flex-col gap-2 mt-2">
            {topArtists.map(topArtist =>
              <li className="cursor-pointer" key={topArtist.id}>{topArtist.name}</li>
            )}
          </ul>
        </div>

        <div>
          <h2>Top Tracks</h2>
          <ul className="flex flex-col gap-2 mt-2">
            {topTracks.map(topTrack =>
              <li className="cursor-pointer" key={topTrack.id}>{topTrack.name}</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
