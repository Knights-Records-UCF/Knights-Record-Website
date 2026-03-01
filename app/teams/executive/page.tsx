interface Person {
  name: string;
  role: string;
  image: string;
}

interface PersonArrayProp {
  arr: Person[];
}

const ExecutiveBoard: Person[] = [
  {
    name: "Dany",
    role: "President",
    image: "/images/1.jpg",
  },
  { name: "Tommy", role: "Vice-President", image: "/images/tommy.png" },
  { name: "Lis", role: "Secretary", image: "/images/lis.png" },
];

const FinanceBoard: Person[] = [
  { name: "Colin", role: "Head of Marketing", image: "/images/colin.png" },
];

const MarketingBoard: Person[] = [
  { name: "Lizbeth", role: "VP of Marketing", image: "" },
  {
    name: "Sienna Hilland",
    role: "Head of Marketing",
    image: "/images/sienna.png",
  },
];

const EventsBoard: Person[] = [
  {
    name: "Cassidy Zanger",
    role: "VP of Membership",
    image: "/images/cassidy.jpg",
  },
  { name: "Maria Vega", role: "VP of Events", image: "/images/maria.JPG" },
];

function TeamContainers({ arr }: PersonArrayProp) {
  return (
    <>
      <div className="flex gap-5 py-3">
        {/* team member vvv */}

        {/* testing how it looks :D */}
        {arr.map((a, index) => {
          return (
            <div
              key={index}
              className="flex flex-col [&_h2]:text-[#656565] [&_p]:text-[#656565]"
            >
              <img
                src={a.image}
                // alt={"Picture of " + a.name}
                className="w-30 h-30 min-w-30 min-h-30 bg-pink-300 rounded object-cover"
              />
              <h2 className="font-semibold">{a.name}</h2>
              <p className="text-sm">{a.role}</p>
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
        <div className="w-full border-b-[1.5px] border-gray-300 ">
          <h1 className="font-bold text-3xl ">Executive Board</h1>
        </div>

        <TeamContainers arr={ExecutiveBoard} />
      </div>

      <div className="block">
        <div className="w-full border-b-[1.5px] border-gray-300 ">
          <h1 className="font-bold text-3xl ">Finance</h1>
        </div>

        <TeamContainers arr={FinanceBoard} />
      </div>

      <div className="block">
        <div className="w-full border-b-[1.5px] border-gray-300 ">
          <h1 className="font-bold text-3xl ">Marketing</h1>
        </div>

        <TeamContainers arr={MarketingBoard} />
      </div>

      <div className="block">
        <div className="w-full border-b-[1.5px] border-gray-300 ">
          <h1 className="font-bold text-3xl ">Events</h1>
        </div>

        <TeamContainers arr={EventsBoard} />
      </div>
    </div>
  );
}
