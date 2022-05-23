import React from "react";

export default function Vinyl({ radius }) {
  let strokewdth = 0.5;
  let strokeopc = 0.3;
  let strokecol = "#fff";
  let strokeoffsets = [1, 2, 3, 4];

  return (
    <>
      <defs>
        <radialGradient
          id="vinylShine"
          gradientTransform="translate(-0.4 -0.4) scale(1, 1)"
        >
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
          <stop offset="25%" stopColor="rgba(238, 238, 238, 0.45)" />
          <stop offset="50%" stopColor="rgba(221, 221, 221, 0.3)" />
          <stop offset="100%" stopColor="rgba(187, 187, 187, 0)" />
        </radialGradient>
      </defs>

      <circle  fill="black" r={radius} />
      
      <circle  fill="url(#vinylShine)" r={radius} />
      {strokeoffsets}
      {strokeoffsets.map((strokeoffset, index) => (
        <circle
          key={index}
          stroke={strokecol}
          strokeWidth={strokewdth}
          strokeOpacity={strokeopc}
          fill="transparent"
          fillOpacity="0"
          r={radius / 3 + (radius * strokeoffset * 2) / 15}
        />
      ))}
    </>
  );
}
