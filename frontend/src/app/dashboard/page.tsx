"use client";
import { MessageSquare,Contact,User,LogOut,Origami,UserPlus } from "lucide-react";
import Link from "next/link";
import { ContactCard,ChatSection,NewContact } from "@/components"; 
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
        <main className="flex h-screen w-screen box-border overflow-x-hidden">
            <div className="fixed left-0 top-0 h-full w-20 py-4 flex flex-col justify-between items-center bg-black text-gray-500 text-xs font-medium text-center">
                <Link href="/" className="text-gray-200"><Origami className="w-full"/></Link>
                <div className="flex flex-col gap-y-8 items-center">
                    {/* change them to links later on */}
                    <div className="cursor-pointer" onClick={() => setActiveTab("messages")}><MessageSquare className="mb-1 w-full"/> Messages</div>
                    <div className="cursor-pointer" onClick={() => setActiveTab("contacts")}><Contact className="mb-1 w-full"/> Contacts</div>
                    <div className="cursor-pointer"><User className="mb-1 w-full"/> Profile</div>
                    <div className="cursor-pointer" onClick={() => setIsOpen(true)}><UserPlus className="mb-1 w-full"/> Add Friend</div>
                </div>
                <div className="cursor-pointer" onClick={() => dispatch(logoutUser())}><LogOut className="w-full mb-1"/> Logout</div>
            </div>
            <ContactCard items={activeTab==="messages"?contacts:contacts} activeChat={activeChat} setActiveChat={setActiveChat}/>
            <ChatSection activeChat={activeChat}/>
            <NewContact isOpen={open} setIsOpen={setIsOpen}/>
        </main>
    )
}

export default Dashboard;