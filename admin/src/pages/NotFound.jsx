import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 text-center px-6">
      {/* Big 404 Text */}
      <h1 className="text-[120px] font-extrabold text-gray-800 mb-2 leading-none">
        404
      </h1>

      {/* Error Message */}
      <h2 className="text-3xl font-semibold text-gray-700 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-500 max-w-md mb-8">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>

      {/* Button to go back home */}
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full shadow-md transition-all duration-200"
      >
        ⬅️ Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
