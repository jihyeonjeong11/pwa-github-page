import PWABadge from "./PWABadge.tsx";
import "./app.css";
import RndTester from "./components/_devPurpose/rnd/index.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  // todo: This is only for dev.
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RndTester />
      </QueryClientProvider>
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
