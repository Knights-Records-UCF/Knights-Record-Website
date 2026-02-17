import Carousel from "./components/Carousel";
import Calendar from "./components/Calendar";

// Get used to using interfaces and types for type safety and better code readability
interface announcement {
    title: string;
    description: string;
    bgColor: string;
}

// Temp array, we gonna use a db later
const announcementsArr : announcement[] = [
    {
        title: "Next meeting",
        description: "hello oijdoifjaoidsjfo jasdof fdosfj osdjfosd",
        bgColor: "bg-[#E18181]",
    },
    {
        title: "Workshop!!!",
        description: "hello oijdoifjaoidsjfo jasdof fdosfj osdjfosd",
        bgColor: "bg-[#17A1FA]",
    },
    {
        title: "Super cool social",
        description: "hello oijdoifjaoidsjfo jasdof fdosfj osdjfosd",
        bgColor: "bg-[#8AFFC8]",
    },
    {
        title: "Helo guys!!!!",
        description: "hello oijdoifjaoidsjfo jasdof fdosfj osdjfosd",
        bgColor: "bg-[#1C7049]",
    },
    {
        title: "Helo guys!!!!",
        description: "hello oijdoifjaoidsjfo jasdof fdosfj osdjfosd",
        bgColor: "bg-[#1C7049]",
    },
    {
        title: "Helo guys!!!!",
        description: "hello oijdoifjaoidsjfo jasdof fdosfj osdjfosd",
        bgColor: "bg-[#1C7049]",
    },
]



export default function Home() {

  return (
    <div className=" text-left ">
      <h1 className=" text-[#656565] font-[525] text-3xl mt-2">
        Announcements <span className="text-sm"> {'< >'}</span> 
      </h1>
      <div className="border border-[#D9D9D9] mb-0.5" />
      <Carousel children={announcementsArr} />
      <div className="mt-12">
        <h1 className="font-[525] text-2xl text-left text-[#656565]">
          February <span className="text-xl font-normal text-[#656565]/50"> 2026</span>
        </h1>
        <div className="border border-[#D9D9D9] mb-4" />
        <Calendar />
      </div>

    </div>
  );
}
