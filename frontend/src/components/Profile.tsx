"use client";
import axiosInstance from "@/lib/axiosInterceptors";
import { setContacts } from "@/lib/features/user/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ProfileCardProps {
    setOpenProfile: React.Dispatch<React.SetStateAction<boolean>>;
    openProfile: boolean;
}

const Profile:React.FC<ProfileCardProps> = ({openProfile,setOpenProfile}) => {
    const {username} = useSelector((state:RootState) => state.user);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [pic,setPic] = useState("default-pic.jpg");
    const closeProfile = () => {
        setOpenProfile(false);
    }
    return (
        <>
            {
                openProfile && (
                        <main className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50" onClick={closeProfile}>
                            <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-xl w-[90%] max-w-[450px] pb-8" onClick={(e) => e.stopPropagation()}>
                                <div className="bg-yellow-400 w-full h-16">
                                    <img src="bg-chat.jpg" alt="" className="w-full h-full object-cover object-center"/>
                                </div>
                                <img src={`${pic}`} alt="Default profile pic" className="w-16 h-16 rounded-full -mt-8"/>
                                <p className="text-sm md:text-base hover:cursor-pointer hover:underline text-blue-600 mt-2" onClick={() => console.log("Update pic")}>Update pic</p>   
                                <h4 className="text-sm md:text-base mt-3"><span className="font-semibold">Email:</span> {username}</h4>
                            </div>

                    </main>
                )
            }
        </>
    )
}

export default Profile;