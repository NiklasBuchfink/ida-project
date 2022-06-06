import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function about() {
  return (
    <>
    <Head>
          <title>ABOUT</title>
          <meta
            name="description"
            content="About how RECAP_MY_MUSIC works and who we are."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      <div className="absolute right-0 mt-4 mr-6">
        <Link href="/">
          <a className="helvetica text-base font-bold uppercase">BACK</a>
        </Link>
      </div>

      <div className="m-auto flex h-screen max-w-[550px] flex-col items-center space-y-6 px-4 text-left leading-[1.4] sm:justify-center sm:text-center">
        <div className="mt-24 sm:mt-0">
          <p className="helvetica text-base font-bold uppercase">ABOUT</p>
          <p className="text-justify">
            Music is an essential part of our lives. It shapes our culture and
            our identity. The everyday playlists and every concert tracklist is
            associated with special memories. RECAP_MY_MUSIC visualizes your
            individual musical taste based using your Spotify, making it
            visually accessible, comparable and shareable with others.
            RECAP_MY_MUSIC helps you to answer the question what kind of musical
            preferences you have by showing you your most listened genres and
            other stats.
          </p>
        </div>
        <div className="">
          <p className="helvetica text-base font-bold uppercase">SPOTIFY API</p>
          <p className="text-justify">
            Spotify allows developers to create web applications that make use
            of their gigantic music library and can load data from registered
            users. RECAP_MY_MUSIC searches for every{" "}
            <a
              className="underline "
              href="https://en.wikipedia.org/wiki/Spotify_Wrapped"
              target="_blank"
              rel="noreferrer"
            >
              Spotify Wrapped
            </a>{" "}
            playlist that is linked to your account and analyzes their content
            for specific patterns (e.g. music genres, popularity index,
            characteristics of the tracks, etc.). After that it builds the
            charts using this analyzed and sorted data.
          </p>
        </div>
        <div className="w-full">
          <p className="helvetica text-base font-bold uppercase">TOOLS</p>

          <p className="max-w-[500px]">
            <a
              className=" underline "
              href="https://reactjs.org/"
              target="_blank"
              rel="noreferrer"
            >
              React
            </a>{" "}
            and{" "}
            <a
              className=" underline "
              href="https://nextjs.org/"
              target="_blank"
              rel="noreferrer"
            >
              Next JS
            </a>{" "}
            as framework
            <br />{" "}
            <a
              className=" underline "
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noreferrer"
            >
              Tailwind CSS
            </a>{" "}
            for styling
            <br />
            <a
              className=" underline "
              href="https://d3js.org/"
              target="_blank"
              rel="noreferrer"
            >
              D3.js
            </a>{" "}
            and the{" "}
            <a
              className=" underline "
              href="https://formidable.com/open-source/victory/"
              target="_blank"
              rel="noreferrer"
            >
              Victory library
            </a>{" "}
            for the data visualization
            <br />
            Github (
            <a
              className=" underline "
              href="https://github.com/NiklasBuchfink/ida-project"
              target="_blank"
              rel="noreferrer"
            >
              source
            </a>) and {" "}<a
              className=" underline "
              href="https://www.netlify.com/"
              target="_blank"
              rel="noreferrer"
            >
              Netlify
            </a>{" "} for deployment
            
          </p>
        </div>
        <div className="w-full">
          <p className="helvetica text-base font-bold uppercase">MADE BY</p>
          <p className="">
            Niklas Buchfink
            <br />
            Lea Münger
            <br />
            Max Werner
            <br />
            as part of the IDA program at HSLU in Lucerne :)
          </p>
        </div>
      </div>
    </>
  );
}
