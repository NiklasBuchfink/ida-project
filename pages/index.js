import Head from "next/head";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import ChartLoader from "../components/ChartLoader";
import Chart from "../components/Chart";

export default function Home() {
  const { data: session } = useSession()
  const [topPlaylistList, setTopPlaylistList] = useState([])
  const [year, setYear] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const didMount = useRef(false);

  const getMyTopPlaylists = async () => {
    const res = await fetch("/api/search");
    const { items } = await res.json();
    setTopPlaylistList(items);
  };

  useEffect(() => {
   if (session) {
      console.log("request")
      getMyTopPlaylists();
      didMount.current = true;
    } else {
      didMount.current = false;
    }
  }, [session])
  
  function toggleModal() {
    if (data) {
      setIsOpen(!isOpen);
    }
  }

  function svgExport() {
    // //get svg element.
    let svg = document.getElementsByTagName("svg")[0];

    // //get svg source.
    let serializer = new XMLSerializer();
    let source = serializer.serializeToString(svg);

    let svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    let svgUrl = URL.createObjectURL(svgBlob);
    let downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "recap_my_music.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  function download(url) {
    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
          <title>RECAP_MY_MUSIC</title>
          <meta
            name="description"
            content="Recap your music taste by logging in to your Spotify Account."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="relative h-screen w-full ">
          {/* <p>Signed in as {session?.token?.email}</p> */}
          <button
            className="helvetica absolute left-0 z-[199] mt-4 ml-6 cursor-pointer text-base font-bold tracking-wider"
            onClick={() => signOut()}
          >
            RECAP_MY_MUSIC
          </button>
          <div className="absolute right-0 z-[199] mt-4 mr-6">
            <Link href="/about">
              <a className="helvetica text-base font-bold uppercase tracking-wider">
                about
              </a>
            </Link>
          </div>

          <div className="absolute flex h-full w-full items-center justify-center p-6 pb-10">
            {topPlaylistList.length > 0 ? (
              <>
                <Chart size={1000} data={topPlaylistList[year]} />
                <div className="absolute top-6 flex gap-4 w-24">
                  <button
                    style={{visibility: (year !== topPlaylistList.length - 1) ? 'visible' : 'hidden' }}
                    onClick={()=>setYear(prevState=> prevState - 1)}
                  >
                    &#60;
                  </button>
                  <div>
                    {topPlaylistList[year].year}
                  </div>
                  <button
                    style={{visibility: (year !== 0) ? 'visible' : 'hidden' }}
                    onClick={()=>setYear(prevState=> prevState + 1)}
                  > 
                    &#62; 
                  </button> 
                </div>
                <button
                  className="absolute right-6 cursor-pointer"
                  onClick={toggleModal}
                >
                  MORE_INFO
                </button>
                <button
                  className="absolute left-6 cursor-pointer"
                  onClick={svgExport}
                >
                  EXPORT
                </button>
              </>
            ) : (
              <ChartLoader size={1000} />
            )}
          </div>

          <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            contentLabel="Legend dialog"
            style={customStyles}
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
      <Head>
        <title>RECAP_MY_MUSIC</title>
        <meta
          name="description"
          content="Recap your music taste by logging in to your Spotify Account."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="helvetica absolute right-0 mt-4 mr-6 text-base font-bold uppercase tracking-wider ">
        <Link href="/about">about</Link>
      </div>

      <div className="m-auto flex h-screen flex-col items-center justify-center space-y-3 overflow-hidden">
        <p className="title text-2xl font-bold">RECAP_MY_MUSIC</p>
        <p className="max-w-[500px] p-3 text-center">
          Log in with your personal Spotify account to make your listening habits
          visually tangible, comparable and shareable.
        </p>
        <button
          className="helvetica w-fit cursor-pointer rounded-full border-2 border-dotted border-white px-12 py-2 text-base font-bold text-white hover:border-gray-300 active:bg-gray-500 "
          onClick={() => signIn("spotify")}
        >
          LOG IN WITH SPOTIFY
        </button>

        <p className="max-w-[500px] p-3 text-center">
          or use a data sample{" "}
          <span className="underline">
            <Link href="/sample">from the creators</Link>
          </span>
          .
        </p>
      </div>
    </>
  );
}
