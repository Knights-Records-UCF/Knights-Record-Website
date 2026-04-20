"use client";
import ImageCarousel from "@/app/components/TeamCarousel";

interface Person {
  name: string;
  role: string;
  image: string;
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
  {
    name: "Mio Raimondi",
    role: "Social Media Assistant",
    image: "/images/mio.png",
  },
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
    image: "/images/meira.PNG",
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
    image: "/images/lauren.JPEG",
  },
  { name: "Mikayla Chu", role: "Concert Productions Assistant", image: "" },
];

const Creative: Person[] = [
  {
    name: "Elliot Gunn",
    role: "Social Media Assistant",
    image: "/images/elliot_irl.jpeg",
  },
];

export default function Executive() {
  return (
    <div className="dark:[&_h1]:text-[#fbfbfb] dark:[&_p]:text-[#D9D9D9]  [&>div:not(.fatHeader)]:py-2 gap-2 w-full  px-4 md:px-10 [&_h1]:text-[#656565]">
      <div className="py-7 fatHeader"></div>
      <div className="block">
        <ImageCarousel arr={LabelManagement} title={"Label Management"} />
      </div>

      <div className="block">
        <ImageCarousel arr={LabelMarketing} title={"Label Marketing"} />
      </div>

      <div className="block">
        <ImageCarousel arr={ArtistRepertoire} title={"Artist & Repertoire"} />
      </div>

      <div className="block">
        <ImageCarousel arr={ArtistPromotions} title={"Artist Promotion"} />
      </div>

      <div className="block">
        <ImageCarousel arr={ConcertManagement} title={"Concert Management"} />
      </div>

      <div className="block">
        <ImageCarousel arr={Creative} title={"Creative"} />
      </div>
    </div>
  );
}
