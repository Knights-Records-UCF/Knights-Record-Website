// When the time comes swap "sleeveColor" with "sleeveImage". We'll probably do something similar for "recordcolor"

interface Record {
    sleeveColor: string;
    recordColor: string;

}

const recordArr: Record[] = [
    {
        sleeveColor: "bg-[#81E1CE]",
        recordColor: "bg-[#D9D9D9]"
    },
    {
        sleeveColor: "bg-[#DE81E1]",
        recordColor: "bg-[#D9D9D9]",
    },
    {
        sleeveColor: "bg-[#E18181]",
        recordColor: "bg-[#D9D9D9]",
    },
    {
        sleeveColor: "bg-[#619190]",
        recordColor: "bg-[#D9D9D9]",
    },
    {
        sleeveColor: "bg-[#E1C381]",
        recordColor: "bg-[#D9D9D9]",
    },
]

export default function Vinyl() {
    return (
        // Maybe switch to aside later since this is lowk like a navbar but for artists
        <div className="flex flex-col gap-4">
            {recordArr.map((vinyl, i) => (
                <div
                    key={i}
                    className="relative w-32 h-32 group"
                >
                    

                    {/* Album Sleeve */}
                    <div
                        className={`absolute inset-0 z-10 ${vinyl.sleeveColor} drop-shadow-md drop-shadow-gray-400`}
                    />

                    {/* Record */}
                    <div
                        className={`absolute inset-0 z-0 ${vinyl.recordColor} rounded-full scale-95  transition-transform drop-shadow-gray-400 drop-shadow-md duration-300 group-hover:translate-x-16`}
                    >
                    </div>
                </div>
            ))}
        </div>
    )
}