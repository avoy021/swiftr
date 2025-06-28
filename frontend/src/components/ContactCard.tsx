"use client";

import { RootState } from "@/lib/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";

interface ContactCardProps {
    setActiveChat: React.Dispatch<React.SetStateAction<string>>;
    activeChat: string;
}
type SetActiveChatType = (value:string) => void

const ContactCard: React.FC<ContactCardProps> = ({activeChat,setActiveChat}) => {
    const {contacts,contactInfoByEmail} = useSelector((state:RootState) => state.user);
    const [search,setSearch] = useState("");

    return (
        <main className="w-full py-8 px-4 md:px-1 md:ml-[150px] md:min-w-[250px] md:max-w-[360px] flex flex-col items-center">
            {/* search bar */}
            <div className="relative w-full mb-4 px-4">
                <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="w-full rounded-xl bg-[#e3e9f7] py-3 pl-11 pr-4 text-sm shadow-xs placeholder-gray-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                />
                <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-600 mr-4"/>
            </div>
            {/* contact list */}
            {contacts.length>0 ? contacts.map((item,index) => {
                return (
                    <div className={`w-full px-4 flex justify-center items-center gap-x-4 py-3 cursor-pointer hover:bg-gray-200 rounded-lg ${activeChat===item.contact.email?"bg-[#ecf1fb]":""}`} key={item.contactId} id={item.contact.email} tabIndex={0} onClick={() => setActiveChat(item.contact.email)}>
                        <div className="">
                            <img src={`contact-${index+1}.jpg`} alt="Contact" className="w-12 h-12 rounded-md object-cover shadow-sm"/>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <p className="text-sm font-semibold">{item.name}</p>
                            <p className="text-xs font-medium text-gray-500">You: Ok. Lets discuss this on Wednesday...</p>
                        </div>
                    </div>
                )
            })  : 
                "No contacts saved"
            }
        </main>
    )
}

export default ContactCard;