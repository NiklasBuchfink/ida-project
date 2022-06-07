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
  const [year, setYear] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const didMount = useRef(false);

  const getMyTopPlaylists = async () => {
    const res = await fetch("/api/search");
    const { items } = await res.json();
    setTopPlaylistList(items);
  };

  useEffect(() => {
    if (session) {
      getMyTopPlaylists();
      didMount.current = true;
    } else {
      didMount.current = false;
    }
  }, [session]);

  function toggleModal() {
    if (topPlaylistList.length > 0) {
      setIsOpen(!isOpen);
    }
  }

  function svgExport() {
    // //get svg element.
    let svg = document.getElementsByTagName("svg")[0];

    // //get svg source.
    let serializer = new XMLSerializer();
    let source = serializer.serializeToString(svg);

    let svgBlob = new Blob([source], { type: "image/svg;charset=utf-8" });
    let svgUrl = URL.createObjectURL(svgBlob);
    let downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "recap_my_music.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      inset: "50% 40px 40px 50%",
      transform: "translate(-50%, -50%)",

      //right: "auto",
      //bottom: "auto",
      //marginRight: "-50%",
      //filter: "blur(6px)",
      backgroundColor: "hsla(0 ,0% , 0%, 0.85)",
      border: "dotted 2px white",
    },
    overlay: {
      
      backgroundColor: "hsla(0, 0%, 0%, 0.4)",
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
          <link rel="icon" href="../public/favicon.ico" />
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
                <div className="absolute top-6 flex w-24 gap-4">
                  <button
                    style={{
                      visibility:
                        year !== topPlaylistList.length - 1
                          ? "visible"
                          : "hidden",
                    }}
                    onClick={() => setYear((prevState) => prevState + 1)}
                  >
                    &#60;
                  </button>
                  <div>{topPlaylistList[year].year}</div>
                  <button
                    style={{ visibility: year !== 0 ? "visible" : "hidden" }}
                    onClick={() => setYear((prevState) => prevState - 1)}
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

                <Modal
                  isOpen={isOpen}
                  onRequestClose={toggleModal}
                  ariaHideApp={false}
                  contentLabel="Legend dialog"
                  style={customStyles}
                  closeTimeoutMS={200}
                >
                  <div className="p-4 text-center text-white">
                    <div className="helvetica text-2xl font-bold tracking-wide">
                      MY_MUSIC_STATS (AVG)
                    </div>
                    <div className="mt-2 mb-8 space-y-2">
                      <p>
                        Danceability:{" "}
                        <span className="underline">
                          {Math.round(
                            topPlaylistList[year].features.danceability * 100
                          )}
                          %
                        </span>
                      </p>
                      <p>
                        Energy:{" "}
                        <span className="underline">
                          {Math.round(
                            topPlaylistList[year].features.energy * 100
                          )}
                          %
                        </span>
                      </p>
                      <p>
                        Valence:{" "}
                        <span className="underline">
                          {Math.round(
                            topPlaylistList[year].features.valence * 100
                          )}
                          %
                        </span>
                      </p>
                      <p>
                        Tempo:{" "}
                        <span className="underline">
                          {Math.round(topPlaylistList[year].features.tempo)} bpm
                        </span>
                      </p>
                    </div>
                    <div className="helvetica text-2xl font-bold tracking-wide">
                      ABOUT_THE_AURA
                    </div>
                    <div className="m-auto max-w-[500px] text-justify leading-[1.4] space-y-4">
                      <p>
                        The aura is the colorful circle that surrounds your most
                        listened tracks of the year. It’s generated based on
                        your the positivity and energy values of these tracks.
                      </p>
                      <p>
                        The center color represents your average positivity. If
                        you’ve listened mostly to sad songs it will be blueish
                        instead of green or yellow.
                      </p>
                      <p>
                        Meanwhile the outer color represents the average energy
                        value of your songs. If, for example, you have listened
                        only to fast hardcore songs your outer aura probably
                        will be some hue of red.
                      </p>
                    </div>
                    <button
                      className="absolute bottom-6 cursor-pointer font-bold"
                      onClick={toggleModal}
                    >
                      Close
                    </button>
                  </div>
                </Modal>
              </>
            ) : (
              <ChartLoader size={1000} />
            )}
          </div>
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
        <link rel="icon" href="../public/favicon.ico" />
      </Head>
      <div className="helvetica absolute right-0 mt-4 mr-6 text-base font-bold uppercase tracking-wider ">
        <Link href="/about">about</Link>
      </div>

      <div className="m-auto flex h-screen flex-col items-center justify-center space-y-3 overflow-hidden">
        <p className="title text-2xl font-bold">RECAP_MY_MUSIC</p>
        <p className="max-w-[500px] p-3 text-center">
          Log in with your personal Spotify account to make your listening
          habits visually tangible, comparable and shareable.
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
