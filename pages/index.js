import Head from "next/head";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import ChartLoader from "../components/ChartLoader"
import Chart from "../components/Chart";

export default function Home() {
  const { data: session } = useSession();
  const [topPlaylistList, setTopPlaylistList] = useState([]);
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  
  const didMount = useRef(false);

  const getMyTopPlaylists = async () => {
    const res = await fetch("/api/search");
    const { items } = await res.json();
    setTopPlaylistList(items);
  };

  useEffect(() => {
    if (didMount.current && session) {
      console.log(topPlaylistList);
      if (topPlaylistList.length > 0) {
        setData(topPlaylistList[0]);
      }
    } else {
      getMyTopPlaylists()
      didMount.current = true;
    }
  }, [topPlaylistList]);
  
  function toggleModal() {
    setIsOpen(!isOpen);
  }

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
              className=" helvetica absolute uppercase font-bold text-md cursor-pointer"
              onClick={() => signOut()}
            >
              Recap_My_Music
            </button>
            <div className=" helvetica absolute uppercase right-0 font-bold text-md mt-1 mr-3">
              <Link href="/about">about</Link>
            </div>
          </div>
          <div className="flex absolute w-full h-full justify-center items-center p-6 pb-10">
            {data 
              ? <Chart size={1000} data={data} /> 
              : <ChartLoader size={1000} />
            }
            <button
              className="absolute bottom-6 cursor-pointer"
              onClick={toggleModal}
            >
              ???_LEGEND
            </button>
          </div>

          <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            contentLabel="Legend dialog"
          >
            <div>You_Music_Recap</div>
            <button
              className="absolute bottom-6 cursor-pointer" 
              onClick={toggleModal}>Close
            </button>
          </Modal>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="absolute helvetica uppercase right-0 font-bold text-base mt-4 mr-3">
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
          className="text-white border-white border-2 border-dotted font-bold text-base px-12 py-2 w-fit cursor-pointer rounded-full helvetica hover:bg-gray-900 "
          onClick={() => signIn("spotify")}
        >
          LOG IN WITH SPOTIFY
        </button>

        <p className="max-w-[500px] p-3 text-center">
          or use data <a className="underline" href="#">from the creators</a>.
        </p>
      </div>
    </>
  );
}
