// for rendering each artist out
interface Artist {
  name: string;
  img: string;
  genres: Array<String>;
  description: string;

  socialLinks: Array<String>;
}

export default function Artists() {
  return (
    // might need to change the grid's column widths
    <div className="h-full grid grid-cols-[1fr_2fr]">
      <div className="flex ">{/* artist scroll! */}</div>

      <div className="flex h-full  flex-col justify-center items-center  [&_h2]:text-[#656565]  [&_h1]:text-[#656565] [&_p]:text-[#656565] [&_p]:text-sm">
        {/* this is for showing artist info. */}

        <div className="h-50 w-50 bg-gray-300 rounded-full"> </div>

        <h1 className="font-bold text-2xl mt-5">Jane Doe</h1>

        <div className="h-0.5 w-[90%] bg-gray-300 mb-5"></div>
        <div className=" px-10">
          <div className="self-start my-2">
            <p>Genres</p>
            <p>Rock, Punk, Indie</p>
          </div>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <h2 className="text-xl mt-10">Follow Jane Doe</h2>
        <div className="h-0.5 w-[90%] bg-gray-300 mt-2"></div>

        <div className="flex gap-3 mt-2">
          <div className="h-15 w-15 bg-gray-300 rounded-2xl"> </div>
          <div className="h-15 w-15 bg-gray-300 rounded-2xl"> </div>
          <div className="h-15 w-15 bg-gray-300 rounded-2xl"> </div>
          <div className="h-15 w-15 bg-gray-300 rounded-2xl"> </div>
        </div>
      </div>
    </div>
  );
}
