import { JSX, memo, Suspense } from "react";

function AppRenderer({
  Component,
}: {
  Component: React.LazyExoticComponent<() => JSX.Element>;
}) {
  // todo: fallback 빈 로딩공간
  return (
    <>
      <Suspense>
        <Component />
      </Suspense>
    </>
  );
}

export default memo(AppRenderer);
