"use client";
import Link from "next/link";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setUser } from "@/lib/features/user/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { Spinner, Toast } from "@/Components";
import { useToast } from "@/hooks/useToast";

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const {accessToken,loading} = useSelector((state:RootState) => state.user)
    const router = useRouter();
    const {toast,showToast,clearToast} = useToast();
    const loginHandler = async() => {
        if(!email || !password) return;
        dispatch(loginUser({email,password}));
    }

    useEffect(() => {
        if(accessToken) {   
            // showToast("Welcome back")
            setEmail("");
            setPassword("");
            router.push("/dashboard");
        }
    },[accessToken])
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 md:bg-gradient-to-b from-[#789fc2] to-white font-lato">
            {/* <Link href="/" className="absolute top-12 left-1/2 -translate-x-1/2 text-3xl md:text-4xl font-bold font-lobster2">
                Swiftr
            </Link> */}
            <div className="w-[90%] max-w-[400px] md:bg-gray-50 md:shadow-md p-8 rounded-xl">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login to Swiftr</h1>

                {/* 🔹 Social Icons */}
                <div className="flex justify-center items-center gap-6 mb-6">
                    <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition">
                        <FaGoogle className="text-xl text-red-500" />
                    </button>
                    {/* <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition">
                        <FaGithub className="text-xl text-gray-800" />
                    </button>
                    <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition">
                        <FaFacebookF className="text-xl text-blue-600" />
                    </button> */}
                </div>

                {/* 🔹 Divider */}
                <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
                    <hr className="flex-grow border-gray-300" />
                    or
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* 🔹 Email/Password Inputs */}
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2.5 text-xs md:text-sm border border-gray-300 rounded-lg md:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2.5 text-xs md:text-sm border border-gray-300 rounded-lg md:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        onClick={loginHandler}
                        className="w-full py-2 bg-gray-800 text-white text-sm md:text-base rounded-3xl md:rounded-md font-semibold hover:bg-gray-700 transition"
                    >
                        {loading? <Spinner size='h-6 w-6' fullScreen={false}/> : <span className="">Log In</span> }
                    </button>
                </div>

                {/* 🔹 Sign-up Prompt */}
                <p className="text-base md:text-md text-center text-gray-600 mt-6">
                    Don’t have an account?{" "}
                    <Link href="/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default Login;