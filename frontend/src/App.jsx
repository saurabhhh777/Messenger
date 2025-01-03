import React, { useEffect } from 'react'
import Navbar from './components/page/Navbar.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/page/Home.jsx';
import Signup from './components/page/Signup.jsx';
import Signin from './components/page/Signin.jsx';  
import ProfilePage from './components/page/ProfilePage.jsx';
import SettingPage from './components/page/SettingPage.jsx';
import { useAuthStore } from './store/useAuthStore.js';
import {Loader} from "lucide-react";


const App = () => {

  const {authUser,checkAuth,isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth(); 

  },[checkAuth]);

  console.log({authUser});


  if(isCheckingAuth && !authUser){
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    );


  }

  return (
    <div>

      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/signin"/>} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/"/>} />
        <Route path="/signin" element={!authUser ? <Signin /> : <Navigate to="/"/>} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/signin"/>} />
        <Route path="/setting" element={<SettingPage />} />
        
      </Routes>


    </div>
  )
}

export default App