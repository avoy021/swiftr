"use client";
import { MessageSquare,Contact,User,LogOut,Origami,UserPlus } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { logoutUser, setContactsInfo } from "@/lib/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import NewContact from "@/Components/NewContact"
import ChatSidebar from "@/Components/ChatSidebar";
import ContactCard from "@/Components/ContactCard";
import ChatSection from "@/Components/ChatSection";
import Profile from "@/Components/Profile";

const Dashboard = () => {
    const {contacts,contactInfoByEmail} = useSelector((state:RootState) => state.user);
    const [activeChat,setActiveChat] = useState(""); 
    const [addContact,setAddContact] = useState(false);
    const [openProfile,setOpenProfile] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if(contacts.length===0) return;
        const obj:Record<string,{receiverId:number,receiverName:string}> = {};
        contacts.forEach(details => {
            obj[details.contact.email] = {
                receiverName: details.name,
                receiverId: details.contactId
            }
        })
        dispatch(setContactsInfo(obj));
    },[contacts])

    return (
        <main className="flex min-h-screen font-inter bg-[#f9fafc]">
            <ChatSidebar activeChat={activeChat} setAddContact={setAddContact} setOpenProfile={setOpenProfile}/>
            <ContactCard activeChat={activeChat} setActiveChat={setActiveChat}/>
            <ChatSection activeChat={activeChat} setActiveChat={setActiveChat}/>
            <NewContact addContact={addContact} setAddContact={setAddContact}/>
            <Profile openProfile={openProfile} setOpenProfile={setOpenProfile}/>
        </main>
    )
}

export default Dashboard;