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
      fixed bg-gray-100 text-black border-t border-gray-200
      w-full bottom-0 flex justify-around items-center py-2
      md:top-0 md:left-0 md:bottom-0 md:w-20 md:flex-col md:justify-start md:py-6 md:border-t-0 md:border-r
      shadow-md z-50
    ">
      {/* Logo */}
      <Link href="/" className="hidden md:block flex flex-col items-center text-gray-700 hover:text-blue-500 mb-0 md:mb-6">
        <span className="text-sm font-bold">Swiftr</span> 
      </Link>

      {/* Messages */}
      <Link href="/messages" className="flex flex-col items-center text-gray-700 hover:text-blue-500 mb-0 md:mb-6">
        <FaEnvelope className="text-xl" />
        <span className="text-xs">Messages</span>
      </Link>

      {/* Add Friend */}
      <Link href="/add-friend" className="flex flex-col items-center text-gray-700 hover:text-blue-500 mb-0 md:mb-6">
        <FaUserPlus className="text-xl" />
        <span className="text-xs">Add Friend</span>
      </Link>

      {/* Profile */}
      <Link href="/profile" className="flex flex-col items-center text-gray-700 hover:text-blue-500 mb-0 md:mb-6">
        <FaUser className="text-xl" />
        <span className="text-xs">Profile</span>
      </Link>

      {/* Logout */}
      <button
        onClick={() => dispatch(logoutUser())}
        className="flex flex-col items-center text-gray-700 hover:text-red-500 mb-0 md:mt-auto"
      >
        <FaSignOutAlt className="text-xl" />
        <span className="text-xs">Logout</span>
      </button>
    </nav>
  );
}

export default ChatSidebar;