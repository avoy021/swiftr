import axios from "axios"

export const saveMessageToDB = (item: {text:string,senderId:number,receiverId:number},accessToken:string | undefined) => {
    return axios({
            url: "http://localhost:8000/api/chat/saveMessage",
            method: "POST",
            data: item,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
}