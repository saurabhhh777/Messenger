import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSignedUp: false,
    isLogined: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,


    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/v1/user/check");
            set({authUser: res.data, isCheckingAuth: false});
        } catch (error) {
            console.log(error); 
            set({isCheckingAuth: false});
        }
    },


    signup: async (formData) => {
        try {
            const res = await axiosInstance.post("/v1/user/signup", formData);
            set({isSignedUp: true});
        } catch (error) {
            console.log(error);
        }
    },
}));
