import { Button } from "@/components/ui/Button";
// todo: 지뢰찾기 무료 이미지 찾기 + 디지털 숫자표시 생각하기
// todo: 모바일 조작 어떻게 할 것인지? 일단 멈춤.
// 초급 난이도 사이즈 9 x 9
export const DEFAULT_GAME_WIDTH = 250;
export const DEFAULT_GAME_HEIGHT = 344;
export const GAME_PANEL_MARGIN = 5;

const matrix = Array.from({ length: 9 }, () =>
  Array.from({ length: 9 }, () => 0)
);

// todo: 바깥 보더 안쪽 보더 재사용
function Minesweeper() {
  return (
    <div className="w-full h-[calc(100%-30px)] text-black flex">
      <div className="flex-1 m-1 flex flex-col border-2 border-white border-r-primary-button-border border-b-primary-button-border">
        <div className="h-[38px] border-2 border-white border-t-primary-button-border border-l-primary-button-border m-[5px] flex justify-between px-2 items-center">
          <div>total: 10</div>
          <Button className="p-1">💀</Button>
          <div>left: 0</div>
        </div>
        <div className="grow border-2 border-white border-t-primary-button-border border-l-primary-button-border m-[5px] inline-grid grid-cols-9">
          {matrix.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="border-2 border-white border-r-primary-button-border border-b-primary-button-border"
              >
                {/* You can place flag/number/bomb here */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Minesweeper;
