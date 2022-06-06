import { rgb } from "d3";
import { getSortedRoutes } from "next/dist/shared/lib/router/utils";
import React from "react";
import * as V from "victory";
import {
  VictoryContainer,
  VictoryPie,
  VictoryChart,
  VictoryPolarAxis,
  VictoryBar,
  VictoryTooltip
} from "victory";
import CustomLabel from "./CustomLabel";

export default function Chart({ size, data }) {
  let valence = data.features.valence;
  let energy = data.features.energy;
  
  //let valence = 0.7;
  //let energy = 0.4;
  //console.log(valence, energy)
  //console.log(sadness, happiness, anger, serene);
  let mainGenreData = [];
  let trackData = [];
  let sortedTrackData = [];

  for (let i = 0; i < data.genre.main.length; i++) {
    mainGenreData.push({
      x: data.genre.main[i].genre,
      y: data.genre.main[i].value,
      track: data,
      artist: data
    });
  }

  for (let i = 0; i < data.tracks.length; i++) {
    trackData.push({
      genre: data.tracks[i].track.genre.main,
      ranking: data.tracks[i].track.ranking,
    });
  }

  let index = 0;
  for (let i = 0; i < mainGenreData.length; i++) {
    for (let j = 0; j < trackData.length; j++) {
      let found = trackData[j].genre.includes(mainGenreData[i].x);
      if (found) {
        sortedTrackData.push({
          x: 360 - (index * 360) / trackData.length,
          y: trackData.length - data.tracks[j].track.ranking,
        });
        index++;
      }
    }
  }

  // Features list
  // valence
  // energy
  // dance
  // tempo

  return (
    <div className={`m-4 h-full w-auto max-w-[${size}px] max-h-[${size}px]`}>
      <VictoryContainer width={size} height={size}>
        <rect width="100%" height="100%" fill="black" />
        <radialGradient id="auraGradient">
          <stop
            offset={`${energy*20}%`}
            stopColor={`hsla(${80 + energy * 410}, 100%, 60%, 1)`}
          />
          <stop
            offset={`${100-(valence*20)}%`}
            stopColor={`hsla(${400 - (valence * 500)}, 100%, 60%, 1)`}
          />
        </radialGradient>

        <circle
          r={size / 2 - 70}
          cx={size / 2}
          cy={size / 2}
          fillOpacity={0.5}
          fill="url(#auraGradient)"
        />

        <VictoryChart
          standalone={false}
          polar
          width={size}
          height={size}
          startAngle={90}
          endAngle={450}
          innerRadius={90}
          maxDomain={{ y: sortedTrackData.length + 10 }}
        >
          <VictoryBar
            className="RankingRadial"
            animate={{ duration: 2000, easing: "cubicInOut" }}
            data={sortedTrackData}
            labelRadius={120}
            labels={({ datum }) => `Track: ${datum.x}, Artist: ${datum.y} Ranking: ${101-datum.y}`}
            labelComponent={<CustomLabel/>}
            style={{
              data: {
                fill: ({ index }) =>
                  `hsla(0,0%,100%,${(sortedTrackData[index].y + 21) / 200})`,
                width: (360 / sortedTrackData.length) * 4 - 2,
              },
            }}
            events={[{
              target: "data",
              eventHandlers: {

              }
            }]}
          />
          <VictoryPolarAxis
            style={{
              axis: { stroke: "none", strokeWidth: 1 },
              grid: { stroke: "none" },
              tickLabels: { fontSize: 15, padding: 30, fill: "none" },
            }}
          />
        </VictoryChart>

        <VictoryPie
          className="GenrePie"
          data={mainGenreData}
          animate={{ duration: 2000, easing: "cubicInOut" }}
          standalone={false}
          sortOrder={"descending"}
          innerRadius={size / 2 - 54}
          width={size}
          height={size}
          startAngle={360 / sortedTrackData.length / 2}
          endAngle={360 + 360 / sortedTrackData.length / 2}
          padAngle={1}
          labelPlacement={"perpendicular"}
          //labelRadius={size/2}
          style={{
            data: { fill: "white" },
            labels: { fill: "grey", padding: 20, fontSize: 16 },
          }}
        />
      </VictoryContainer>
    </div>
  );
}
