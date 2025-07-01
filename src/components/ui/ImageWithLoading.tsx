import { DEFAULT_WINDOW_SIZE } from "@/constants";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

function ImageWithLoading({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  function handleImageLoaded() {
    setLoaded(true);
  }

  return (
    <>
      {!loaded && <Skeleton width={"100%"} height={300} />}
      <img
        width={DEFAULT_WINDOW_SIZE.width}
        height={DEFAULT_WINDOW_SIZE.width}
        src={src}
        alt={alt}
        onLoad={handleImageLoaded}
        loading="lazy"
      />
    </>
  );
}

export default ImageWithLoading;
