import Image from "next/image"

const colorArr = [
    {
        color: "bg-[#CCBABA]",
    },
    {
        color: "bg-[#818FE1]",
    },
    {
        color: "bg-[#E181D6]",
    },
    {
        color: "bg-[#E18181]",
    },
]

export default function About() {
    return (
        <div className="flex flex-col items-center max-h-screen mb-16">
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
                className="mt-5 px-4 py-1 rounded-md bg-[#656565] text-white font-semibold"
                type="button"
            >
                Join Now
            </button>
            <div>
                <h1 className="mt-12 text-[#656565] font-[525] text-[24px] mb-2">
                    Connect with Us
                </h1>
            </div>
            <div className="w-229 border-t-[1.5px] border-[#D9D9D9] " /> {/* modify layout.tsx at some point so each page has a footer/space at bottom */}
            <div className="mt-4 grid grid-cols-4 gap-5 place-items-center">
                {colorArr.map((cube, i) => (
                    <div key={i} className={`w-16 h-16 ${cube.color} rounded-2xl `} />
                ))}
            </div>

        </div>
    )
}