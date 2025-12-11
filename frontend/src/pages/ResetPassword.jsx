import React, { useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { backendUrl } = useContext(ShopContext);

  const submit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      backendUrl + `/api/user/reset-password/${token}`,
      { password }
    );

    if (!res.data.success) {
      toast.error(res.data.message);
      return;
    }

    toast.success("Password Updated Successfully");
    navigate("/login");
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
          Reset Password
        </h2>

        <label className="text-sm font-medium text-gray-700">
          New Password
        </label>

        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-sm mb-4"
        />

        <button className="w-full py-3 bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
