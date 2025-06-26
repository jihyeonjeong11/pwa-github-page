import { JSX, memo } from "react";

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

export default memo(AppRenderer);
