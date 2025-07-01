"use client";
import axiosInstance from "@/lib/axiosInterceptors";
import { setContacts } from "@/lib/features/user/userSlice";
import { AppDispatch } from "@/lib/store";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface ContactCardProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
}

const NewContact:React.FC<ContactCardProps> = ({isOpen,setIsOpen}) => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const closeModal = () => {
      setIsOpen(false);
      setEmail("");
      setName("");
    }
    const saveUserContact = async () => {
      if(!email || !name) return;
      try {
        const response = await axiosInstance({
          method: "POST",
          url: "/api/chat/saveContact",
          data: {
            email,
            name
          }
        })
        console.log("Contact saved",response.data);
        dispatch(setContacts(response.data));
        closeModal();
      } catch (error) {
        console.log(error);
      }
    } 

    return (
      <>
        {isOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50" onClick={closeModal}>
              <div
                className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-[450px]"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-lg md:text-xl font-semibold mb-4">Save Contact</h2>
                
                <input
                  type="email"
                  placeholder="Email Id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs md:text-base border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs md:text-base border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                
                <div className="flex justify-end gap-2">
                  <button
                    onClick={saveUserContact}
                    className="text-sm md:text-base px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition duration-150 cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    onClick={closeModal}
                    className="text-sm md:text-base px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
      </>  
    )
}

export default NewContact;