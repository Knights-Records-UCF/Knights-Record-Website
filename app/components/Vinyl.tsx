interface Record {
    sleeveColor: string;
    vinylColor: number;
    
}

const recordArr: Record[] = [
    {
        sleeveColor: "bg-[#81E1CE]",
        vinylColor: 0,
    },
    {
        sleeveColor: "bg-[#DE81E1]",
        vinylColor: 1,
    },
    {
        sleeveColor: "bg-[#E18181]",
        vinylColor: 2,
    },
    {
        sleeveColor: "bg-[#619190]",
        vinylColor: 3,
    },
    {
        sleeveColor: "bg-[#E1C381]",
        vinylColor: 4,
    },
]

export default function Vinyl() {
    return (
        <div className="flex flex-col gap-4 ">
            {recordArr.map((vinyl, i) => 
                <div
                    key={i} 
                    className={` w-32 h-32 ${vinyl.sleeveColor} drop-shadow-2xl shadow-md`}
                />
            
            )}
        </div>
    )
}