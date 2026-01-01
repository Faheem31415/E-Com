import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyPayment = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const handleVerifyPayment = async () => {
    try {
      if (!token) return null;

      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      navigate("/cart");
    }
  };
  useEffect(() => {
    if (token !== undefined && token !== null) {
      handleVerifyPayment();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-lg font-semibold text-gray-700">
          Verifying payment...
        </p>
        <p className="text-sm text-gray-500">
          Please wait, do not refresh the page
        </p>
      </div>
    </div>
  );
};

export default VerifyPayment;
