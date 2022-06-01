import React from "react";
import { useState } from "react";

import Aura from "./Aura";
import Vinyl from "./Vinyl";
import RadialChart from "./RadialChart";

export default function Musicdisc({ data, valence, energy, size, maxDomain, innerRadiusSize, numBars}) {
  return (
    <>
      <div className={`m-4 max-w-${size} max-h-${size}`} >

        <svg className="music-disc" width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
          <g transform={`translate(${size / 2},${size / 2})`}>
            <Vinyl radius={size / 2} />
            <Aura radius={size / 2} valence={valence} energy={energy} />
            <RadialChart data={data} valence={valence} energy={energy} size={size} maxDomain={maxDomain} innerRadiusSize={innerRadiusSize} numBars={numBars} />

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
