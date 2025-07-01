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
        className="w-full h-full"
        src={src}
        alt={alt}
        onLoad={handleImageLoaded}
        loading="lazy"
      />
    </>
  );
}

export default ImageWithLoading;
