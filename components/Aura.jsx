import React from "react";

export default function Aura({ radius, valence, energy }) {
  let beginOffset = 0;
  let endOffset = 1;



  return (
    <>
      <defs>
        <radialGradient id="auraGradient">
          <stop offset={`${beginOffset*100}%`} stopColor={`hsla(${valence * 360}, 100%, 50%, 1.0)`}/>
          <stop offset={`${endOffset*100}%`} stopColor={`hsla(${-energy * 360}, 100%, 50%, 1.0)`} />
        </radialGradient>
      </defs>
      <circle fill="url(#auraGradient)" r={radius / 3} />
    </>
  );
}
