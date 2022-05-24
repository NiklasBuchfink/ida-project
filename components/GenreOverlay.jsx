import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function GenreOverlay({ valence, energy }) {
  const d3Chart = useRef();

  let width = 975;
  let height = { width };
  let innerRadius = 180;
  let outerRadius = Math.min(width, height) * 0.67;

  const data = [
    {
      "State": "CA",
      "Under 5 Years": 2704659,
      "5 to 13 Years": 4499890,
      "14 to 17 Years": 2159981,
      "18 to 24 Years": 3853788,
      "25 to 44 Years": 10604510,
      "45 to 64 Years": 8819342,
      "65 Years and Over": 4114496,
      total: 36756666,
    },
    {
      "State": "AK",
      "Under 5 Years": 52083,
      "5 to 13 Years": 85640,
      "14 to 17 Years": 42153,
      "18 to 24 Years": 74257,
      "25 to 44 Years": 198724,
      "45 to 64 Years": 183159,
      "65 Years and Over": 50277,
      total: 686293,
    },
  ];

  // defines size of svg
  const svg = d3
    .select(d3Chart.current)
    .attr("viewBox", `${-width / 2} ${-height * 0.69} ${width} ${height}`)
    .style("width", "100%")
    .style("height", "auto");

  //
  svg
    .append("g")
    .selectAll("g")
    .join("g")
    .attr("fill", (d) => z(d.key))
    .selectAll("path")
    .data((d) => d)
    .join("path")
    .attr("d", arc);

  svg.append("g").call(xAxis);

  svg.append("g").call(yAxis);

  svg.append("g").call(legend);

  let arc = () => {
    d3.arc()
      .innerRadius((d) => y(d[0]))
      .outerRadius((d) => y(d[1]))
      .startAngle((d) => x(d.data.State))
      .endAngle((d) => x(d.data.State) + x.bandwidth())
      .padAngle(0.01)
      .padRadius(innerRadius);
  };
  let x = (i) => {
    d3.scaleBand()
      .domain(data.map((d) => d.State))
      .range([0, 2 * Math.PI])
      .align(0);
  };

  let y = (t) => {
    d3.scaleRadial()
      .domain([0, d3.max(data, (d) => d.total)])
      .range([innerRadius, outerRadius]);
  };

  let z = (i) => {
    d3.scaleOrdinal()
      .domain(data.columns.slice(1))
      .range([
        "#98abc5",
        "#8a89a6",
        "#7b6888",
        "#6b486b",
        "#a05d56",
        "#d0743c",
        "#ff8c00",
      ]);
  };

  let xAxis = (g) =>
    g.attr("text-anchor", "middle").call((g) =>
      g
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr(
          "transform",
          (d) => `
          rotate(${((x(d.State) + x.bandwidth() / 2) * 180) / Math.PI - 90})
          translate(${innerRadius},0)
        `
        )
        .call((g) => g.append("line").attr("x2", -5).attr("stroke", "#000"))
        .call((g) =>
          g
            .append("text")
            .attr("transform", (d) =>
              (x(d.State) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) <
              Math.PI
                ? "rotate(90) translate(0,16)"
                : "rotate(-90) translate(0,-9)"
            )
            .text((d) => d.State)
        )
    );

  let yAxis = (g) =>
    g
      .attr("text-anchor", "end")
      .call((g) =>
        g
          .append("text")
          .attr("x", -6)
          .attr("y", (d) => -y(y.ticks(10).pop()))
          .attr("dy", "-1em")
          .text("Population")
      )
      .call((g) =>
        g
          .selectAll("g")
          .data(y.ticks(10).slice(1))
          .join("g")
          .attr("fill", "none")
          .call((g) =>
            g
              .append("circle")
              .attr("stroke", "#000")
              .attr("stroke-opacity", 0.5)
              .attr("r", y)
          )
          .call((g) =>
            g
              .append("text")
              .attr("x", -6)
              .attr("y", (d) => -y(d))
              .attr("dy", "0.35em")
              .attr("stroke", "#fff")
              .attr("stroke-width", 5)
              .text(y.tickFormat(10, "s"))
              .clone(true)
              .attr("fill", "#000")
              .attr("stroke", "none")
          )
      );

  let legend = (g) =>
    g
      .append("g")
      .selectAll("g")
      .data(data.columns.slice(1).reverse())
      .join("g")
      .attr(
        "transform",
        (d, i) => `translate(-40,${(i - (data.columns.length - 1) / 2) * 20})`
      )
      .call((g) =>
        g.append("rect").attr("width", 18).attr("height", 18).attr("fill", z)
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", 24)
          .attr("y", 9)
          .attr("dy", "0.35em")
          .text((d) => d)
      );

  return (
    <>
      <div className="m-4 max-w-[500px] max-h-[500px]">
        <svg ref={d3Chart}>
          {/*   <circle transform={`translate(50,50)`} fill="white" r={50} /> */}
        </svg>
      </div>
    </>
  );
}
