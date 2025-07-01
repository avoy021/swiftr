"use client";
import axiosInstance from "@/lib/axiosInterceptors";
import { logoutUser, setChats, setToken } from "@/lib/features/user/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { Send } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./Toast";
import { useToast } from "@/hooks/useToast";
import axios from "axios";

interface ChatSectionProps {
    activeChat: string
}

const ChatSection: React.FC<ChatSectionProps> = ({activeChat}) => {
    const [text,setText] = useState("");
    const [details,setDetails] = useState<{receiverName:string,receiverId:number,receiverEmail:string}>({receiverName:"", receiverId:0, receiverEmail:""});
    const inputRef = useRef<HTMLInputElement | null>(null);
    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const {username,contacts,userId,accessToken,isInitialized,chats,contactInfoByEmail,shouldConnectWs} = useSelector((state:RootState)=> state.user)
    const socketRef = useRef<WebSocket | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const {toast,showToast,clearToast} = useToast();

    useEffect(() => {
        if(shouldConnectWs && (!isInitialized || !accessToken || socketRef.current)) return;
        socketRef.current = new WebSocket("ws://localhost:8080");

        socketRef.current.onopen = () => {
            console.log('Connection opened');
            socketRef.current?.send(JSON.stringify({message:"Connection opened"}));
        }

        socketRef.current.onerror = (err) => {
            // console.error(err);
        }

        socketRef.current.onclose = (event) => {
            console.log("Socket closed");
            // on socket.close i can use axiosInstance to get a new access token
            if(!socketRef.current) return;
            socketRef.current.onopen = null;
            socketRef.current.onmessage = null;
            socketRef.current.onerror = null;
            socketRef.current.onclose = null;
            socketRef.current = null;
             // Reconnect logic (optional)
            if (event.code !== 1000 && isInitialized && accessToken) {
                // Reconnect after delay for unexpected closures
                setTimeout(() => {
                    // Trigger re-initialization by updating a state
                }, 3000);
            }
        }

        return () => {
            if(socketRef.current?.readyState === WebSocket.OPEN) {
                console.log('cleanup');
                socketRef.current.onopen = null;
                socketRef.current.onmessage = null;
                socketRef.current.onerror = null;
                socketRef.current.onclose = null;
                socketRef.current.close();
                socketRef.current = null;
            }
        }
    },[isInitialized,shouldConnectWs]) //page reload,1st visit(isInitialize),login(accessToken) change=> new socket

    useEffect(() => {
        if(!socketRef.current) return;
        socketRef.current.onmessage = async(event) => {
            const payload = JSON.parse(event.data);
            const {type} = payload;
            if(payload.type){
                console.log(payload);
            }
            if(type === "text-message") {
                if(payload.senderEmail !== username && payload.senderEmail !== activeChat) {
                    showToast(`${payload.senderEmail} sent you a message.`)
                }
                dispatch(setChats(payload));            
            }
            else if(type === "refresh-token") {
                // call http endpoint
                try {
                    const response = await axios({
                        method:"POST",
                        url: "http://localhost:8000/api/user/refresh",
                        withCredentials: true
                    })
                    const {accessToken} = response.data;
                    dispatch(setToken(accessToken));
                    socketRef.current?.send(JSON.stringify({
                        type: "token-refreshed",
                        token: accessToken
                    }))
                } catch (err) {
                    console.log(err);
                    // if token is not refreshed(not possible with current scenario as refreshToken is called 5 mins before expiry), only reason could be refresh token has expired
                    dispatch(logoutUser()); 
                }
            }
        }

        return () => {
            if(socketRef.current) {
                socketRef.current.onmessage = null;
            }
        }
    },[activeChat])

    useEffect(() => {
        if(activeChat && chats.length>0){
            messageEndRef.current?.scrollIntoView({'behavior': 'instant'});
        }
    },[activeChat,chats.length])
    
    const sendMessage = () => {
        if(!socketRef.current) {
            console.log("Socket is closed");
            return;
        }
        if(socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                type:"text-message",
                text,
                senderId: userId,
                senderEmail: username,
                receiverEmail: activeChat,
                ...contactInfoByEmail[activeChat]
            }))
        }
        setText("");
        inputRef.current?.focus();
    }

    return (
        <main className={`${activeChat?"flex":"hidden"} max-h-screen overflow-hidden flex-1 flex-col px-4 md:px-12 py-6`}>
            <div className="w-full md:w-3/4 mx-auto mb-4">
                <p className="text-2xl font-medium">{contactInfoByEmail[activeChat]?.receiverName}</p>
            </div>
            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col w-full md:w-3/4 mx-auto pb-4">
                        {
                            activeChat && chats.length>0 ? chats.map((chat,index) => {
                            if(chat.senderId===userId && chat.receiverId===contactInfoByEmail[activeChat].receiverId) {
                                return <p
                                    className="self-end max-w-[75%] px-4 py-2 my-1 text-white bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-md text-sm break-words"
                                    key={index}
                                    >
                                    {chat.text}
                                    </p>
                            }
                            else if(chat.receiverId===userId && chat.senderId===contactInfoByEmail[activeChat].receiverId) {
                                return <p
                                    className="self-start max-w-[75%] px-4 py-2 my-1 text-gray-800 bg-gray-200 rounded-2xl shadow-sm text-sm break-words"
                                    key={index}
                                    >
                                    {chat.text}
                                    </p>

                            }
                            }) : 
                            <p className="text-center text-gray-400 mt-10 text-sm">No messages yet</p> 
                        }
                </div>
                <div ref={messageEndRef}/>
            </div>
            <div className="w-full md:w-3/4 mx-auto mb-2 flex items-center rounded-xl bg-gray-200 pl-3">
                <input type="text" name="messageBar" id="messageBar" placeholder="Your message" className="flex-1 py-3 md:py-4 px-4 outline-none text-sm font-medium bg-gray-200" ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => {
                    if(e.key === "Enter") {
                        sendMessage();
                    }
                }}/>
                <Send className="cursor-pointer mr-3 text-gray-600 hover:text-blue-500 transition" onClick={sendMessage}/>
            </div>
            {toast && <Toast message={toast} onClose={clearToast}/>}
        </main>
    )
}

export default ChatSection;