import React, { useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { backendUrl, navigate } = useContext(ShopContext);

  const submit = async (e) => {
    e.preventDefault();

    const res = await axios.post(backendUrl + "/api/user/forgot-password", {
      email,
    });

    if (!res.data.success) return toast.error(res.data.message);
    const token = res.data.token;
    toast.success("Check your email for reset");
    navigate(`/verifyPassword/${email}/${token}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-gray-100 via-gray-200 to-gray-300 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-60 h-60 bg-blue-400 opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-400 opacity-20 blur-3xl rounded-full"></div>
      </div>

      <form
        onSubmit={submit}
        className="backdrop-blur-xl bg-white/70 shadow-2xl border border-white/20 rounded-2xl p-10 max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Forgot Password
        </h2>

        <label className="text-sm font-medium text-gray-700">
          Enter your email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm mb-4"
        />

        <button className="w-full py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition">
          Click to proceed
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
