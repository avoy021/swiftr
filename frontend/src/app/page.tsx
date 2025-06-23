"use client";
import Link from "next/link";
import { Menu,Send } from "lucide-react";
import { BgBlackBtn } from "@/components";
import Lottie from "lottie-react";
import Plane from "@/assets/blue-plane.json"

const In = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#8fc0c7] to-white overflow-x-hidden font-inter">
            {/* header */}
            <header className="flex justify-between w-[94%] mx-auto pt-[clamp(1rem,3vw,18vw)]">
                <Link href="#" className="flex lg:hidden justify-center items-center">
                    <Send className="w-8 h-8"/>        
                </Link>
                {/* style={{ width: 300, height: 300 }} */}
                <Link href="/" className="hidden lg:block text-[clamp(3rem,24rem,18vw)] font-bold leading-none tracking-tight z-10">Swiftr</Link>
                <Lottie animationData={Plane} loop={true} className="fixed left-[20%] top-[2%]"/>
                <div className="hidden lg:flex h-fit justify-end items-center space-x-10 text-lg mt-[15]">
                    <Link href="#" className="">
                        <button className="link-underline">Solutions</button>
                    </Link>
                    <Link href="#">
                        <button className="link-underline">About us</button>
                    </Link>
                    <Link href="#">
                        <button className="link-underline">Contact</button>
                    </Link>
                    {/* <Link href="#" className="flex items-center justify-center w-12 h-12 rounded-full bg-black">
                        <button className="hover:cursor-pointer flex items-center text-gray-500"><Menu className="w-4 h-4"/></button>
                    </Link> */}
                </div>
                <Link href="#" className="flex justify-center items-center w-12 h-12 rounded-full bg-black hover:bg-gray-900">
                    <button className="hover:cursor-pointer flex items-center text-gray-500"><Menu className="w-4 h-4"/></button>
                </Link>
            </header>
            <section className="flex flex-col lg:flex-row justify-between lg:items-end w-[92%] mx-auto pb-[clamp(1rem,3vw,18vw)]">
                <h1 className="lg:hidden text-[45px] font-bold tracking-tight pb-3 leading-none">Messaging reimagined</h1>      
                <h2 className="text-2xl font-semibold tracking-tight pb-8 lg:pb-0">Instant messaging, finally done right!</h2>
                <div className="space-x-4 flex justify-start pb-6 lg:pb-0">
                    <Link href="#" className="">
                        <BgBlackBtn text="All Solutions"/>
                    </Link>
                    <Link href="#" className="">
                        <BgBlackBtn text="Ownership"/>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default In;