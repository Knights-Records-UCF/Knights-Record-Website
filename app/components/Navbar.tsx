import Link from "next/link";


export default function Navbar() {
    return (
        <aside className='h-screen w-64 bg-[#F5F5F5] border-r border-gray-100 flex flex-col pt-5 overflow-y-auto'>

            <div className='text-lg font-semibold mb-8 text-black text-center'>Knights Records</div>


            <ul className='space-y-2 text-black pt-10'>

                <Link href='/'
                className='block rounded-lg px-4 py-2 hover:bg-gray-100'>
                    Home
                </Link>

                <Link href='/about'
                className='block rounded-lg px-4 py-2 hover:bg-gray-100'>
                    About
                </Link>

                <Link href='/teams'
                className='block rounded-lg px-4 py-2 hover:bg-gray-100'>
                    Team
                </Link>

                <Link href='/artists'
                className='block rounded-lg px-4 py-2 hover:bg-gray-100'>
                    Artists
                </Link>
            </ul>
        </aside>

    )
}