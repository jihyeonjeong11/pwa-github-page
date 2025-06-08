import PWABadge from "./PWABadge.tsx";
import "./app.css";
import { useSlug } from "./hooks/useSlug.tsx";
import Routing from "./components/routing/index.tsx";

export default function App() {
  const { slug } = useSlug();
  // todo: This is only for dev.
  return (
    <>
      {(() => {
        switch (slug) {
          default:
            return (
              <>
                <Routing />
              </>
            );
          case "showcases":
            return <div>ui-showcase</div>;
          case "features":
            return <div>feature showcase not specified yet.</div>;
        }
      })()}
      <PWABadge />
    </>
  );
}
