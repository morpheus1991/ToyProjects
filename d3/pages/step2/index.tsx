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

  tsv("./data1.tsv")
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));

  const canvasElRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {}, []);
  useEffect(() => {}, []);

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
