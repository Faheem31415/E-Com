import React, { useState } from "react";
import axios from 'axios'
import { backendurl } from "../App";
import { toast } from "react-toastify";

// ADMIN_EMAIL="admin@admin.com"
// ADMIN_PASSWORD="admin@123"


const Login = ({setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const response=await axios.post(backendurl+'/api/user/admin',{email,password});
      if(response.data.success){
        setToken(response.data.token)
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
        console.log(error);
        console.log(error.message)
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-slate-800 mb-6">
          Admin Panel
        </h1>

        <form onSubmit={onSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="your@email.com"
              required
              autoComplete="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-2 rounded-lg font-semibold
               hover:bg-slate-800 transition-all duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
