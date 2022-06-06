import { VictoryLabel, VictoryTooltip } from "victory";

export default function CustomLabel (props) {
  return (
    <g>
      {/* <VictoryLabel {...props}/> */}
      <VictoryTooltip
        {...props}
        x={500} y={500}
        center={{ x: 500, y: 1000 }}
        pointerLength={0}
        cornerRadius={90}
        flyoutWidth={180}
        flyoutHeight={180}
        flyoutStyle={{ fill: "none", stroke: "none" }}
        style={[
          
          { fill: "white", fontSize: 16, fontWeight: 700, lineHeight: 2, textTransform: "uppercase", letterSpacing: 0.8 },
          { fill: "white", fontSize: 12, lineHeight: 2 },
          { fill: "grey", fontSize: 12, lineHeight: 2}
      ]}
      />
    </g>
  );
}