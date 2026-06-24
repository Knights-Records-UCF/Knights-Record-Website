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
        <div className="flex flex-col items-center px-4 py-8 md:px-8 md:py-12">
            <div className="w-full max-w-55 sm:max-w[260px] md:max-w-75">
                <Image
                    src="/CDCase.svg"
                    alt="CD Case"
                    title="People"
                    width={300}
                    height={300}
                    className="h-auto w-full drop-shadow-lg shadow-lg drop-shadow-black mb-6 hover:scale-105 transition-all ease-in-out duration-300" // Consider custom shadow values to be more accurate to figma
                />
            </div>
            <p className="mt-6 w-full max-w-2xl text-center text-sm sm:text-base md:text-lg text-[#656565] dark:text-[#fbfbfb] transition-all duration-300 ease-in-out">
                Knights Records aims to foster the growth of emerging artists and industry professionals within the UCF and Orlando communities by operating as a mock music label. Through hands-on management, marketing, and event coordination, we provide students and local talent with the tools, resources, and experience needed to succeed in the music industry.
            </p>
            <button
                className="mt-5 rounded-md bg-[#656565] px-4 py-1 text-sm sm:text-base font-semibold text-white"
                type="button"
            >
                Join Now
            </button>
            <div>
                <h1 className="mt-12 mb-2 text-xl sm:text-2xl font-[525] text-[#656565] dark:text-[#fbfbfb] transition-all duration-300 ease-in-out">
                    Connect with Us
                </h1>
            </div>
            <div className="w-full max-w-5xl border-t-[1.5px] border-[#D9D9D9] dark:border-[#323236] transition-all duration-300 ease-in-out" /> {/* modify layout.tsx at some point so each page has a footer/space at bottom */}
            <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-4 md:gap-5 place-items-center">
                {colorArr.map((cube, i) => (
                    <div
                    key={i}
                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${cube.color} rounded-xl sm:rounded-2xl`}
                    />
                ))}
            </div>

        </div>
    )
}