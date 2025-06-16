"use client";
import { RootState } from "@/lib/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const Navbar = () => {
    const {accessToken,username} = useSelector((state:RootState) => state.user)
    return (
        <nav className="w-11/12 mx-auto flex justify-between my-4 font-thin">
            <div className="text-lg">
                <Link href="/">Swift</Link>
            </div>
            {
                (accessToken && username) ? 
                <div className="flex gap-x-12">
                    <Link href="/dashboard">Dashboard</Link>
                </div>
                :
                <div className="flex gap-x-12">
                    <Link href="/signup">Signup</Link>
                    <Link href="/login">Login</Link>
                </div>
            }
        </nav>
    )
}

export default Navbar;