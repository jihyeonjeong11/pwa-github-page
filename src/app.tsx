import PWABadge from "./PWABadge.tsx";
import "./app.css";
import { useSlug } from "./hooks/useSlug.tsx";

export default function App() {
  const { slug } = useSlug();
  return (
    <>
      {(() => {
        switch (slug) {
          default:
            return <div>Showcase Main page</div>;
          case "ui":
            return <div>ui-showcase</div>;
          case "features":
            return <div>feature showcase not specified yet.</div>;
        }
      })()}
      <PWABadge />
    </>
  );
}
