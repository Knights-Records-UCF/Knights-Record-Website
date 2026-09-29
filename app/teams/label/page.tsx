"use client";
import ImageCarousel from "@/app/components/TeamCarousel";

interface Person {
  name: string;
  role: string;
  image: string;
}

const LabelManagement: Person[] = [
  {
    name: "Connelly Vincent",
    role: "A&R Director",
    image: "/images/connelly.JPG",
  },
];

const LabelMarketing: Person[] = [
  { name: "Anen", role: "Marketing Manager/Graphic Designer", image: "" },
  {
    name: "Brea",
    role: "Marketing Manager/Graphic Designer",
    image: "",
  },
  {
    name: "Elliot",
    role: "Marketing Manager/Graphic Designer",
    image: "/images/elliot_irl.jpeg",
  },
];

const ArtistRepertoire: Person[] = [
  { name: "Brianna", role: "A&R Manager", image: "/images/brianna.jpg" },
  { name: "Bianca", role: "A&R Manager", image: "" },
  { name: "Ariah", role: "A&R Manager", image: "/images/ariah.png" },
];

const ArtistPromotions: Person[] = [
  {
    name: "Rockxy",
    role: "Artist Promotions Director",
    image: "/images/rockxy.png",
  },
];

const LiveEvents: Person[] = [
  {
    name: "Milena",
    role: "Live Events Director",
    image: "",
  },
];

const Creative: Person[] = [
  { name: "Camille", role: "Creative Director", image: "" },
  { name: "Tommy Tran", role: "Creative Assistant", image: "" },
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
        <ImageCarousel arr={ArtistPromotions} title={"Artist Promotions"} />
      </div>

      <div className="block">
        <ImageCarousel arr={LiveEvents} title={"Live Events"} />
      </div>

      <div className="block">
        <ImageCarousel arr={Creative} title={"Creative"} />
      </div>
    </div>
  );
}
