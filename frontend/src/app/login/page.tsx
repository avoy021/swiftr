"use client";
import Link from "next/link";
import { Origami } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setUser } from "@/lib/features/user/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { Spinner, Toast } from "@/components";
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
            showToast("Welcome back")
            setEmail("");
            setPassword("");
            router.push("/dashboard");
        }
    },[accessToken])
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#789fc2] to-white font-lato">
      <div className="bg-gray-50 p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login to Swiftr</h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={loginHandler}
            className="w-full py-2 bg-gray-800 text-white rounded-md font-semibold hover:bg-gray-700 transition"
          >
            Log In
          </button>
        </div>

        <p className="text-sm text-center text-gray-600 mt-6">
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