import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Modal from "react-modal";
import Chart from "../components/Chart";
import ChartLoader from "../components/ChartLoader";
import { creatorData } from "../lib/data/niklasData"

export default function Creators({ localData }) {
  const [data, setData] = useState(localData[0]);
  const [isOpen, setIsOpen] = useState(false);

  const files = ["lea", "max", "niklas"];

  function toggleModal() {
    if (data) {
      setIsOpen(!isOpen);
    }
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(cc,cc,cc,0.5)',
    },
    overlay: { 
      backgroundColor: 'rgba(ff,ff,ff,0.1)'
    }
  };

  return (
    <>
      <Head>
        <title>Sample</title>
        <meta
          name="description"
          content="This page visualize a data sample of the creators." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative w-full h-screen ">
          <div className="absolute w-full p-4 z-[199]">         
            <div className="absolute right-0 mt-4 mr-3">
              <Link href="/"><a className="helvetica uppercase font-bold text-base">BACK</a></Link>
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
                onClick={toggleModal}>Close
              </button>
            </div>
          </Modal>
        </div>
    </>
  )
}

export const getStaticProps = async () => {
  return {
   props:{
      localData: creatorData,
   },
 }
}

// export async function getStaticProps(context){
//   const sample = await import('./api/sample');
//   return {props: {sample}}
// }
