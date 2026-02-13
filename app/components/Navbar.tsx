import Link from "next/link";


export default function Navbar() {
    return (
        <aside className='h-screen w-64 bg-[#F5F5F5] drop-shadow-sm drop-shadow-gray-400 flex flex-col pt-5 overflow-y-auto'>

            {/* Title */}
            <div className='text-xl font-semibold mb-8 text-[#656565] text-center'>Knights Records</div>

            {/* Nav */}
            <ul className='px-2 space-y-2 text-lg text-[#656565] pt-12  '>

                <Link href='/'
                className='block rounded-lg px-4 py-2 hover:bg-[#EBEBEB] '>
                    Home
                </Link>

                <Link href='/about'
                className='block rounded-lg px-4 py-2 hover:bg-[#EBEBEB]'>
                    About
                </Link>

                <Link href='/teams'
                className='block rounded-lg px-4 py-2 hover:bg-[#EBEBEB]'>
                    Team
                </Link>

                <Link href='/artists'
                className='block rounded-lg px-4 py-2 hover:bg-[#EBEBEB]'>
                    Artists
                </Link>
            </ul>

            {/* Footer w/ placeholder text instead of icons for now*/}
            <div className="mt-auto text-lg pt-6 pb-5">
                <div className='flex justify-center gap-4 text-gray-500 '>
                    <a href="#" className="hover:text-black">IG</a>
                    <a href="#" className="hover:text-black">TW</a>
                    <a href="#" className="hover:text-black">LI</a>
                    <a href="#" className="hover:text-black">✉</a>
                </div>
                <div className="text-xs text-[#B8B8B8] flex justify-center">@ 2025 Knights Records</div>
            </div>
        </aside>

    )
}