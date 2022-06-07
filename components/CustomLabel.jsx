import { VictoryLabel, VictoryTooltip } from "victory";

export default function CustomLabel (props) {
  return (
    <g>
      {/* <VictoryLabel {...props}/> */}
      <VictoryTooltip
        {...props}
        x={500} y={500}
        center={{ x: 500, y: 1010 }}
        pointerLength={0}
        cornerRadius={90}
        flyoutWidth={180}
        flyoutHeight={180}
        flyoutStyle={{ fill: "none", stroke: "none" }}
        style={[
          
          { fontFamily: "helvetica", fill: "white", fontSize: 24, fontWeight: 900, textTransform: "uppercase", letterSpacing: 0.8 },
          { fontFamily: "helvetica", fill: "hsla(0, 100%, 100%, 0.6)", fontSize: 20 },
      ]}
      />
    </g>
  );
}