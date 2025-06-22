import { useEffect, useState } from "react";

export function useHasIOSBottomBar() {
  const [hasIOSBottomBar, setHasIOSBottomBar] = useState(false);

  useEffect(() => {
    const isIOS = /iphone|ipod|ipad/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    const height = Math.max(window.screen.height, window.screen.width);

    if (isIOS && isStandalone && height >= 812) {
      setHasIOSBottomBar(true);
    }
  }, []);

  return { hasIOSBottomBar };
}
