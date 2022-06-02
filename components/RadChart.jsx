import { useD3 } from "../hooks/useD3";
import React from "react";
import * as d3 from "d3";

export default function RadChart({ valence, energy, size, maxDomain, innerRadiusSize, numBars }) {



/* for (let index = 0; index < trackData.length; index++) {
  console.log(trackData[index].track.features.energy)
} */
// const trackData = data.tracks

const chartSize = 975;
const width = chartSize;
const height = chartSize;
const innerRadius = 180;
const outerRadius = width / 2;

const groupKey = "State";
const keys = ["Under 5 Years", "5 to 13 Years", "14 to 17 Years", "18 to 24 Years", "25 to 44 Years", "45 to 64 Years", "65 Years and Over"]

const data = [
  {"State": "AL", "Under 5 Years": 310504, "5 to 13 Years": 552339, "14 to 17 Years": 259034, "18 to 24 Years": 450818, "25 to 44 Years": 1231572, "45 to 64 Years": 1215966, "65 Years and Over": 641667, "total": 4661900},
  {"State": "AK", "Under 5 Years": 52083, "5 to 13 Years": 85640, "14 to 17 Years": 42153, "18 to 24 Years": 74257, "25 to 44 Years": 198724, "45 to 64 Years": 183159, "65 Years and Over": 50277, "total": 686293}
]

function arc() {
  d3.arc()
  .innerRadius(innerRadius)
  .outerRadius((d) => y(d.value))
  .startAngle(d => x1(d.key))
  .endAngle(d => x1(d.key) + x1.bandwidth())
  .padAngle(0.01)
  .padRadius(innerRadius)
}
function x0(i) {
  d3.scaleBand()
  .domain(data.map(d => d.State))
  .range([0, 2 * Math.PI])
  .align(0)
}

function x1(i) {
  d3.scaleBand()
  .domain(keys)
  .range([0, x0.bandwidth()])
  .align(0)
}

function y(n) {
  d3.scaleLinear()
  .domain([0, d3.max(data, d => d.total)])
  .range([innerRadius, outerRadius]);
}


  const D3ref = useD3(
    (svg) => {

      svg.append("g")
      .selectAll("g")
      .data(data)
      .join("g")
        .attr("transform", d => `rotate(${x0(d[groupKey]) * 180 / Math.PI})`)
      .selectAll("path")
      .data(d => keys.map(key => ({key, value: d[key]})))
      .join("path")
        .attr('fill', '#69b3a2')
        .attr("d", arc);


    },
    [data.length]
  );

  return (
    <svg ref={D3ref} >
    </svg>
  );
}
