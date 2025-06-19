// todo: WYSIWYG 어던 것을 쓸지 정해지는대로, 여기 작업할 것. 지금은 TipTap이 유력함.

function Editor() {
  return (
    <div className="w-full h-[calc(100%-30px)] text-black bg-white">
      <textarea className="w-full h-full p-2" />
    </div>
  );
}

export default Editor;
