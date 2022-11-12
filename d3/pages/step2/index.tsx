import d3, {
  select,
  easeLinear,
  easeBounce,
  easeBounceInOut,
  easeCircle,
  easeCubic,
  csv,
  tsv,
} from "d3";
import { useEffect, useRef } from "react";

const Test = () => {
  // csv("./data1.csv")
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => console.log(err));

  const svgElRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = select(svgElRef.current);
    tsv("./data3.tsv")
      .then((datas) => {
        const changeEn: {
          price: string;
          subject: string;
          sales: string;
          neProfit: string;
          yearOfPublication: string;
        }[] = JSON.parse(
          JSON.stringify(datas)
            .replaceAll("가격(원)", "price")
            .replaceAll("제목", "subject")
            .replaceAll("매출(만원)", "sales")
            .replaceAll("순익(만원)", "neProfit")
            .replaceAll("출판연도", "yearOfPublication")
        );

        changeEn.forEach((data, i) => {
          svg
            .append("rect")
            .attr("height", data.sales)
            .attr("width", 40)
            .attr("x", 60 * i)
            .attr("y", 500 - 0)
            .attr("fill", "red")
            .transition()
            .duration(3000)
            .ease(easeBounce)
            .style("fill", "red")
            .attr("height", Number(changeEn[i].sales))
            .attr("y", 500 - Number(changeEn[i].sales));
          svg
            .append("text")
            .attr("x", i === 0 ? 4 : 60 * i + 4)
            .attr("y", 500 - 0)
            .text(data.subject)
            .style("font-size", "16px")
            .attr("fill", "red")
            .transition()
            .duration(3000)
            .ease(easeBounce)
            .attr("y", 500 - Number(changeEn[i].sales) - 10);

          svg.selectAll("rect").style("fill", "blue");
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
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
    </div>
  );
};

export default Test;
