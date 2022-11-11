import "../styles/globals.css";
import type { AppProps } from "next/app";
import Gnb from "../components/gnb/Gnb";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Gnb />
      <Component {...pageProps} />
    </div>
  );
}
