"use client";
import Link from "next/link";
import { Menu,Send } from "lucide-react";
import { BgBlackBtn } from "@/Components";
import Lottie from "lottie-react";
import Plane from "@/assets/plane.json"
import Indicators from "@/assets/indicators.json"

const landingPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-background overflow-x-hidden font-lato">
            {/* header */} 
            {/* color codes: #6a9ac4, #648fb5*/}
            <header className="flex justify-between w-[94%] mx-auto mt-[clamp(1rem,3vw,16vw)]">
                <Link href="#" className="flex lg:hidden justify-center items-center">
                    <Send className="w-8 h-8"/>        
                </Link>
                <Link href="/" className="hidden lg:block text-[clamp(3rem,24rem,18vw)] font-bold leading-none tracking-tight z-10 -mt-10 text-primary">Swiftr</Link>
                <Lottie animationData={Plane}  loop={true} className="fixed left-[19%] top-[5%]"/>
                <div className="hidden lg:flex flex-col gap-y-20">
                    <div className="flex justify-start items-center space-x-10 text-xl mt-[15] font-medium text-primary">
                        <Link href="#" className="">
                            <button className="link-underline">Features</button>
                        </Link>
                        <Link href="#">
                            <button className="link-underline">About us</button>
                        </Link>
                        <Link href="#">
                            <button className="link-underline">Privacy</button>
                        </Link>
                        {/* <Link href="#" className="flex items-center justify-center w-12 h-12 rounded-full bg-black">
                            <button className="hover:cursor-pointer flex items-center text-gray-500"><Menu className="w-4 h-4"/></button>
                        </Link> */}
                    </div>
                    <h1 className="hidden lg:block text-6xl font-[400] tracking-tight leading-none text-primary"><span className="block">Swift, Secure</span><span className="block">Chat</span></h1>
                </div>
                <Link href="#" className="flex justify-center items-center w-12 h-12 rounded-full bg-primary hover:cursor-pointer">
                    <button className="flex items-center text-light"><Menu className="w-4 h-4"/></button>
                </Link>
            </header>
            <section className="flex flex-col lg:flex-row justify-between lg:items-end w-[92%] mx-auto pb-[clamp(1rem,3vw,18vw)] text-primary">
                <h1 className="lg:hidden text-[45px] font-bold tracking-tight pb-3 leading-none">Secure messaging</h1>      
                <h2 className="text-2xl font-[600] tracking-tight pb-8 lg:pb-0">Instant messaging, finally done right!</h2>
                <div className="space-x-4 flex justify-start pb-6 lg:pb-0">
                    <Link href="/signup" className="">
                        <button className="font-bold text-lg px-6 py-2 rounded-4xl bg-primary text-light transition">Signup</button>
                    </Link>
                    <Link href="/login" className="">
                        <button className="font-bold text-lg px-6 py-2 rounded-4xl border-2 border-primary transition ">Login</button>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default landingPage;