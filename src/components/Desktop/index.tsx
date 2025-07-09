// todo : 바탕화면 -> 월페이퍼 훅
// todo : programlist -> icon

import useWallpaper from "@/hooks/useWallpaper";
import Taskbar from "../taskbar";

// todo: 윈도우 로딩 스크린
// todo: taskbar -> 시작메뉴 dropdown

function Desktop() {
  const { style, getRandomWallpaper } = useWallpaper();
  return (
    <div
      id="app"
      style={style}
      onContextMenu={(e) => {
        // todo: 모바일 어케햇더라
        e.preventDefault();
        getRandomWallpaper();
      }}
    >
      123
      <Taskbar />
    </div>
  );
}

export default Desktop;
