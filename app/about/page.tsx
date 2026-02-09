import Image from "next/image"

export default function About() {
    return (
        <div className="flex flex-col items-center mt-8">
            <div className="">
                <Image
                    src="/CDCase.svg"
                    alt="CD Case"
                    title="People"
                    width={300}
                    height={300}
                    className="drop-shadow-lg shadow-lg drop-shadow-black m-4 hover:scale-105 transition-all ease-in-out duration-300" // Consider custom shadow values to be more accurate to figma
                />
            </div>
            <p className="text-[#656565] text-center text-lg w-148.75 mt-8">
                Knights Records aims to foster the growth of emerging artists and industry professionals within the UCF and Orlando communities by operating as a mock music label. Through hands-on management, marketing, and event coordination, we provide students and local talent with the tools, resources, and experience needed to succeed in the music industry.
            </p>
            <button
                className="mt-3 px-4 py-1 rounded-md bg-[#656565] text-white font-semibold"
                type="button"
            >
                Join Now
            </button>
            <div>
                <h1 className="mt-12 text-[#656565] font-semibold text-3xl">
                    Connect with Us
                </h1>
            </div>
            <div className="w-229 border-t-[1.5px] border-[#D9D9D9] " /> {/* modify layout.tsx at some point so each page has a footer/space at bottom */}
            <div className="mt-3 grid grid-cols-4 gap-4 place-items-center mb-20">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="w-16 h-16 bg-[#CCBABA] rounded-2xl" />
                ))}
            </div>

        </div>
    )
}