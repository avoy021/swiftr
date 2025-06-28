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
      fixed border-t border-gray-200
      w-full bottom-0 flex justify-between items-center py-3
      md:top-0 md:left-0 md:bottom-0 md:w-[clamp(7rem,9vw,10rem)] md:h-full md:flex-col md:justify-between md:py-6 md:border-t-0 md:border-r
      shadow-md z-50 text-black
    ">
      {/* Logo */}
      <Link href="/" className="hidden md:block flex flex-col items-center hover:text-blue-500 mb-0 md:mb-6 md:mx-auto">
        <span className="text-sm md:text-lg font-bold">Swiftr</span> 
      </Link>

      {/* Navbar for screen<md */}
      <div className="flex w-full px-6 md:flex-col md:gap-y-6 md:px-0 justify-between items-center">

        {/* Messages */}
        <Link href="/messages" className="flex flex-col items-center md:flex-row md:gap-x-2 hover:text-blue-500 mb-0 md:mb-6  md:mx-auto">
          <FaEnvelope className="text-sm md:text-lg" />
          <span className="text-xs md:text-sm">Inbox</span>
        </Link>

        {/* Add Friend */}
        <Link href="/add-friend" className="flex flex-col items-center md:flex-row md:gap-x-2 hover:text-blue-500 mb-0 md:mb-6  md:mx-auto">
          <FaUserPlus className="text-sm md:text-lg" />
          <span className="text-xs md:text-sm">Add</span>
        </Link>

        {/* Profile */}
        <Link href="/profile" className="flex flex-col items-center md:flex-row md:gap-x-2 hover:text-blue-500 mb-0 md:mb-6">
          <FaUser className="text-sm md:text-lg" />
          <span className="text-xs md:text-sm">Profile</span>
        </Link>
        {/* Logout */}
        <button
          onClick={() => dispatch(logoutUser())}
          className="flex flex-col items-center hover:text-red-500 mb-0 md:hidden"
        >
          <FaSignOutAlt className="text-sm md:text-lg" />
          <span className="text-xs md:text-sm">Logout</span>
        </button>
      </div>


      {/* Logout */}
      <button
        onClick={() => dispatch(logoutUser())}
        className="hidden md:flex md:gap-x-2 text-black hover:text-red-500 mb-0"
      >
        <FaSignOutAlt className="text-sm md:text-lg" />
        <span className="text-xs md:text-sm">Logout</span>
      </button>
    </nav>
  );
}

export default ChatSidebar;