import React from "react";
import * as V from "victory";
import {
  VictoryContainer,
  VictoryPie,
  VictoryChart,
  VictoryPolarAxis,
  VictoryBar,
} from "victory";

export default function Chart({ size, data }) {
  let valence = data.features.valence;
  let energy = data.features.energy;
  let mainGenreData = [];
  let trackData = [];
  let sortedTrackData = [];

  for (let i = 0; i < data.genre.main.length; i++) {
    mainGenreData.push({
      x: data.genre.main[i].genre,
      y: data.genre.main[i].value,
    });
  }

  for (let i = 0; i < data.tracks.length; i++) {
    trackData.push({
      genre: data.tracks[i].track.genre.main,
      ranking: data.tracks[i].track.ranking,
    });
  }

  // das kann verbessert sicher werden (evtl. mit map() oder forEach())
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

  /*   let myArray2 = [1, 2, 3, 4];
  myArray2.map((element, index) => {
    myArray2[index] = element * element;
    let found = trackData.includes(mainGenreData[i].x);  
  })

  mainGenreData.map((mainGenreData.x) => {
    let topLevel = topLevelGenre(trackGenre)
      if (trackGenre.includes('pop')) {
        topLevel = 'pop'
      }
    }) */

  //console.log(sortedTrackData);

  return (
    <div className={`m-4 w-auto h-full max-w-[${size}] max-h-[${size}]`}>
      <VictoryContainer width={size} height={size}>
        <radialGradient id="auraGradient">
          <stop
            offset={`0%`}
            stopColor={`hsla(${200 - valence * 140}, 100%, 60%, 1.0)`}
          />
          <stop
            offset={`100%`}
            stopColor={`hsla(${200 + energy * 160}, 100%, 60%, 1.0)`}
          />
        </radialGradient>
        <circle r={90} cx={size / 2} cy={size / 2} fill="url(#auraGradient)" />

        <VictoryChart
          standalone={false}
          polar
          width={size}
          height={size}
          startAngle={90}
          endAngle={450}
          innerRadius={100}
          maxDomain={{ y: sortedTrackData.length + 5 }}
        >
          <VictoryBar
            className="RankingRadial"
            animate={{ duration: 2000, easing: "cubicInOut" }}
            data={sortedTrackData}
            style={{
              data: {
                fill: `hsla(0,0%,100%,0.4)`,
                width: (360 / sortedTrackData.length) * 4 - 2,
              },
            }}
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
          standalone={false}
          sortOrder={"descending"}
          innerRadius={size / 2 - 60}
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
          data={mainGenreData}
        />
      </VictoryContainer>
    </div>
  );
}
