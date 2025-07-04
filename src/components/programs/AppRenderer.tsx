import { JSX, memo, Suspense } from 'react';

function AppRenderer({
  Component,
}: {
  Component: React.LazyExoticComponent<() => JSX.Element>;
}) {
  return (
    <>
      <Suspense>
        <Component />
      </Suspense>
    </>
  );
}

export default memo(AppRenderer);
