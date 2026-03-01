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
  { name: "Connelly Vincent", role: "A&R Manager", image: "/images/connelly.jpg" },
];

const LabelMarketing: Person[] = [
  { name: "Anen Jamir", role: "Social Media Assistant", image: "" },
  { name: "Diana Ramon", role: "Social Media Assistant", image: "" },
  { name: "Siddh Gandhi", role: "Social Media Assistant", image: "" },
  { name: "Mio Raimondi", role: "Social Media Assistant", image: "" },
];

const ArtistRepertoire: Person[] = [
    { name: "Gabby Govantez", role: "A&R Manager", image: "" },
    { name: "Paulina Diaz", role: "A&R Manager", image: "/images/paulina.png" },
    { name: "Ariah Claude", role: "A&R Manager", image: "/images/ariah.png" },
    { name: "Jorge", role: "A&R Assistant", image: "" },
];

const ArtistPromotions: Person[] = [
  { name: "Meira Lee", role: "Artist Promotions Director", image: "/images/meira.png" },
  { name: "Rockxy Nieves", role: "Artist Promotions Manager", image: "/images/rockxy.png" },
];

const ConcertManagement: Person[] = [
  { name: "Lauren Walker", role: "Concert Director", image: "/images/lauren.jpeg" },
  { name: "Mikayla Chu", role: "Concert Productions Assistant", image: "" },
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
              className="flex flex-col w-40 [&_h2]:text-[#656565] [&_p]:text-[#656565]"
            >
              <img
                src={a.image}
                // alt={"Picture of " + a.name}
                className="w-30 h-30 bg-pink-300 rounded-2xl object-cover"
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
        <div className="w-full border-b-2 border-gray-300 ">
          <h1 className="font-bold text-3xl ">Label Management</h1>
        </div>

        <TeamContainers arr={LabelManagement} />
      </div>

      <div className="block">
        <div className="w-full border-b-2 border-gray-300 ">
          <h1 className="font-bold text-3xl ">Label Marketing</h1>
        </div>

        <TeamContainers arr={LabelMarketing} />
      </div>

      <div className="block">
        <div className="w-full border-b-2 border-gray-300 ">
          <h1 className="font-bold text-3xl ">Artist & Repertoire</h1>
        </div>

        <TeamContainers arr={ArtistRepertoire} />
      </div>

      <div className="block">
        <div className="w-full border-b-2 border-gray-300 ">
          <h1 className="font-bold text-3xl ">Artist Promotions</h1>
        </div>

        <TeamContainers arr={ArtistPromotions} />
      </div>

      <div className="block">
        <div className="w-full border-b-2 border-gray-300 ">
          <h1 className="font-bold text-3xl ">Concert Management</h1>
        </div>

        <TeamContainers arr={ConcertManagement} />
      </div>
    </div>
  );
}
