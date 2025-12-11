import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const { backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const verifyOtp = async () => {
    if (!otp) return toast.error("Enter the OTP");

    try {
      setLoading(true);

      const res = await axios.post(backendUrl + "/api/user/verify-otp", {
        email,
        otp,
      });

      setLoading(false);

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success("Email verified! You can now login.");
      navigate("/login");

    } catch (error) {
      setLoading(false);
      toast.error("Verification failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-4">Verify OTP</h2>

        <p className="text-center text-gray-600 mb-4">
          OTP sent to <span className="font-semibold">{email}</span>
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border p-2 rounded-lg"
        />

        <button
          onClick={verifyOtp}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
};

export default OtpVerify;
