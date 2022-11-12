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
  const canvasElRef = useRef<HTMLDivElement | null>(null);
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
