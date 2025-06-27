import PWABadge from "./PWABadge.tsx";
import "./app.css";
import ArrayRenderer from "./components/_devPurpose/testRenderers/ArrayRenderer.tsx";
// import Routing from "./components/_devPurpose/routing/index.tsx";
// import Showcases from "./components/_devPurpose/showcases/index.tsx";
import RndTester from "./components/_devPurpose/rnd/index.tsx";
import ObjectRenderer from "./components/_devPurpose/testRenderers/ObjectRenderer.tsx";
import TestRenderers from "./components/_devPurpose/testRenderers/index.tsx";
import { Profiler } from "react";

export default function App() {
  // todo: This is only for dev.
  return (
    <>
      <TestRenderers />
      {/* <RndTester /> */}
      {/* {(() => {
        switch (slug) {
          default:
            return <Routing />;
          case "showcases":
            return <Showcases />;
          case "rnd":
            return <RndTester />;
          case "features":
            return <div>feature showcase not specified yet.</div>;
        }
      })()} */}
      <PWABadge />
    </>
  );
}
