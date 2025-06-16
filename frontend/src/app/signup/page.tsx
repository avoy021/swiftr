"use client";
import Link from "next/link";
import { Origami } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"

const Signup = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [err,setErr] = useState("");
    const router = useRouter();
    const signupHandler = async() => {
        if(!email || !password) return;
        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:8000/api/user/signup",
                data: {
                    email,
                    password
                }
            })
            const res = response.data;
            console.log("response",res); 
            setEmail("");
            setPassword("");
            router.push("/login");
        } catch (error:any) {
            setErr(error.response.data.message)
            console.log("errr",error.response.data);
        }
    }
    return (
        <main className="px-26 pt-6 flex justify-between h-screen bg-gray-50">
            <div className="w-2/5 flex flex-col justify-center items-center w-1/2 h-full">
                <div className="pb-6"><Origami className="h-12 w-12"/></div>
                <div className="flex flex-col justify-center items-center gap-y-2 w-1/2">
                    <p className="text-2xl font-medium pb-6">Sign up to Swift</p>
                    <div className="w-full border-solid border-2 rounded-sm border-gray-700 mt-2 text-center my-auto">
                        <Link href="/signup" className="inline-block w-full h-full py-2">
                            <FaGoogle className="h-4 w-4 mr-1 inline-block"/>
                            Sign up with Google
                        </Link>
                    </div>
                    <p className="text-center my-2">or</p>
                </div>
                <div className="flex flex-col gap-y-4 w-1/2">
                    <div className="">
                        {/* <label htmlFor="email">Email address</label> */}
                        <input type="text" name="email" id="email" className="block w-full px-2 py-2 mt-2 border-solid border-1 text-sm rounded-sm" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="">
                        {/* <label htmlFor="password">Password</label> */}
                        <input type="password" name="password" id="password" className="block w-full px-2 py-2 mt-2 border-solid border-1 text-sm rounded-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    {/* <p className="text-center my-0">{err?err:""}</p> */}
                    <div className="">
                        <button className="w-full cursor-pointer border-solid border-2 rounded-sm border-gray-700 px-10 py-2 text-center text-sm font-medium bg-black text-gray-100" onClick={signupHandler}>Sign Up</button>
                    </div>
                </div>
                <div className="flex gap-x-1 pt-4">
                    <p>Already have an account?</p>
                    <Link href="/login" className="underline text-blue-500">Log In</Link>
                </div>
            </div>
            <div className="w-3/5 mx-auto">
                <img src="/landing-page-1.png" alt="" className="w-full object-contain"/>
            </div> 
        </main>
    )
}

export default Signup;