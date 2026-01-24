"use client";
import axiosInstance from "@/lib/axiosInterceptors";
import { setContacts } from "@/lib/features/user/userSlice";
import { AppDispatch } from "@/lib/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Mail,User } from "lucide-react"
 
interface ContactCardProps {
  setAddContact: React.Dispatch<React.SetStateAction<boolean>>;
  addContact: boolean;
}

const NewContact: React.FC<ContactCardProps> = ({
  addContact,
  setAddContact,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const closeModal = () => {
    setAddContact(false);
    setEmail("");
    setName("");
  };
  const saveUserContact = async () => {
    if (!email || !name) return;
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/api/chat/saveContact",
        data: {
          email,
          name,
        },
      });
      console.log("Contact saved", response.data);
      dispatch(setContacts(response.data));
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {addContact && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-xl shadow-xl w-[90%] max-w-[380px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-base text-dark md:text-lg font-bold mb-4">
              Save Contact
            </h2>
            <div className="flex items-center gap-4 w-full px-4 border-2 border-gray-200 rounded-lg md:rounded-lg focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition mb-4 bg-gray-50">
              <Mail size={22} strokeWidth={1.6} className="h-full"/>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full py-2.5 outline-none bg-transparent text-xs md:text-sm lg:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 w-full px-4 border-2 border-gray-200 rounded-lg md:rounded-lg focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition mb-4 bg-gray-50">
              <User size={22} strokeWidth={1.6} className="h-full"/>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full py-2.5 outline-none bg-transparent text-xs md:text-sm lg:text-base"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="text-sm md:text-[14px] px-4 py-1 rounded-lg bg-gray-200 text-gray-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={saveUserContact}
                className="text-sm md:text-[14px] px-4 py-2 rounded-lg bg-dark text-light shadow-sm  cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewContact;
