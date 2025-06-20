import { RndWindowEntriesType } from "@/components/programs/types";
import { useEffect, useState } from "react";

export function useWindowStackOrder(entries: RndWindowEntriesType) {
  // todo: 퍼포먼스 체크, effect를 const order = useMemo...로 바꾸는 것도 도움이 될 수 있음
  // 이왕 나눴다면, rndProp도 따로 빼서 사용하는것이 퍼포먼스에 도움이 될 수 있음.
  // rnd 인터랙션을 하는 엘리먼트는 focus한 엘리먼트 하나이기떄문에, 뺴도 문제없을 것 같긴 함.
  // https://www.zekehernandez.com/posts/little-react-things-less-reacting-more-deriving

  // ai generated for now 한번 읽어보고 최적화
  const [order, setOrder] = useState<string[]>([]);

  useEffect(() => {
    console.log("aciton");
    const currentIds = Object.keys(entries);

    // 1. Add new windows
    const added = currentIds.filter((id) => !order.includes(id));
    if (added.length > 0) {
      setOrder((prevOrder) => [...prevOrder, ...added]);
    }

    // 2. Remove closed windows
    const removed = order.filter((id) => !currentIds.includes(id));
    if (removed.length > 0) {
      setOrder((prevOrder) =>
        prevOrder.filter((id) => currentIds.includes(id))
      );
    }

    // 3. Focused (and not minimized) window → move to top
    const focusedEntry = Object.entries(entries).find(
      ([, entry]) => entry.focused && !entry.minimized
    );
    if (focusedEntry) {
      const [focusedId] = focusedEntry;
      setOrder((prevOrder) => {
        const rest = prevOrder.filter((id) => id !== focusedId);
        return [...rest, focusedId];
      });
    }

    // 4. Minimized → move to bottom
    const minimizedIds = Object.entries(entries)
      .filter(([, entry]) => entry.minimized)
      .map(([id]) => id);

    if (minimizedIds.length > 0) {
      setOrder((prevOrder) => {
        let updated = [...prevOrder];
        minimizedIds.forEach((id) => {
          updated = [id, ...updated.filter((otherId) => otherId !== id)];
        });
        return updated;
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries]);

  return { order };
}
