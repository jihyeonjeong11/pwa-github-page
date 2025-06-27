// 목적: array상에서의 렌더의 장단점을 object 렌더와 비교할 것임.

import { useState } from "react";

export default function ArrayRenderer() {
  const [arr, setArr] = useState<{ name: string; id: string }>([
    { name: "123", id: "123" },
  ]);

  return (
    <div className="w-64">
      {arr.map((e) => (
        <div>{e.name}</div>
      ))}
    </div>
  );
}
