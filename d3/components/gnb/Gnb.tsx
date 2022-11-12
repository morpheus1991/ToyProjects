import Link from "next/link";
import React from "react";

const Gnb = () => {
  return (
    <div>
      <nav
        style={{
          position: "fixed",
          height: "100%",
          width: "200px",
          zIndex: 400,
        }}
      >
        <ul>
          <li>
            <Link href="/">home</Link>
          </li>
          {Array(30)
            .fill("")
            .map((_, i) => {
              return (
                <li key={i} style={{ marginTop: "10px" }}>
                  <Link href={`/step${i + 1}`}>{`step${i + 1}`}</Link>
                </li>
              );
            })}
        </ul>
      </nav>
    </div>
  );
};

export default Gnb;
