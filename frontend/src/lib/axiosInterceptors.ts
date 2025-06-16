import axios from "axios";
import axiosInstance from "./axiosInstance";
import store from "@/lib/store";
import { logoutUser, setUser } from "@/lib/features/user/userSlice";

axiosInstance.interceptors.request.use((config) => {
    if(!config.headers.Authorization || !config.headers.Authorization.toString().startsWith("Bearer ")) {
        config.headers.Authorization = `Bearer ${store.getState().user.accessToken}`;
    }
    return config;
},(error) => {
    return Promise.reject(error);
})

axiosInstance.interceptors.response.use((config) => {
    return config;
},async(error) => {
    if(error.response && error.response.status === 401 && error.response.data.message === "Token is invalid") {
        try {
            const response = await axios({
                method:"POST",
                url: "http://localhost:8000/api/user/refresh",
                withCredentials: true
            })
            const {accessToken,username,userId} = response.data;
            const originalRequest = error.config;
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            const prevState = store.getState().user;
            store.dispatch(setUser({...prevState,accessToken,username,userId}));
            return axiosInstance(originalRequest)
        } catch (err) {
            console.log(err);
            store.dispatch(logoutUser());
            return Promise.reject(err);
        }
    }
    return Promise.reject(error);
})

export default axiosInstance;