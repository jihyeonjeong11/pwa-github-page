function JsDos({ id }: { id: string }) {
  return (
    <div id={id} className="w-full h-[calc(100%-30px)] text-black bg-white">
      <div className="App" style={{ width: "640px", height: "400px" }}>
        dosbox
      </div>
    </div>
  );
}

export default JsDos;
