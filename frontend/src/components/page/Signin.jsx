import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore.js";
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { signin } = useAuthStore();

  const validateForm = () => {
    // Add validation logic here
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      signin(formData);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-[#3c3939] w-96 p-8 rounded shadow-lg">
        <h2 className="text-2xl text-center mb-6 text-white">Signin Page</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        
          {/* Email */}
          <div className="relative flex items-center">
            <Mail className="absolute left-3 h-5 w-5 text-gray-400" />
            <input
              className="pl-10 pr-3 py-2 w-full rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              value={formData.email}
              name="email"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="johnwick@example.com"
            />
          </div>

          {/* Password */}
          <div className="relative flex items-center">
            <Lock className="absolute left-3 h-5 w-5 text-gray-400" />
            <input
              className="pl-10 pr-10 py-2 w-full rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              name="password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="@JohnWick123"
            />
            <button
              type="button"
              className="absolute right-3 h-5 w-5 text-gray-400 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-black text-white py-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
          <p className="text-center text-white">
            Create an Account{" "}
            <Link
              className="text-blue-400 hover:text-blue-300"
              to="/signup"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
