import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";
const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const [visible, setVisible] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);
  return showSearch && visible ? (
    <div className="absolute top-[70px] left-0 w-full z-50 flex justify-center px-4 md:px-10">
      <div className="bg-white w-full max-w-xl flex items-center gap-3 p-3 rounded-full shadow-md border border-gray-200">
        {/* 🔍 Search Icon */}
        <img
          src={assets.search_icon}
          alt="search"
          className="w-5 h-5 opacity-60"
        />

        {/* ✏️ Input */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search products..."
          className="flex-1 outline-none bg-transparent text-gray-700 text-sm md:text-base"
          autoFocus
        />

        {/* ❌ Close Button */}
        <img
          onClick={() => setShowSearch(false)}
          src={assets.cross_icon}
          alt="close"
          className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 transition"
        />
      </div>
    </div>
  ) : null;
};

export default SearchBar;
