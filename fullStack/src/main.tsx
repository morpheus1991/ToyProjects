import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import "./scss/index.scss";
import { RecoilRoot } from "recoil";
if (import.meta.env.DEV) {
  const getWorker = async () => {
    const { worker } = await import("./mocks/brower");
    worker.start();
  };
  getWorker();
}
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
