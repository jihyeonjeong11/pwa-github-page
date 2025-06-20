import { RndWindowsType } from "@/components/programs/types";
import { useEffect, useState } from "react";

export function useWindowStackOrder(entries: RndWindowsType) {
  // todo: 퍼포먼스 체크, effect를 const order = useMemo...로 바꾸는 것도 도움이 될 수 있음
  // 이왕 나눴다면, rndProp도 따로 빼서 사용하는것이 퍼포먼스에 도움이 될 수 있음.
  // rnd 인터랙션을 하는 엘리먼트는 focus한 엘리먼트 하나이기떄문에, 뺴도 문제없을 것 같긴 함.
  // https://www.zekehernandez.com/posts/little-react-things-less-reacting-more-deriving
  const [order, setOrder] = useState<string[]>([]);

  useEffect(() => {
    const currentIds = entries.map((e) => e.id);

    const added = currentIds.filter((id) => !order.includes(id));
    if (added.length > 0) {
      setOrder((prevOrder) => [...prevOrder, ...added]);
    }

    const removed = order.filter((id) => !currentIds.includes(id));
    if (removed.length > 0) {
      setOrder((prevOrder) =>
        prevOrder.filter((id) => currentIds.includes(id))
      );
    }

    const focused = entries.find((e) => e.focused && !e.minimized);
    if (focused) {
      setOrder((prevOrder) => {
        const rest = prevOrder.filter((id) => id !== focused.id);
        return [...rest, focused.id];
      });
    }

    const minimized = entries.filter((e) => e.minimized);
    if (minimized.length > 0) {
      setOrder((prevOrder) => {
        let updated = [...prevOrder];
        minimized.forEach((win) => {
          updated = [win.id, ...updated.filter((id) => id !== win.id)];
        });
        return updated;
      });
    }
    // effect를 빼는 방법 생각할 것.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries]);

  return { order };
}
