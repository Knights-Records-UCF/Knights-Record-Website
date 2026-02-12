function TeamContainers() {
  return (
    <>
      <div className="flex gap-5 py-3">
        {/* team member vvv */}

        {/* testing how it looks :D */}
        {[0, 0, 0, 0, 0, 0].map((a, index) => {
          return (
            <div
              key={index}
              className="flex flex-col [&_h2]:text-[#656565] [&_p]:text-[#656565]"
            >
              <div className="w-30 h-30 bg-pink-300 rounded"></div>
              <h2 className="font-semibold">Dany</h2>
              <p className="text-sm">President</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function Executive() {
  return (
    <div className="[&>div:not(.fatHeader)]:py-2 gap-2 w-full px-10 [&_h1]:text-[#656565]">
      <div className="py-10 fatHeader"></div>
      <div className="block">
        <div className="w-full border-b-2 border-gray-300 ">
          <h1 className="font-bold text-3xl ">Executive Board</h1>
        </div>

        {TeamContainers()}
      </div>

      <div className="block">
        <div className="w-full border-b-2 border-gray-300 ">
          <h1 className="font-bold text-3xl ">Finance</h1>
        </div>

        {TeamContainers()}
      </div>

      <div className="block">
        <div className="w-full border-b-2 border-gray-300 ">
          <h1 className="font-bold text-3xl ">Marketing</h1>
        </div>

        {TeamContainers()}
      </div>

      <div className="block">
        <div className="w-full border-b-2 border-gray-300 ">
          <h1 className="font-bold text-3xl ">Events</h1>
        </div>

        {TeamContainers()}
      </div>
    </div>
  );
}
