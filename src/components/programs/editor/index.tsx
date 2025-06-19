// todo: WYSIWYG 어던 것을 쓸지 정해지는대로, 여기 작업할 것. 지금은 TipTap이 유력함.

import { RndDefaultProps } from "@/components/_devPurpose/rnd";

function Editor({
  e,
  focus,
}: {
  e: RndDefaultProps;
  focus: (id: string) => void;
}) {
  return (
    <div className="w-full h-[calc(100%-36px)] text-black bg-white">
      <textarea onClick={() => focus(e.id)} className="w-full h-full p-2" />
    </div>
  );
}

export default Editor;
