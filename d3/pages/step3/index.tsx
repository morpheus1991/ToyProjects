import d3, {
  select,
  easeLinear,
  easeBounce,
  easeBounceInOut,
  easeCircle,
  easeCubic,
  csv,
  tsv,
  scaleBand,
} from "d3";
import { useEffect, useRef } from "react";

const Test = () => {
  const sampleData = [100, 10, 30, 50, 70, 10, 200, 90];
  const sampleData2 = sampleData.map((data, i) => Math.random() * data);
  const svgElRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = select(svgElRef.current);
    if (!svg) throw new Error("dd");
    sampleData.forEach((data, i) => {
      svg
        .append("rect")
        .attr("height", data)
        .attr("width", 40)
        .attr("x", 60 * i)
        .attr("y", 500 - data)
        .attr("fill", "red")
        .transition()
        .duration(3000)
        .ease(easeBounce)
        .style("fill", "red")
        .attr("height", sampleData2[i])
        .attr("y", 500 - sampleData2[i]);

      svg
        .append("text")
        .attr("x", i === 0 ? 4 : 60 * i + 4)
        .attr("y", 500 - data - 10)
        .text("hello")
        .style("font-size", "16px")
        .attr("fill", "red")
        .transition()
        .duration(3000)
        .ease(easeBounce)
        .attr("y", 500 - sampleData2[i] - 10);

      svg
        .selectAll("rect")

        .style("fill", "blue");
    });
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderLeft: "1px solid white",
        borderBottom: "1px solid white",
      }}
    >
      <svg
        ref={svgElRef}
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          top: 0,
          left: 200,
        }}
      ></svg>
    </div>
  );
};

export default Test;
