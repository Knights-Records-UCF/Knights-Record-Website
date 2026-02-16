import Image from "next/image";
import Carousel from "./components/Carousel";



export default function Home() {
  return (
    <div className=" text-left max-h-screen">
      <h1 className="text-left text-[#656565] font-[525] text-3xl mt-2">
        Announcements
      </h1>
      <div className="border border-[#D9D9D9] mb-0.5" />  
      <Carousel/>
      Home 
    </div>
  );
}
