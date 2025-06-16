import axiosInstance from "@/lib/axiosInterceptors";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";  
import axios from "axios";

interface initialStateType {
    accessToken: string,
    username: string,
    userId: number | null,
    contacts: {name:string,contactId:number,contact:{email:string}}[],
    contactInfoByEmail: Record<string,{receiverId:number,receiverName:string}>,
    isInitialized: boolean,
    loading: boolean,
    chats: {id?:number,senderId:number,receiverId:number,text:string,createdAt?:string}[],
    shouldConnectWs: boolean
}
const initialState:initialStateType = {
    accessToken: "",
    username: "",
    userId: null,
    contacts: [],
    contactInfoByEmail: {},
    isInitialized: false,
    loading: true,
    chats: [],
    shouldConnectWs: false
}

// for initializing state if jwt cookie is present and valid(page reloads etc)
// fetch contacts after reloads where?
export const initializeState = createAsyncThunk('fetch/initializeState', async(_,thunkAPI) => {
    try {
        const response = await axios({
            method: "POST",
            url: "http://localhost:8000/api/user/refresh",
            withCredentials: true,
        });
        console.log("refresh ",response.data);
        return response.data;
    } catch (error:any) {
        // console.log(error)
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const loginUser = createAsyncThunk("post/loginUser",async (arg: {email:string,password:string},thunkAPI) => {
    try {
        const response = await axios({
            method: "POST",
            url: "http://localhost:8000/api/user/login",
            data: {
                email: arg.email,
                password: arg.password
            },
            withCredentials: true
        })
        const {username,userId,accessToken} = response.data;
        return response.data;
    } catch (error:any) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const logoutUser = createAsyncThunk("delete/logout",async (_,thunkAPI) => {
    try {
        const response = await axios({
            url: "http://localhost:8000/api/user/logout",
            method: "post",
            withCredentials: true
        })
        return response.data;
    } catch (error:any) {
        console.log(error.response)
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const fetchContacts = createAsyncThunk("fetch/contacts",async (_,thunkAPI) => {
    try {
        const response = await axiosInstance({
            url: "http://localhost:8000/api/chat/contacts",
            method: "GET"
        })
        return response.data;
    } catch (error:any) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const fetchChats = createAsyncThunk("fetch/chats",async (_,thunkAPI) => {
    try {
        const response = await axiosInstance({
            url: "http://localhost:8000/api/chat/messages",
            method: "GET"
        })
        return response.data;
    } catch (error:any) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state,action) => {
            state.username = action.payload.username;
            state.userId = action.payload.userId;
            state.accessToken = action.payload.accessToken;
            // state.contacts = action.payload.userContacts;
            state.isInitialized = true;
        },
        reset: (state) => {
            state.username = "";
            state.userId = null;
            state.accessToken = "";
        },
        setLoader: (state) => {
            state.loading = false;
        },
        setChats: (state,action) => {
            state.chats.push(action.payload);
        },
        setContacts: (state,action) => {
            state.contacts = [...state.contacts,action.payload];
        },
        setContactsInfo: (state,action) => {
            state.contactInfoByEmail= action.payload;
        },
        setToken: (state,action) => {
            console.log("set token")
            state.accessToken = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(initializeState.fulfilled, (state,action) => {
            state.username = action.payload? action.payload.username : "";
            state.accessToken = action.payload? action.payload.accessToken : "";
            state.userId = action.payload? action.payload.userId : null;
            state.isInitialized = true;
            state.loading = false;
            state.shouldConnectWs = true;
        })
        .addCase(initializeState.pending, (state,action) => {
            state.loading = true;
        })
        .addCase(initializeState.rejected, (state,action) => {
            state.username = "";
            state.userId = null;
            state.accessToken = "";
            state.isInitialized = true;
            state.loading = false;
            state.shouldConnectWs = false;
        })
        .addCase(loginUser.fulfilled, (state,action) => {
            state.username = action.payload.username? action.payload.username : "";
            state.accessToken = action.payload.accessToken? action.payload.accessToken : "";
            state.userId = action.payload.userId? action.payload.userId : null;
            state.loading = false;
            state.shouldConnectWs = true;
        })
        .addCase(loginUser.pending, (state,action) => {
            state.loading = true;
        })
        .addCase(loginUser.rejected, (state,action) => {
            state.loading = false;
        })
        .addCase(logoutUser.rejected, (state,action) => {
            console.log('User logged out but server returned 404 or 500');
            state.username = "";
            state.accessToken = "";
            state.userId = null;
            state.contacts = [];
            state.chats = [];
            state.shouldConnectWs = false;
        })
        .addCase(logoutUser.fulfilled, (state,action) => {
            console.log('Logout request executed');
            state.username = "";
            state.accessToken = "";
            state.userId = null;
            state.contacts = [];
            state.chats = [];
            state.shouldConnectWs = false;
        })
        .addCase(fetchContacts.fulfilled, (state,action) => {
            console.log(action.payload)
            state.contacts = action.payload.userContacts? action.payload.userContacts : [];
        })
        .addCase(fetchChats.fulfilled, (state,action) => {
            console.log(action.payload)
            state.chats = action.payload;
        })
    }
})

export const { setUser,reset,setLoader,setChats,setContacts,setContactsInfo,setToken } = userSlice.actions;
export default userSlice.reducer;