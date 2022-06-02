import Head from "next/head";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import ChartLoader from "../components/ChartLoader"
import Chart from "../components/Chart";

export default function Home() {
  const { data: session } = useSession();
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
          <div className="flex absolute w-full h-full justify-center items-center p-6 pb-10">
            {data 
              ? <Chart size={1000} data={data} /> 
              : <ChartLoader size={1000} />
            }
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="absolute uppercase right-0 font-bold text-base mt-4 mr-3">
        <Link href="/about">about</Link>
      </div>

      <div className="flex flex-col items-center justify-center h-screen m-auto space-y-3 overflow-hidden">
        <p className="title uppercase font-bold text-2xl">Recap_My_Music</p>
        <p className="max-w-[500px] p-3 text-center">
          Log in with your Spotify account to make your auditory listening
          habit based on individual shapes and colors visually tangible,
          shareable and comparable.
        </p>
        <button
          className="text-white border-white border-2 border-dotted font-bold text-base px-12 py-2 w-fit cursor-pointer rounded-full helvetica "
          onClick={() => signIn("spotify")}
        >
          LOG IN
        </button>
      </div>
    </>
  );
}
