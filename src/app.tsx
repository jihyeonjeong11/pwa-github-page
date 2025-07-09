import PWABadge from "./PWABadge.tsx";
import "./app.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ProcessProvider from "./contexts/ProcessProvider.tsx";
import SessionProvider from "./contexts/SessionProvider.tsx";
import Desktop from "./components/Desktop/index.tsx";

//import RndTester from "./components/_devPurpose/rnd/index.tsx";

const queryClient = new QueryClient();

export default function App() {
  // todo: This is only for dev.
  return (
    <>
      <SessionProvider>
        <ProcessProvider>
          <QueryClientProvider client={queryClient}>
            {/* <RndTester /> */} <Desktop />
          </QueryClientProvider>
        </ProcessProvider>
      </SessionProvider>
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
