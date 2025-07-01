import { getMemes } from "@/api/meme";
import { Button } from "@/components/ui/Button";
import ImageWithLoading from "@/components/ui/ImageWithLoading";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function MemeGenerator() {
  const { isLoading, isError, isSuccess, data, refetch } = useQuery<{
    memes: { name: string; url: string }[];
  }>({
    queryKey: ["getMeme"],
    queryFn: getMemes,
    staleTime: 0,
  });

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
          <Skeleton width={"100%"} height={30} />
          <Skeleton width={"100%"} height={300} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100%-30px)] text-black bg-white overflow-y-scroll">
      {isSuccess &&
        data.memes.map((d) => (
          <figure key={d.name}>
            <figcaption className="py-2">{d.name}</figcaption>
            <ImageWithLoading src={d.url} alt={d.name} />
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
