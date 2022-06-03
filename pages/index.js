import Head from "next/head";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import ChartLoader from "../components/ChartLoader";
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
      getMyTopPlaylists();
      didMount.current = true;
    }
  }, [topPlaylistList]);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgba(cc,cc,cc,0.5)",
    },
    overlay: {
      backgroundColor: "rgba(ff,ff,ff,0.1)",
    },
  };

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

        <div className="relative h-screen w-full ">
          {/* <p>Signed in as {session?.token?.email}</p> */}
          <button
            className=" helvetica absolute left-0 z-[199] mt-4 ml-3 cursor-pointer text-base font-bold uppercase"
            onClick={() => signOut()}
          >
            Recap_My_Music
          </button>
          <div className="absolute right-0 z-[199] mt-4 mr-3">
            <Link href="/about">
              <a className="helvetica text-base font-bold uppercase">about</a>
            </Link>
          </div>

          <div className="absolute flex h-full w-full items-center justify-center p-6 pb-10">
            {data ? (
              <Chart size={1000} data={data} />
            ) : (
              <ChartLoader size={1000} />
            )}
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
            style={customStyles}
            // overlayClassName=""
            closeTimeoutMS={200}
          >
            <div className="text-black">
              <div className="text-2xl font-bold">You_Music_Recap</div>
              <div className="mt-2 mb-8">
                <p>Danceability: 72%</p>
                <p>Energy: 70%</p>
                <p>Valence: 60%</p>
                <p>Tempo: 123 bpm</p>
              </div>
              <button
                className="absolute bottom-6 cursor-pointer font-bold"
                onClick={toggleModal}
              >
                Close
              </button>
            </div>
          </Modal>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="absolute right-0 mt-4 mr-3">
        <Link href="/about">
          <a className="helvetica text-base font-bold uppercase ">about</a>
        </Link>
      </div>

      <div className="m-auto flex h-screen flex-col items-center justify-center space-y-3 overflow-hidden">
        <p className="title text-2xl font-bold uppercase">Recap_My_Music</p>
        <p className="max-w-[500px] p-3 text-center">
          Log in with your Spotify account to make your auditory listening habit
          based on individual shapes and colors visually tangible, shareable and
          comparable.
        </p>
        <button
          className="helvetica w-fit cursor-pointer rounded-full border-2 border-dotted border-white px-12 py-2 text-base font-bold text-white hover:border-gray-300 active:bg-gray-500 "
          onClick={() => signIn("spotify")}
        >
          LOG IN WITH SPOTIFY
        </button>

        <p className="max-w-[500px] p-3 text-center">
          or use data{" "}
          <a className="helvetica font-bold uppercase underline" href="#">
            from the creators
          </a>
          .
        </p>
      </div>
    </>
  );
}
