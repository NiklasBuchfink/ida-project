import { VictoryLabel, VictoryTooltip } from "victory";

export default function CustomLabel (props) {
  return (
    <g>
      {/* <VictoryLabel {...props}/> */}
      <VictoryTooltip
        {...props}
        x={500} y={500}
        center={{ x: 500, y: 1005 }}
        pointerLength={0}
        cornerRadius={90}
        flyoutWidth={180}
        flyoutHeight={180}
        flyoutStyle={{ fill: "none", stroke: "none" }}
        style={[
          
          { fontFamily: "helvetica", fill: "white", fontSize: 16, fontWeight: 900, textTransform: "uppercase", letterSpacing: 0.8 },
          { fontFamily: "monospace", fill: "white", fontSize: 12 },
          { fontFamily: "monospace", fill: "hsla(0, 100%, 100%, 0.6)", fontSize: 12 }
      ]}
      />
    </g>
  );
}