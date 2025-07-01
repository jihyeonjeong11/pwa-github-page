import { getMemesWithDelay } from "@/api/meme";
import { Button } from "@/components/ui/Button";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HANGING_THRESHOLD = 3000;

function MemeGenerator() {
  const { isLoading, isError, isSuccess, data, refetch } = useQuery<{
    memes: { name: string; url: string }[];
  }>({
    queryKey: ["getMeme"],
    queryFn: getMemesWithDelay,
  });

  const [showForHanging, setShowForHanging] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isLoading) {
      timer = setTimeout(() => {
        setShowForHanging(true);
      }, HANGING_THRESHOLD);
    } else {
      setShowForHanging(false);
      if (timer) clearTimeout(timer);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading]);

  if (isError) {
    return (
      <div className="w-full h-[calc(100%-30px)] text-black bg-white">
        <div className="py-6">
          <span>Something's wrong with the connection.</span>
          <Button onClick={() => refetch()}>retry</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100%-30px)] text-black bg-white">
        <div className="py-6">
          <Skeleton width={500} height={30} />
          <Skeleton width={500} height={300} />
        </div>
        {showForHanging && (
          <>
            <div>
              <span>This is getting longer than expected...</span>
              <Button
                onClick={() => {
                  refetch();
                  setShowForHanging(false);
                }}
              >
                Try again
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100%-30px)] text-black bg-white overflow-y-scroll">
      {isSuccess &&
        data.memes.map((d) => (
          <figure>
            <figcaption className="py-2">{d.name}</figcaption>
            <img src={d.url} alt={d.name} />
          </figure>
        ))}
    </div>
  );
}

export default MemeGenerator;

// todo: typing
// todo: loading skeleton
// todo: error case
// error render
// error toaster
