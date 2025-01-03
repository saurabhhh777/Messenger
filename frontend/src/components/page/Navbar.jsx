import React from "react";
import { useAuthStore } from "../../store/useAuthStore.js";
import { MessageSquare, Settings, User,LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <div>
      <nav className="flex justify-between items-center bg-gray-900 p-4">
        <div className="text-white font-bold">
          <MessageSquare className="h-6 w-6 inline-block" />
          <Link to="/" className="text-white">
            <span className="pl-1">Messanger</span>
          </Link>
        </div>
        <div>
          {authUser ? (
            <>
              <Link to="/settings" className="text-white btn-sm">
                <Settings className="h-6 w-6 inline-block" />
                <span className="pl-1">Setting</span>
              </Link>
              
              

              <Link to="/profile" className="text-white btn-sm">
                <User className="h-6 w-6 inline-block" /><span>Profile</span>
              </Link>

              <button onClick={logout} className="text-white btn-sm">
                <LogOut className="h-6 w-6 inline-block" />
                Logout
              </button>
            </>
          ) : (
            // <a href="/signin" className="text-white">Signin</a>
            <div>
              <Link to="/settings" className="text-white btn btn-sm">
                <Settings className="h-6 w-6 inline-block" />
                <span className="pl-1">Setting</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
