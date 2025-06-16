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
        <main className="px-26 pt-6 flex justify-between h-screen bg-gray-50">
            <div className="w-2/5 flex flex-col justify-center items-center w-1/2 h-full">
                <div className="pb-6"><Origami className="h-12 w-12"/></div>
                <div className="flex flex-col justify-center items-center gap-y-2 w-1/2">
                    <p className="text-2xl font-medium pb-6">Log in to Swift</p>
                    {/* <p>Create a free account</p> */}
                    <div className="w-full border-solid border-2 rounded-sm border-gray-700 mt-2 text-center my-auto">
                        <Link href="/signup" className="inline-block w-full h-full py-2">
                            <FaGoogle className="h-4 w-4 mr-1 inline-block"/>
                            Log in with Google
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
                    <div className="">
                        <button className="w-full cursor-pointer border-solid border-2 rounded-sm border-gray-700 px-10 py-2 mt-3 text-center text-sm font-medium bg-black text-gray-100" onClick={loginHandler}>{loading? <Spinner size='h-5 w-5' fullScreen={false}/> : "Log In"}</button>
                    </div>
                </div>
                <div className="flex gap-x-1 pt-4">
                    <p>Don't have an account?</p>
                    <Link href="/signup" className="underline text-blue-500">Sign up</Link>
                </div>
            </div>
            <div className="w-3/5 mx-auto">
                <img src="/landing-page-1.png" alt="" className="w-full object-contain"/>
            </div> 

            {toast && <Toast message={toast} onClose={clearToast}/>}
        </main>
    )
}

export default Login;