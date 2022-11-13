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
  json,
  scaleLinear,
  max,
  map,
  axisBottom,
  axisLeft,
  axisRight,
  line,
  curveBasis,
} from "d3";
import { useEffect, useRef } from "react";
import classes from "./test.module.css";
type Data = {
  지역이름: string;
  확진자수: number;
  격리해제수: number;
  사망자수: number;
  십만명당발생율: number;
  지역별확진자비율: number;
};

type Datas = Data[];

const Test = () => {
  const canvasElRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let [mt, mb, mr, ml] = [150, 50, 50, 50];
    const width = 1500;
    const height = 1500;
    const svg = select(canvasElRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", `translate(${ml}, ${mt})`)
      .attr("overflow", "inherit");
    const graphWidth = width - (ml + mr);
    const graphHeight = height - mt - mb;

    const graph = svg
      .append("g")
      .attr("width", graphWidth)
      .attr("height", graphHeight)
      .attr("transform", `translate(${ml}, ${mt})`);

    const xAxisG = graph
      .append("g")
      .attr("transform", `translate(0, ${graphHeight})`);
    const yAxisG = graph.append("g");
    const data = json("/data4.json").then((res) => {
      const data = res as unknown as Datas;

      const filteredData = data.filter((data) => data.지역이름 !== "전국", []);
      const x = scaleBand()
        .domain(filteredData.map((item) => item.지역이름))
        .range([0, graphWidth])
        .padding(0.25);

      const y = scaleLinear()
        .domain([0, max(filteredData, (d) => d.확진자수) as unknown as number])
        .range([graphHeight, 0]);

      const bars = graph.selectAll("rect").data(filteredData);

      bars
        .enter()
        .append("circle")
        .attr("height", (d) => graphHeight - y(d.확진자수))
        .attr("width", x.bandwidth)
        .attr("fill", "hotpink")
        .attr("cx", (d) => (x(d.지역이름) as unknown as number) + 50)
        .attr("cy", (d) => y(d.확진자수) as unknown as number)
        .attr("r", (d) => d.확진자수 / 200);

      const d3Line = line<Data>()
        .x((d) => (x(d.지역이름) as unknown as number) + 15)
        .y((d) => y(d.확진자수))
        .curve(curveBasis);
      bars
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", "2px")
        .attr("d", d3Line(filteredData));
      bars
        .enter()
        .append("text")
        .attr("x", (d) => (x(d.지역이름) as unknown as number) + 23)
        .attr("y", (d) => {
          if (d.확진자수 >= 6000) {
            return y(d.확진자수) - 85;
          } else if (d.확진자수 >= 4000) {
            return y(d.확진자수) - 65;
          } else if (d.확진자수 >= 2000) {
            return y(d.확진자수) - 45;
          } else if (d.확진자수 >= 1000) {
            return y(d.확진자수) - 25;
          } else if (d.확진자수 >= 100) {
            return y(d.확진자수) - 15;
          } else if (d.확진자수 >= 100) {
            return y(d.확진자수) - 5;
          }
          return y(d.확진자수);
        })
        .text((d) => `${d.확진자수}/${d.지역이름}`)
        .style("font-size", "12px")
        .attr("fill", "white");

      const xAxis = axisBottom(x);
      const yAxis = axisLeft(y)
        .ticks(3)
        .tickFormat((d) => d + "명");
      xAxisG.call(xAxis);
      yAxisG.call(yAxis);

      xAxisG
        .selectAll("text")
        .attr("fill", "hotpink")
        .attr("transform", "rotate(-45)")
        .attr("text-anchor", "end");
    });
  }, []);

  return (
    <div className={classes.test}>
      <div ref={canvasElRef} style={{ marginLeft: "400px" }}></div>
    </div>
  );
};

export default Test;
