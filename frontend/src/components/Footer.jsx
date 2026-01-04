import React from "react";
import { assets } from "../assets/frontend_assets/assets";

function Footer() {
  return (
    <footer className="bg-white text-gray-700 pt-10 pb-6 px-5 sm:px-10 lg:px-20 shadow-sm">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">

        {/* Logo + Description */}
        <div className="text-center sm:text-left">
          <img
            src={assets.c_logo}
            alt="Brand Logo"
            className="w-28 sm:w-36 mx-auto sm:mx-0 mb-4"
          />
          <p className="text-sm sm:text-base leading-6 text-gray-600">
            We bring you the latest trends in fashion with premium quality 
            clothing at affordable prices. From everyday essentials to 
            exclusive seasonal collections, we make shopping easy, fast, 
            and stylish — all delivered right to your doorstep.
          </p>
        </div>

        {/* Company Links */}
        <div className="text-center sm:text-left">
          <p className="text-gray-900 font-semibold mb-4 text-base sm:text-lg">
            COMPANY
          </p>
          <ul className="space-y-2 text-sm sm:text-base">
            <li className="hover:text-black cursor-pointer transition">Home</li>
            <li className="hover:text-black cursor-pointer transition">About Us</li>
            <li className="hover:text-black cursor-pointer transition">Delivery</li>
            <li className="hover:text-black cursor-pointer transition">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center sm:text-left">
          <p className="text-gray-900 font-semibold mb-4 text-base sm:text-lg">
            GET IN TOUCH
          </p>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>📞 +1-2121-156-7890</li>
            <li>✉️ contact@clothify.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 pt-4 text-center text-xs sm:text-sm text-gray-500">
        <p>© 2025 forever.com — All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
