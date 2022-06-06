import {
  VictoryContainer,
  VictoryPie,
} from "victory"

export default function ChartLoader({ size }) {
  const dummyData = [
    {x: 360, y: 0.1},
    {x: 315, y: 0.2},
    {x: 270, y: 0.3},
    {x: 225, y: 0.4},
    {x: 180, y: 0.5},
    {x: 135, y: 0.6},
    {x: 90, y: 0.7},
    {x: 45, y: 0.8},
  ]

  const mainGenreData = [
    { "x": "dance/electronic", "y": 1 },
    { "x": "pop", "y": 1 },
    { "x": "rock", "y": 1 },
    { "x": "r&b", "y": 1 },
    { "x": "hip hop", "y": 1 },
    { "x": "folk/acoustic", "y": 1 },
    { "x": "blues", "y": 1 },
    { "x": "latin", "y": 1 }
]

  return (
    <div className={`m-4 w-auto h-full max-w-[${size}] max-h-[${size}] animate-pulse overflow-hidden`}>
      <div className={`w-auto h-full max-w-[${size}] max-h-[${size}] animate-slowspin`}>
        <VictoryContainer width={size} height={size}>
          <radialGradient id="auraGradient">
            <stop
              offset={`0%`}
              stopColor={'#333'}
            />
            <stop
              offset={`100%`}
              stopColor={'#212121'}
            />
          </radialGradient>
          <circle r={90} cx={size / 2} cy={size / 2} fill="url(#auraGradient)" />
          
          <VictoryPie
            className="GenrePie"
            animate={{ duration: 2000, easing: "cubicInOut" }}
            standalone={false}
            sortOrder={"descending"}
            innerRadius={size / 2 - 54}
            width={size}
            height={size}
            startAngle={360 / dummyData.length / 2}
            endAngle={360 + 360 / dummyData.length / 2}
            padAngle={1}
            labelPlacement={"perpendicular"}
            style={{
              data: { fill: "white" },
              labels: { fill: "#000", padding: 20, fontSize: 16 },
            }}
            data={mainGenreData}
          />
        </VictoryContainer>
      </div>
    </div>
  )
}
