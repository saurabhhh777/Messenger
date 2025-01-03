import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [ selectedFile, setSelectedFile ] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);


    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedFile(base64Image);
      await updateProfile({ profilePic: base64Image});
    }

  };

  return (
    <div className="h-screen justify-center text-center items-center justify-items-center box-border mt-10">
      <div className="box-border bg-slate-600 w-1/3 rounded h-[600px]">
        <div>
          <div className="flex flex-col items-center ">
            <h1 className="text-2xl font-semibold box-border pt-4">Profile</h1>
            <h2>Your Profile information</h2>
          </div>

          {/* Profile image section  */}

          <div className="flex flex-col items-center">
            <div className="relative mt-2">
              <img
                src={selectedFile || authUser.user.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto"
              />

              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105  rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-6 h-6 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-base-content pt-2">
              {isUpdatingProfile ? "Uploading..." : "Click the camera to upload"}
            </p>
          </div>

          <div className="flex flex-col justify-center items-center mt-4">
            <div className="">
              <div className="flex flex-row">
              <User className="w-6 h-6 " />
              <label htmlFor="full-name">Fullname</label>
              </div>
              <h1 className="rounded px-4 py-2.5 border w-96">{authUser.user.name}</h1>
            </div>
            <div className="mt-4">
              <div className="flex flex-row">
              <Mail className="w-6 h-6 text-base-content" />
              <label htmlFor="email">Email</label>
              </div>
              <h1 className="rounded border py-2.5 px-4 w-96">{authUser.user.email }</h1>              
            </div>
          </div>


        <hr className="border-t-2 border-slate-400 mt-4" />

        <div className="mt-4">
          <h2 className="text-xl font-semibold">Account Information</h2>
          <div className="flex justify-between pl-5 pr-5">
            <h1>Member Since</h1>
            <h1>{authUser.user.createdAt?.split("T")[0] || "0000-00-00"}</h1>
          </div>
          <div className="flex justify-between pl-5 pr-5">
            <h1>Account Status</h1>
            <h1 className="text-green-400">Active</h1>
          </div>

        </div>



        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
