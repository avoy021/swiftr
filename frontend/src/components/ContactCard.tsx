import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

interface ContactCardProps {
    setActiveChat: React.Dispatch<React.SetStateAction<string>>;
    activeChat: string;
}
type SetActiveChatType = (value:string) => void

const ContactCard: React.FC<ContactCardProps> = ({activeChat,setActiveChat}) => {
    const {contacts,contactInfoByEmail} = useSelector((state:RootState) => state.user);
    return (
        <main className="w-full py-8 px-4 md:px-1 md:ml-20 md:min-w-[250px] md:max-w-[360px] flex flex-col items-center">
            {contacts.length>0 ? contacts.map((item,index) => {
                return (
                    <div className={`w-full px-4 flex justify-center items-center gap-x-3 py-3 cursor-pointer hover:bg-gray-200 rounded-lg ${activeChat===item.contact.email?"bg-gray-200":"bg-gray-100"}`} key={item.contactId} id={item.contact.email} tabIndex={0} onClick={() => setActiveChat(item.contact.email)}>
                        <div className="">
                            <img src={`contact-${index+1}.jpg`} alt="Contact" className="w-12 h-12 rounded-md object-cover shadow-sm"/>
                        </div>
                        <div className="flex flex-col gap-y-1.5">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs font-medium text-gray-500">Ok. Lets discuss this on Wednesday, also...</p>
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