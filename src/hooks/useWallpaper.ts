import bubbles from "#/images/Bubbles.webp";
import thatch from "#/images/Thatch.webp";
import rivets from "#/images/Rivets.webp";
import stone from "#/images/Stone.webp";
import forest from "#/images/Forest.webp";

import { useState } from "react";

/* 
todo: 
The file does not exist at "D:/dev/sides/pwa/pwa-side/node_modules/.vite/deps/react-dom_client.js?v=3de8a158" which is in the optimize deps directory. The dependency might be incompatible with the dep optimizer. Try adding it to `optimizeDeps.exclude`.
Assets in public directory cannot be imported from JavaScript.
If you intend to import that asset, put the file in the src directory, and use /src/images/Bubbles.webp instead of /public/images/Bubbles.webp.
If you intend to use the URL of that asset, use /images/Bubbles.webp?url.
Files in the public directory are served at the root path.
Instead of /public/images/Bubbles.webp, use /images/Bubbles.webp.

*/

// todo: 3d background just for fun

const wallpaperArr = [bubbles, thatch, rivets, stone, forest];
const size = ["cover", "contain", "auto"];

function useWallpaper() {
  const [wallpaper, setWallpaper] = useState("");
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
