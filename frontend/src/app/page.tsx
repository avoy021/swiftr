import Link from "next/link";
import { Menu,Send } from "lucide-react";

const In = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#8fc0c7] to-white overflow-x-hidden font-helvetica box-border">
            {/* header */}
            <header className="self-start flex justify-between w-[94%] mx-auto pt-[clamp(1rem,3vw,18vw)]">
                <Link href="#" className="flex lg:hidden justify-center items-center">
                    <Send className="w-8 h-8"/>        
                </Link>
                <Link href="/" className="hidden lg:block text-[clamp(3rem,24rem,18vw)] font-bold leading-none">Swiftr</Link>
                <div className="hidden lg:flex h-fit justify-end items-center space-x-10 text-lg mt-[15]">
                    <Link href="#" className="">
                        <button className="hover:underline hover:cursor-pointer">Solutions</button>
                    </Link>
                    <Link href="#">
                        <button className="hover:underline hover:cursor-pointer">About Us</button>
                    </Link>
                    <Link href="#">
                        <button className="hover:underline hover:cursor-pointer">Contact</button>
                    </Link>
                    {/* <Link href="#" className="flex items-center justify-center w-12 h-12 rounded-full bg-black">
                        <button className="hover:cursor-pointer flex items-center text-gray-500"><Menu className="w-4 h-4"/></button>
                    </Link> */}
                </div>
                <Link href="#" className="flex justify-center items-center w-12 h-12 rounded-full bg-black">
                    <button className="hover:cursor-pointer flex items-center text-gray-500"><Menu className="w-4 h-4"/></button>
                </Link>
            </header>
            <section className="flex-end flex justify-between w-[92%] mx-auto pb-[clamp(1rem,3vw,18vw)]">
                <h2 className="text-xl font-semibold">Instant messaging, finally done right!</h2>
                <div className="space-x-4">
                    <Link href="#" className="">
                        <button className="hover:underline hover:cursor-pointer">All Solutions</button>
                    </Link>
                    <Link href="#" className="">
                        <button className="hover:underline hover:cursor-pointer">Ownership</button>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default In;