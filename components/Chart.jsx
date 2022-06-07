import { rgb } from "d3";
import { getSortedRoutes } from "next/dist/shared/lib/router/utils";
import * as V from "victory";
import {
  VictoryContainer,
  VictoryPie,
  VictoryChart,
  VictoryPolarAxis,
  VictoryBar,
  VictoryTooltip,
} from "victory";
import PreviewPlayer from '../components/PreviewPlayer'
import { usePlayer } from "../components/PlayerContext"
import CustomLabel from "./CustomLabel";

export default function Chart({ size, data }) {
  const { setCurrentTrack } = usePlayer();
  const playTrack = (track) => {
    if (track.preview_url) {
      setCurrentTrack(track);
    }
  };

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
      let artistArr = [];
      data.tracks[j].track.artists.map((artist) => {
        artistArr.push(artist.name);
      });
      let found = trackData[j].genre.includes(mainGenreData[i].x);
      if (found) {
        sortedTrackData.push({
          x: 360 - (index * 360) / trackData.length,
          y: trackData.length - data.tracks[j].track.ranking + 5,
          ranking: Math.round(data.tracks[j].track.ranking + 1),
          name: data.tracks[j].track.name,
          artist: artistArr.join(", "),
          preview_url: data.tracks[j].track.preview_url,
        });
        index++;
      }
    }
  }

  CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;

  // Features list
  // valence
  // energy
  // dance
  // tempo

  return (
    <>
    <div className={`m-10 h-full w-auto max-w-[${size}px] max-h-[${size}px]`}>
      <VictoryContainer width={size} height={size} portalZIndex={0}>
        <rect width="100%" height="100%" fill="black" />
        <radialGradient id="auraGradient">
          <stop
            offset={`${energy * 20}%`}
            stopColor={`hsla(${80 + energy * 410}, 100%, 60%, 1)`}
          />
          <stop
            offset={`${100 - valence * 20}%`}
            stopColor={`hsla(${400 - valence * 500}, 100%, 60%, 1)`}
          />
        </radialGradient>

        <circle
          r={size / 2 - 70}
          cx={size / 2}
          cy={size / 2}
          fillOpacity={1}
          fill="url(#auraGradient)"
        />

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
            style={{
              data: { fill: "white" },
              labels: {
                fontFamily: "monospace",
                letterSpacing: 0.1,
                fill: "white",
                padding: 6,
                fontSize: 16,
              },
            }} />

          <VictoryChart
            standalone={false}
            polar
            width={size}
            height={size}
            startAngle={90}
            endAngle={450}
            innerRadius={90}
            minDomain={{ y: 0 }}
            maxDomain={{ y: sortedTrackData.length + 15 }}
          >
            <VictoryPolarAxis
              style={{
                axis: { stroke: "none", strokeWidth: 1 },
                grid: { stroke: "none" },
                tickLabels: { fontSize: 0, fill: "none" },
              }} />
            <VictoryBar
              className="RankingRadial"
              animate={{ duration: 2000, easing: "cubicInOut" }}
              data={sortedTrackData}
              labelPlacement={"vertical"}
              labelRadius={100}
              labels={({ datum }) => [
                `${datum.name}`,
                `${datum.artist}`,
                `My Top ${datum.ranking}`,
              ]}
              lineHeight={[2, 2, 2]}
              labelComponent={<CustomLabel />}
              style={{
                data: {
                  fill: ({ index }) => `hsla(0,0%,100%,${(sortedTrackData[index].y + 21) / 200})`, // bug here? "sortedTrackData[index] is undefined"
                  width: (360 / sortedTrackData.length) * 4 - 2, // alt. without spacing: 0.3
                },
              }}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onClick: (event, props) => {
                      playTrack(props.data[props.index])
                      return [
                        {
                          target: "data",
                          mutation: (props) => {
                            return {
                              style: Object.assign({}, props.style, {
                                fill: "white",
                              }),
                            };
                          },
                        },
                      ]
                    },
                    onMouseOver: () => {
                      return [
                        {
                          target: "data",
                          mutation: (props) => {
                            return {
                              style: Object.assign({}, props.style, {
                                fill: "white",
                              }),
                            };
                          },
                        },
                        {
                          target: "labels",
                          mutation: () => ({ active: true }),
                        },
                      ];
                    },
                    onMouseOut: () => {
                      return [
                        {
                          target: "data",
                          mutation: () => {
                            return null;
                          },
                        },
                        {
                          target: "labels",
                          mutation: () => ({ active: false }),
                        },
                      ];
                    },
                  },
                },
              ]} />
          </VictoryChart>
        </VictoryContainer>
      </div>
      
      <PreviewPlayer />
    </>
  );
}
