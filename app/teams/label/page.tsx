interface Person {
  name: string;
  role: string;
  image: string;
}

interface PersonArrayProp {
  arr: Person[];
}

const LabelManagement: Person[] = [
  {
    name: "Ingrid Blanco",
    role: "Head of Label Management",
    image: "/images/ingrid.PNG",
  },
  {
    name: "Connelly Vincent",
    role: "A&R Manager",
    image: "/images/connelly.jpg",
  },
];

const LabelMarketing: Person[] = [
  { name: "Anen Jamir", role: "Social Media Assistant", image: "" },
  { name: "Mio Raimondi", role: "Social Media Assistant", image: "" },
];

const ArtistRepertoire: Person[] = [
  { name: "Gabby Govantez", role: "A&R Manager", image: "" },
  { name: "Paulina Diaz", role: "A&R Manager", image: "/images/paulina.png" },
  { name: "Ariah Claude", role: "A&R Manager", image: "/images/ariah.png" },
];

const ArtistPromotions: Person[] = [
  {
    name: "Meira Lee",
    role: "Artist Promotions Director",
    image: "/images/meira.png",
  },
  {
    name: "Rockxy Nieves",
    role: "Artist Promotions Manager",
    image: "/images/rockxy.png",
  },
];

const ConcertManagement: Person[] = [
  {
    name: "Lauren Walker",
    role: "Concert Director",
    image: "/images/lauren.jpeg",
  },
  { name: "Mikayla Chu", role: "Concert Productions Assistant", image: "" },
];

const Creative: Person[] = [
  {
    name: "Elliot Gunn", role: "Social Media Assistant", image: "/images/elliot_irl.jpeg",
  },
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
              className="flex flex-col w-30 [&_h2]:text-[#656565] [&_p]:text-[#656565] dark:[&_h2]:text-[#fbfbfb] dark:[&_p]:text-[#D9D9D9] transition-all duration-300 ease-in-out"
            >
              <img
                src={a.image}
                // alt={"Picture of " + a.name}
                className="w-30 h-30 min-w-30 min-h-30 bg-pink-300 rounded-2xl object-cover"
              />
              <h2 className="font-semibold transition-all duration-300 ease-in-out">{a.name}</h2>
              <p className="text-sm transition-all duration-300 ease-in-out">{a.role}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function Executive() {
  return (
    <div className="[&>div:not(.fatHeader)]:py-2 gap-2 w-full px-10 [&_h1]:text-[#656565] dark:[&_h1]:text-[#fbfbfb] transition-all duration-300 ease-in-ou">
      <div className="py-7 fatHeader"></div>
      <div className="block">
        <div className="w-full border-b-[1.5px] border-gray-300 dark:border-[#323236] transition-all duration-300 ease-in-out">
          <h1 className="font-bold text-3xl transition-all duration-300 ease-in-out">Label Management</h1>
        </div>

        <TeamContainers arr={LabelManagement} />
      </div>

      <div className="block">
        <div className="w-full border-b-[1.5px] border-gray-300 dark:border-[#323236] transition-all duration-300 ease-in-out">
          <h1 className="font-bold text-3xl transition-all duration-300 ease-in-out">Label Marketing</h1>
        </div>

        <TeamContainers arr={LabelMarketing} />
      </div>

      <div className="block">
        <div className="w-full border-b-[1.5px] border-gray-300 dark:border-[#323236] transition-all duration-300 ease-in-out">
          <h1 className="font-bold text-3xl transition-all duration-300 ease-in-out">Artist & Repertoire</h1>
        </div>

        <TeamContainers arr={ArtistRepertoire} />
      </div>

      <div className="block">
        <div className="w-full border-b-[1.5px] border-gray-300 dark:border-[#323236] transition-all duration-300 ease-in-out">
          <h1 className="font-bold text-3xl transition-all duration-300 ease-in-out">Artist Promotions</h1>
        </div>

        <TeamContainers arr={ArtistPromotions} />
      </div>

      <div className="block">
        <div className="w-full border-b-[1.5px] border-gray-300 dark:border-[#323236] transition-all duration-300 ease-in-out">
          <h1 className="font-bold text-3xl transition-all duration-300 ease-in-out">Concert Management</h1>
        </div>

        <TeamContainers arr={ConcertManagement} />
      </div>

      <div className="block">
        <div className="w-full border-b-[1.5px] border-gray-300 dark:border-[#323236] transition-all duration-300 ease-in-out">
          <h1 className="font-bold text-3xl transition-all duration-300 ease-in-out">Creative</h1>
        </div>

        <TeamContainers arr={Creative} />
      </div>
    </div>
  );
}
