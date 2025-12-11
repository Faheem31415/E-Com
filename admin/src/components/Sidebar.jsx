import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2 border-gray-200 flex flex-col py-4">
      {/* Add Items */}
      <NavLink
        to="/add"
        className={({ isActive }) =>
          `flex items-center gap-3 p-3 border-b border-gray-200 transition-all duration-200 
          ${isActive ? "bg-pink-100 border-l-4 border-[#c586A5]" : "hover:bg-gray-100"}`
        }
      >
        <img src={assets.add_icon} alt="add" className="w-6 h-6" />
        <p className="hidden md:block font-medium">Add Items</p>
      </NavLink>

      {/* List Items */}
      <NavLink
        to="/list"
        className={({ isActive }) =>
          `flex items-center gap-3 p-3 border-b border-gray-200 transition-all duration-200 
          ${isActive ? "bg-pink-100 border-l-4 border-[#c586A5]" : "hover:bg-gray-100"}`
        }
      >
        <img src={assets.order_icon} alt="list" className="w-6 h-6" />
        <p className="hidden md:block font-medium">List Items</p>
      </NavLink>

      {/* Orders */}
      <NavLink
        to="/orders"
        className={({ isActive }) =>
          `flex items-center gap-3 p-3 border-b border-gray-200 transition-all duration-200 
          ${isActive ? "bg-pink-100 border-l-4 border-[#c586A5]" : "hover:bg-gray-100"}`
        }
      >
        <img src={assets.order_icon} alt="orders" className="w-6 h-6" />
        <p className="hidden md:block font-medium">Orders</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
 