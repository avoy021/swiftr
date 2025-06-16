interface ContactCardProps {
    setActiveChat: React.Dispatch<React.SetStateAction<string>>;
    activeChat: string;
    items: {name:string,contactId:number,contact:{email:string}}[]
}
type SetActiveChatType = (value:string) => void

const ContactCard: React.FC<ContactCardProps> = ({items,activeChat,setActiveChat}) => {
    return (
        <main className="w-80 flex flex-col gap-y-2 items-center py-8 bg-gray-100 ml-20">
             {items.length>0 ? items.map((item,index) => {
                return (
                    <div className={`flex justify-center gap-x-3 cursor-pointer w-full py-3 hover:bg-gray-200 rounded-lg ${activeChat===item.contact.email?"bg-gray-200":"bg-gray-100"}`} key={item.contactId} id={item.contact.email} tabIndex={0} onClick={() => setActiveChat(item.contact.email)}>
                        <div className="">
                            <img src={`contact-${index+1}.jpg`} alt="Contact" className="w-12 h-12 rounded-md object-cover"/>
                        </div>
                        <div className="flex flex-col gap-y-1.5">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs font-medium text-gray-500">Ok. Lets discuss this on...</p>
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