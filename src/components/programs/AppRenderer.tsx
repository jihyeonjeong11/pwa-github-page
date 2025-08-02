import { JSX, LazyExoticComponent, memo, Suspense } from "react";

export type ComponentProcessProps = {
  id: string;
};

function AppRenderer({
  Component,
  id,
}: {
  Component: LazyExoticComponent<({ id }: { id: string }) => JSX.Element>;
  id: string;
}) {
  // todo: fallback 빈 로딩공간
  // todo: ref 여기서 선언
  return (
    <>
      <Suspense>
        <Component id={id} />
      </Suspense>
    </>
  );
}

export default memo(AppRenderer);
