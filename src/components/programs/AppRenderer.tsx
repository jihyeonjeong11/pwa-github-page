import { JSX } from "react";

function AppRenderer({
  Component,
}: {
  Component: React.LazyExoticComponent<() => JSX.Element>;
}) {
  return (
    <>
      <Component />
    </>
  );
}

export default AppRenderer;
