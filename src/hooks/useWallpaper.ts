import bubbles from "@/images/Bubbles.webp";
import thatch from "@/images/Thatch.webp";
import rivets from "@/images/Rivets.webp";
import stone from "@/images/Stone.webp";
import forest from "@/images/Forest.webp";

import { useState } from "react";

// todo: 3d background just for fun

const wallpaperArr = [bubbles, thatch, rivets, stone, forest];
const size = ["cover", "contain", "auto"];

function useWallpaper() {
  const [wallpaper, setWallpaper] = useState(bubbles);
  const [sizeStrategy, setSizeStrategy] = useState("");

  const getRandomWallpaper = () => {
    const randomIndex = Math.floor(Math.random() * wallpaperArr.length + 1);
    setWallpaper(wallpaperArr[randomIndex]);
    const randomStrategy = Math.floor(Math.random() * size.length + 1);
    setSizeStrategy(size[randomStrategy]);
  };

  return {
    style: {
      backgroundSize: sizeStrategy,
      backgroundImage: `url(${wallpaper})`,
    },
    getRandomWallpaper,
  };
}

export default useWallpaper;
