import React from "react";
import Aura from "./Aura";
import Vinyl from "./Vinyl";

const size = 600;

export default function Musicdisc({ valence, energy }) {
  return (
    <>
      <div className="m-4 max-w-[500px] max-h-[500px]">
        <svg className="music-disc" width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
          <g transform={`translate(${size / 2},${size / 2})`}>
            <Vinyl radius={size / 2} />
            <Aura radius={size / 2} valence={valence} energy={energy} />
            <circle
              fill="black"
              r={size / 100}
            />
          </g>
        </svg>
      </div>
    </>
  );
}
