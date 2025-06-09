import PWABadge from "./PWABadge.tsx";
import "./app.css";
import { useSlug } from "./hooks/useSlug.tsx";
import Routing from "./components/routing/index.tsx";
import Showcases from "./components/showcases/index.tsx";

export default function App() {
  const { slug } = useSlug();
  // todo: This is only for dev.
  return (
    <>
      {(() => {
        switch (slug) {
          default:
            return <Routing />;
          case "showcases":
            return <Showcases />;
          case "features":
            return <div>feature showcase not specified yet.</div>;
        }
      })()}
      <PWABadge />
    </>
  );
}
