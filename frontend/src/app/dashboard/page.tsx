"use client";
import { MessageSquare,Contact,User,LogOut,Origami,UserPlus } from "lucide-react";
import Link from "next/link";
import { ContactCard,ChatSection,NewContact,ChatSidebar } from "@/Components"; 
import { useEffect, useRef, useState } from "react";
import { logoutUser, setContactsInfo } from "@/lib/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";

const Dashboard = () => {
    const {contacts,contactInfoByEmail} = useSelector((state:RootState) => state.user);
    const [activeChat,setActiveChat] = useState(""); //email
    const [open,setIsOpen] = useState(false);
    const [activeTab,setActiveTab] = useState("messages");
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
        <main className="flex min-h-screen bg-[#f9f7f7] font-inter">
            {/* bg hex code- bg-gray-100,#e8eaed,#f7f9fc,#f9f9f9 */}
            <ChatSidebar/>
            <ContactCard activeChat={activeChat} setActiveChat={setActiveChat}/>
            <ChatSection activeChat={activeChat}/>
            <NewContact isOpen={open} setIsOpen={setIsOpen}/>
        </main>
    )
}

export default Dashboard;