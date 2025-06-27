"use client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect } from "react";
import { fetchContacts,fetchChats } from "@/lib/features/user/userSlice";
import Spinner from "@/Components/Spinner";

const DashboardLayout = ({children}:Readonly<{children:React.ReactNode}>) => {
    const {isInitialized,accessToken,username,contacts} = useSelector((state:RootState) => state.user);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if(isInitialized && (!accessToken || !username)) {
            router.push("/login");
        }
    },[accessToken,username,isInitialized])

    useEffect(() => {
        if (isInitialized && accessToken && username && contacts.length === 0) {
            console.log("fetch contacts");
            dispatch(fetchContacts());
            dispatch(fetchChats());
        }
    }, [isInitialized, accessToken, username, contacts.length]);
      
    return (
        <>
            {(isInitialized && (!accessToken || !username)) ? <Spinner/> : children}
        </>
    )
}

export default DashboardLayout;