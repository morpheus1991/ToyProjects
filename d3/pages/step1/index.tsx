import d3, {
  select,
  easeLinear,
  easeBounce,
  easeBounceInOut,
  easeCircle,
  easeCubic,
} from "d3";
import { useEffect, useRef } from "react";

const getData = () => {
  const result = [];
  for (let i = 0; i < 900; i++) {
    result.push({
      cx: Math.random() * 1500,
      cy: Math.random() * 1500,
      r: Math.random() * 20,
      color: `hsl${Math.random() * 360},100%,50%`,
    });
  }
  return result;
};

const Test = () => {
  const data = getData();
  console.log(data);
  const canvasElRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const svg = canvasElRef.current;
    const a = select(svg)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%");

    if (!(data.length > 0)) throw new Error("");

    a.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", (d) => d.r)
      .attr("cx", (d) => d.cx * 0.2)
      .attr("cy", (d) => d.cy * 0.2)
      .attr("fill", "red")
      .transition()
      .duration(1000)
      .attr("cx", (d) => d.r)
      .attr("cx", (d) => d.cx)
      .attr("cy", (d) => d.cy)
      .ease(easeCubic);
  }, []);

  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
      <div
        ref={canvasElRef}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      ></div>
    </div>
  );
};

export default Test;
