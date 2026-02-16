import Carousel from "./components/Carousel";
import Calendar from "./components/Calendar";



export default function Home() {

  return (
    <div className=" text-left ">
      <h1 className=" text-[#656565] font-[525] text-3xl mt-2">
        Announcements <span className="text-sm"> {'< >'}</span> 
      </h1>
      <div className="border border-[#D9D9D9] mb-0.5" />
      <Carousel />
      <div className="mt-12">
        <h1 className="font-[525] text-3xl text-left text-[#656565]">
          February <span className="text-2xl font-normal text-[#656565]/50"> 2026</span>
        </h1>
        <div className="border border-[#D9D9D9] mb-4" />
        <Calendar />
      </div>

    </div>
  );
}
