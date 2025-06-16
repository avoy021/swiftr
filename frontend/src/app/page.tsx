import Link from "next/link";
import { Navbar } from "@/components";

const Home = () => {      
  return (    
      <main className="w-11/12 mx-auto">
        <Navbar/>
        <div className="flex">
          <div className="w-2/5 pt-6 flex flex-col gap-y-3 justify-center">
            <p className="font-bold text-4xl">Seamless Conversations</p>
            <p className="font-bold text-4xl">Anytime, Anywhere</p>
            <p className="font-bold text-4xl">Swift – Fast, Simple and </p>
            <p className="font-bold text-4xl">Seamless Chat </p>
            <p className="text-base py-4">Swift is a fast and reliable chat app designed for seamless communication with your friends and family</p>
            <button className="w-fit px-10 py-3 bg-black text-gray-50 text-md font-medium rounded-lg">Get Started</button>
          </div>
          <div className="w-3/5">
            <img src="/landing-page-1.png" alt="" className="max-h-147 my-auto mx-auto object-contain"/>
          </div>
        </div>
      </main>
  );
}

export default Home;