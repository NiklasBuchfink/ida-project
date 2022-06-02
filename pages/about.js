import React from "react";
import Link from "next/link";

export default function about() {
  return (
    <>
      <div className="absolute right-0 mt-4 mr-3">
        <Link href="/"><a className="helvetica uppercase font-bold text-base">BACK</a></Link>
      </div>
      <div className="flex flex-col items-center justify-center h-screen m-auto px-4 space-y-3 overflow-hidden">
        <p className="helvetica uppercase font-bold text-base">ABOUT</p>
        <p className="max-w-[500px]">
          Music is an essential part of our lives. It shapes our culture and our
          identity. The everyday playlists and every concert tracklist is
          associated with special memories. RECAP_MY_MUSIC visualizes your
          individual musical taste based using your Spotify, making it visually
          accessible, comparable and shareable with others. RECAP_MY_MUSIC helps
          you to answer the question what kind of musical preferences you have.
        </p>
        <p className="helvetica uppercase font-bold text-base">SPOTIFY API</p>
        <p className="max-w-[500px]">
          Etwas über die Spotify API und den Ursprung (Year wrapped playlists)
        </p>
        <p className="helvetica uppercase font-bold text-base">TOOLS</p>
        <div className="text-center">
          <p className="max-w-[500px]">
            React and Next JS as Framework
            <br />
            Tailwind CSS for styling
            <br />
            d3 JS and the Victory library for the data visualization
          </p>
        </div>
        <p className="helvetica uppercase font-bold text-base">MADE BY</p>
        <div className="text-center">
          <p className="max-w-[500px]">
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
