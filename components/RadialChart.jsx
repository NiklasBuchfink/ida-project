import { useD3 } from "./../hooks/useD3";
import React from "react";
import * as d3 from "d3";

export default function RadialChart({ data, valence, energy, size, maxDomain, innerRadiusSize, numBars }) {

const BAR_ANGLE = (2 * Math.PI) / numBars
const trackData = data.tracks

/* for (let index = 0; index < trackData.length; index++) {
  console.log(trackData[index].track.features.energy)
} */

console.log(data.tracks[0].track.id)
  const D3ref = useD3(
    (svg) => {
        
      const innerRadius = innerRadiusSize;
      const maxRadius = size / 2;

      const x = d3.scaleBand()
      .range([0, 2 * Math.PI])
      .domain(trackData.map( (d) => d.track.id) )
      .align(0)
      

      const y = d3.scaleRadial()
        .range([innerRadius, maxRadius])
        .domain([0, 1]);

      svg
        .select(".radial-chart")
        .attr("fill", "#ffffff04")
        .selectAll(".bar")
        .data(trackData)
        .join("path")
        .attr("d", d3.arc()
          .innerRadius(innerRadius)
          .outerRadius(d => y(d.track.features.danceability))
          .startAngle(d => x(d.track.id))
          .endAngle(d => x(d.track.id) + x.bandwidth() / trackData.length)
          .padAngle(0.01)
          .padRadius(innerRadius))
    },
    [trackData.length]
  );

  return (
    <svg transform={`translate(-${size / 2},-${size / 2})`}
      ref={D3ref}
    >
      <g className="radial-chart" transform={`translate(${size / 2},${size / 2})`} />
    </svg>
  );
}
