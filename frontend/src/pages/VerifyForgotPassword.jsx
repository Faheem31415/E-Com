import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";

const VerifyForgotPwd = () => {
  const { navigate, backendUrl } = useContext(ShopContext);
  const { token, email } = useParams();
  const [key, setKey] = useState("");

  const onClickhandler = async () => {
    if (!key.trim()) {
      return toast.warning("Please enter the verification key");
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/user/verify-password/${token}`,
        { email, key }
      );

      if (!response.data.success) {
        return toast.error(` ${response.data.message}`);
      }

      toast.success(" Key Verified! Redirecting...");
      navigate(`/reset-password/${token}`);

    } catch (error) {
      toast.error(" Verification failed. Key invalid or expired.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Enter the verification key sent to your email
        </h2>

        <div className="mb-6">
          <input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            type="text"
            placeholder="Enter verification key"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <button
          onClick={onClickhandler}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white 
          font-semibold rounded-xl transition active:scale-95"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyForgotPwd;
