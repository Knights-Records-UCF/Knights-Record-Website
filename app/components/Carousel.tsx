// Temp array, we gonna use a db later
const announcementsArr = [
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
    }
]

export default function Carousel() {
    return (
        <div>
            <div className="grid grid-cols-4 gap-25 ">
                {announcementsArr.map((announcement, index) => (
                    <div key={index} className="w-60">
                        <h1 className="text-[#656565] text-[14px] font-medium"> 
                            {announcement.title}
                        </h1>
                        <p className="text-[#656565] w-48 text-[14px] text-left leading-none">
                            {announcement.description}
                        </p>
                        <div className={`${announcement.bgColor} mt-1 h-42 w-60  rounded-xl`} />
                    </div>
                ))}
            </div>
        </div>
    )
}