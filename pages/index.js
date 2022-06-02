import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import MusicDisc from "../components/MusicDisc";

import Chart from "../components/Chart";

export default function Home() {
  const { data: session } = useSession();
  const [playlistsList, setPlaylistsList] = useState([]);
  const [topArtistsList, setTopArtistsList] = useState([]);
  const [topTracksList, setTopTracksList] = useState([]);
  const [topPlaylistList, setTopPlaylistList] = useState([]);
  const [data, setData] = useState(null);

  const didMount = useRef(false);

  const getMyTopPlaylists = async () => {
    const res = await fetch("/api/search");
    const { items } = await res.json();
    setTopPlaylistList(items);
  };

  useEffect(() => {
    if (didMount.current) {
      console.log(topPlaylistList);
      if (topPlaylistList.length > 0) {
        setData(topPlaylistList[0]);
      }
    } else {
      getMyTopPlaylists()
      didMount.current = true;
    }
  }, [topPlaylistList]);

  if (session) {
    return (
      <>
        <Head>
          <title>Recap_My_Music</title>
          <meta
            name="description"
            content="Recap your music taste by logging in to your Spotify Account."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="relative w-full h-screen ">
          <div className="absolute w-full p-4 z-[199]">
            {/* <p>Signed in as {session?.token?.email}</p> */}
            <button
              className="absolute uppercase font-bold text-2xl cursor-pointer"
              onClick={() => signOut()}
            >
              Recap_My_Music
            </button>
            <div className="absolute uppercase right-0 font-bold text-md mt-1 mr-3">
              <Link href="/about">about</Link>
            </div>
          </div>
          <div className="flex absolute w-full h-full justify-center items-center p-3">
            {data && <Chart size={1000} data={data} />}
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <p className="absolute uppercase font-bold text-2xl m-3">
        Recap_My_Music
      </p>
      <div className="absolute uppercase right-0 font-bold text-md mt-4 mr-3">
        <Link href="/about">about</Link>
      </div>
      <div className="flex items-center justify-center h-screen max-w-7xl m-auto">
        <div className="relative m-6 bg-white bg-opacity-10 text-center pt-6 w-full aspect-square">
          Not signed in <br />
          <p className="text-md font-bold"></p>
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 space-y-3">
            <p>Discover your taste in music visualized!</p>
            <p>
              Please note: In order to create the visualization <br />
              we need your permission to access your Spotify data.
            </p>
            <button
              onClick={() => signIn("spotify")}
              className=" bg-black text-white font-bold px-6 py-4 w-fit cursor-pointer"
            >
              LOG IN
            </button>
          </div>
          <span className="absolute bottom-3 font-bold left-3">YOUR</span>
          <span className="absolute bottom-3 font-bold right-3">2021</span>
          <span className="absolute top-3 font-bold left-3">YOUR</span>
          <span className="absolute top-3 font-bold right-3">GENRE</span>
        </div>
      </div>
    </>
  );
}
