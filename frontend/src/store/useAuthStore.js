import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js";
import { toast } from "react-toastify";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSignedUp: false,
    isLogined: false,
    isUpdatingProfile: false,
    

    isCheckingAuth: true,


    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/v1/user/check");
            set({authUser: res.data});
        } catch (error) {
            console.log(error); 
            set({authUser: null});
        }
        finally {
            set({isCheckingAuth: false});
        }
    },


    signup: async (data) => {
        let res;
        set({isSignedUp: true});
        try {
            res = await axiosInstance.post("/v1/user/signup", data);
            set({authUser: res.data});
            console.log(res);
            toast.success("Signup successful");

        } catch (error) {

            if(error.response) {
                toast.error(error.response.data.message);
            }
            else{
                toast.error("Something went wrong");
            }

            // toast.error(error.res.data.message);   
            console.log(error);
        }
        finally {
            set({isSignedUp: false});
        }
    },

    signin: async (data) => {
        let res;
        set({isLogined: true});
        try {
            res = await axiosInstance.post("/v1/user/signin", data);
            console.log(res);
            toast.success("Signup successful");
            set({authUser: res.data});

        } catch (error) {

            if(error.response) {
                toast.error(error.response.data.message);
            }
            else{
                toast.error("Something went wrong");
            }

            // toast.error(error.res.data.message);   
            console.log(error);
        }
        finally {
            set({isLogined: false});
        }
    },
    
    logout: async () => {
        let res;
        try {
            res = await axiosInstance.post("/v1/user/logout");
            set({authUser: null});
            toast.success("Logout successful");
        } catch (error) {
            console.log(error);
            console.log(res);
            toast.error(error.response.data.message);



        }
    },

    updateProfile: async(data)=>{
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/v1/user/profile", data);
            set({authUser: res.data});
            toast.success("Profile updated successfully");
            


        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            
        }
        finally{
            set({isUpdatingProfile: false});
        }

    }



}));
