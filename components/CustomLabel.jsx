import { VictoryLabel, VictoryTooltip } from "victory";

export default function CustomLabel (props) {
  return (
    <g>
      {/* <VictoryLabel {...props}/> */}
      <VictoryTooltip
        {...props}
        x={500} y={500}
        center={{ x: 500, y: 500 }}
        pointerLength={0}
        cornerRadius={90}
        flyoutWidth={180}
        flyoutHeight={180}
        flyoutStyle={{ fill: "none", stroke: "none" }}
      />
    </g>
  );
}