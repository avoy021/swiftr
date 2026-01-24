"use client";
import Link from "next/link";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Spinner } from "@/Components";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { loading } = useSelector((state:RootState) => state.user)
  const router = useRouter();
  const signupHandler = async () => {
    if (!email || !password) return;
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/api/user/signup",
        data: {
          email,
          password,
        },
      });
      const res = response.data;
      console.log("response", res);
      setEmail("");
      setPassword("");
      router.push("/login");
    } catch (error: any) {
      setErr(error.response.data.message);
      console.log("errr", error.response.data);
    }
  };
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FFE3BB] to-white font-lato">
            {/* <Link href="/" className="absolute top-12 left-1/2 -translate-x-1/2 text-3xl md:text-4xl font-bold font-lobster2">
                Swiftr
            </Link> */}
            <div className="w-[90%] max-w-[400px] md:bg-gray-50 md:shadow-lg p-8 rounded-xl">
                <h1 className="text-2xl font-bold text-dark mb-6 text-center">Sign up to Swiftr</h1>

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
                        onClick={signupHandler}
                        className="w-full py-2 bg-dark text-white text-sm md:text-base rounded-3xl md:rounded-md font-semibold hover:bg-gray-700 transition"
                    >
                        {loading? <Spinner size='h-6 w-6' fullScreen={false}/> : <span className="">Sign up</span> }
                    </button>
                </div>

                {/* 🔹 Sign-up Prompt */}
                <p className="text-base md:text-md text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </main>
  );
};

export default Signup;
