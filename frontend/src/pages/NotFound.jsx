import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const NotFound = () => {
  const { navigate } = useContext(ShopContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
        alt="404 Not Found"
        className="w-40 h-40 mb-6 opacity-80"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        404 – Page Not Found
      </h1>
      <p className="text-gray-600 text-sm md:text-base mb-6">
        Oops! The page you’re looking for doesn’t exist or might have been
        moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full transition-all duration-200"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
