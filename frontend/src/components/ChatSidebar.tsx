"use client";

import { FaEnvelope, FaUserPlus, FaUser, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { logoutUser } from "@/lib/features/user/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";

const ChatSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <nav className="
      fixed bg-black text-gray-100 shadow-md z-50
      w-full bottom-0 flex justify-between items-center py-3
      md:top-0 md:left-0 md:bottom-0 md:w-[clamp(6rem,7.5vw,10rem)] md:h-full md:flex-col md:items-start md:pl-[clamp(0.25rem,1vw,50px)] md:py-6
    ">

      {/* Logo (top) */}
      <Link 
        href="#" 
        className="hidden md:block md:mb-6 flex flex-col items-center hover:text-blue-500"
      >
        <span className="text-sm md:text-lg">swiftr</span>
      </Link>

      {/* Links (center vertically on md screens) */}
      <div className="
        flex w-full px-6 justify-between
        md:flex-col md:justify-center md:gap-y-10 md:px-0
      ">
        {/* Messages */}
        <Link 
          href="#" 
          className="flex flex-col items-center md:flex-row md:gap-x-2 hover:text-blue-500"
        >
          <FaEnvelope className="text-sm md:text-lg" />
          <span className="text-xs md:text-sm">Inbox</span>
        </Link>

        {/* Add Friend */}
        <Link 
          href="#" 
          className="flex flex-col items-center md:flex-row md:gap-x-2 hover:text-blue-500"
        >
          <FaUserPlus className="text-sm md:text-lg" />
          <span className="text-xs md:text-sm">Add</span>
        </Link>

        {/* Profile */}
        <Link 
          href="#" 
          className="flex flex-col items-center md:flex-row md:gap-x-2 md:-ml-0.5 hover:text-blue-500"
        >
          <FaUser className="text-sm md:text-lg" />
          <span className="text-xs md:text-sm">Profile</span>
        </Link>

        {/* Logout (only on small screens) */}
        <button
          onClick={() => dispatch(logoutUser())}
          className="flex flex-col items-center hover:text-red-500 md:hidden"
        >
          <FaSignOutAlt className="text-sm" />
          <span className="text-xs">Logout</span>
        </button>
      </div>

      {/* Logout (bottom on md) */}
      <button
        onClick={() => dispatch(logoutUser())}
        className="hidden md:flex md:gap-x-1.5 hover:text-red-500 mt-6"
      >
        <FaSignOutAlt className="text-sm md:text-lg" />
        <span className="text-xs md:text-sm">Logout</span>
      </button>
    </nav>
  );
}

export default ChatSidebar;
