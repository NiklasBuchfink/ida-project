import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Modal from "react-modal";
import Chart from "../components/Chart";
import ChartLoader from "../components/ChartLoader";
import { creatorData } from "../lib/data/niklasData";

export default function Creators({ localData }) {
  const [year, setYear] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Head>
        <title>SAMPLE</title>
        <meta
          name="description"
          content="This page visualize a data sample of the creators."
        />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="relative h-screen w-full ">
        <div className="absolute right-0 z-[100] mt-4 mr-6">
          <Link href="/">
            <a className="helvetica text-base font-bold tracking-wider">BACK</a>
          </Link>
        </div>

        <div className="absolute flex h-full w-full items-center justify-center py-16 px-0 md:px-16">
          {localData.length > 0 ? (
            <>
            
              {/* -----DATA CHART----- */}
              <Chart size={1000} data={localData[year]} />

              {/* -----UI----- */}
              <div className=" helvetica absolute top-10 flex w-24 items-center gap-2 text-base font-bold sm:top-2">
                <button
                  className="p-2 font-bold"
                  style={{
                    visibility:
                      year !== localData.length - 1 ? "visible" : "hidden",
                  }}
                  onClick={() => setYear((prevState) => prevState + 1)}
                >
                  &#60;
                </button>
                <div className="">{localData[year].year}</div>
                <button
                  className="p-2 font-bold"
                  style={{
                    visibility: year !== 0 ? "visible" : "hidden",
                  }}
                  onClick={() => setYear((prevState) => prevState - 1)}
                >
                  &#62;
                </button>
              </div>
              <div className="absolute top-4 w-full -translate-y-[calc(-50%+1rem-0.6px)] md:top-1/2">
                <button
                  className="helvetica absolute left-6 right-auto cursor-pointer text-base font-bold tracking-wider md:right-6 md:left-auto"
                  onClick={toggleModal}
                >
                  MORE_INFO
                </button>
              </div>

              {/* ----MODAL----- */}
              <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                ariaHideApp={false}
                contentLabel="Legend dialog"
                style={{
                  content: {
                    inset: "0px 0px 0px 0px",
                    zIndex: "199",
                    backgroundColor: "hsla(0 ,0% , 0%, 0)",
                    border: "none",
                  },
                  overlay: {
                    zIndex: "199",
                    backgroundColor: "hsla(0, 0%, 0%, 0.9)",
                  },
                }}
                closeTimeoutMS={200}
              >
                <div className="flex h-full flex-col items-center justify-center space-y-16 p-4 text-center text-white">
                  <div className="">
                    <p className="helvetica text-2xl font-bold tracking-wider">
                      MY_MUSIC_STATS
                    </p>
                    <div className="mt-2 space-y-2">
                      <p>
                        Danceability:{" "}
                        <span className="underline">
                          {Math.round(
                            localData[year].features.danceability * 100
                          )}
                          %
                        </span>
                      </p>
                      <p>
                        Energy:{" "}
                        <span className="underline">
                          {Math.round(localData[year].features.energy * 100)}%
                        </span>
                      </p>
                      <p>
                        Positivity:{" "}
                        <span className="underline">
                          {Math.round(localData[year].features.valence * 100)}%
                        </span>
                      </p>
                      <p>
                        Tempo:{" "}
                        <span className="underline">
                          {Math.round(localData[year].features.tempo)} bpm
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="helvetica text-2xl font-bold tracking-wider">
                      ABOUT_THE_AURA
                    </p>
                    <div className="m-auto mt-2 max-w-[500px] space-y-4 text-justify leading-[1.4]">
                      <p>
                        The aura is the colorful circle that surrounds your most
                        listened tracks of the year. It&#39;s generated based on
                        the positivity and energy values of these tracks.
                      </p>
                      <p>
                        The center color represents your average positivity. If
                        you&#39;ve listened mostly to sad songs it will be
                        blueish instead of green or yellow.
                      </p>
                      <p>
                        Meanwhile the outer color represents the average energy
                        value of your songs. If for example you have listened
                        only to fast hardcore songs your outer aura probably
                        will be some hue of red.
                      </p>
                    </div>
                    <div className="mt-6">
                      <p>Positivity</p>
                      <div className="flex justify-center">
                        <span>Less</span>
                        <div className="mt-[1px] px-4">
                          <Image
                            src="/valence.svg"
                            width="200"
                            height="10"
                            preload="true"
                          />
                        </div>
                        <span>More</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <p>Energy</p>
                      <div className="mb-4 flex justify-center">
                        <span>Less</span>
                        <div className="mt-[1px] px-4">
                          <Image
                            src="/energy.svg"
                            width="200"
                            height="10"
                            preload="true"
                          />
                        </div>
                        <span>More</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="helvetica absolute bottom-6 -translate-y-1/2 cursor-pointer text-base font-bold leading-[0.2] tracking-wider md:bottom-1/2 md:right-6"
                    onClick={toggleModal}
                  >
                    CLOSE
                  </button>
                </div>
              </Modal>
            </>
          ) : (
            <>
              {/* ----LOADING SPINNER----- */}
              <ChartLoader size={1000} />
              </>
          )}
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      localData: creatorData,
    },
  };
};
