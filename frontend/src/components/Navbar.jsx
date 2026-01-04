// src/components/Navbar.jsx
import React, { useState, useContext, useEffect } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
    cartItems,
  } = useContext(ShopContext);

  useEffect(() => {
    // Use navigation timing to detect reload vs close
    const isReload = () => {
      try {
        const navEntries = performance.getEntriesByType("navigation");
        if (navEntries && navEntries.length > 0) {
          return navEntries[0].type === "reload";
        }
        return (
          typeof performance.navigation !== "undefined" &&
          performance.navigation.type === 1
        );
      } catch (err) {
        return false;
      }
    };

    const handleBeforeUnload = (e) => {
      // if it's a reload, don't set the flag; else set
      if (!isReload()) {
        sessionStorage.setItem("logoutOnClose", "true");
      } else {
        sessionStorage.removeItem("logoutOnClose");
      }
      // no need to call preventDefault
    };

    const handleUnload = () => {
      if (sessionStorage.getItem("logoutOnClose") === "true") {
        // remove token only on true close (not refresh)
        try {
          localStorage.removeItem("token");
        } catch (err) {
          // ignore on private modes
        }
      }
      // clean up flag
      sessionStorage.removeItem("logoutOnClose");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
      sessionStorage.removeItem("logoutOnClose");
    };
  }, []);

  // Remove close-flag on mount so refresh does not log out
  useEffect(() => {
    sessionStorage.removeItem("logoutOnClose");
  }, []);

  // Manual logout
  const logout = () => {
    try {
      localStorage.removeItem("token");
    } catch (err) {
      // ignore
    }
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  // Safe cart count (fallback if getCartCount not defined or context not ready)
  const safeCartCount = () => {
    if (typeof getCartCount === "function") return getCartCount();
    // fallback compute from cartItems shape { id: { size: qty } }
    let total = 0;
    if (!cartItems) return 0;
    Object.values(cartItems).forEach((sizes) => {
      if (sizes && typeof sizes === "object") {
        total += Object.values(sizes).reduce((a, b) => a + Number(b || 0), 0);
      }
    });
    return total;
  };

  return (
    <nav className="flex items-center justify-between py-5 px-4 md:px-10 font-medium relative bg-white shadow-sm z-50">
      <Link to="/">
        <img src={assets.c_logo} className="w-26 sm:w-36 mx-auto sm:mx-0 mb-4 " alt="logo" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-7 text-[16px] md:text-[17px] text-gray-700 font-medium">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr
            className={`w-2/4 h-[1.5px] bg-gray-700 border-none ${
              window.location.pathname === "/" ? "block" : "hidden"
            }`}
          />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection</p>
          <hr
            className={`w-2/4 h-[1.5px] bg-gray-700 border-none ${
              window.location.pathname === "/collection" ? "block" : "hidden"
            }`}
          />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr
            className={`w-2/4 h-[1.5px] bg-gray-700 border-none ${
              window.location.pathname === "/about" ? "block" : "hidden"
            }`}
          />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr
            className={`w-2/4 h-[1.5px] bg-gray-700 border-none ${
              window.location.pathname === "/contact" ? "block" : "hidden"
            }`}
          />
        </NavLink>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <Link to="/collection">
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer hover:scale-110 transition-transform"
            alt="search"
          />
        </Link>

        {/* Profile */}
        <div className="relative">
          <img
            src={assets.profile_icon}
            alt="profile"
            onClick={() => {
              if (!token) {
                navigate("/login");
              } else {
                setShowProfileMenu((prev) => !prev);
              }
            }}
            className="w-5 cursor-pointer hover:scale-110 transition-transform"
          />

          {token && showProfileMenu && (
            <div className="absolute right-0 pt-4 z-50">
              <div className="flex flex-col gap-2 w-40 py-3 px-5 bg-white text-gray-600 rounded-lg shadow-xl border">
                <p
                  className="cursor-pointer hover:text-black"
                  onClick={() => setShowProfileMenu(false)}
                >
                  My Profile
                </p>

                <p
                  className="cursor-pointer hover:text-black"
                  onClick={() => {
                    navigate("/orders");
                    setShowProfileMenu(false);
                  }}
                >
                  Orders
                </p>

                <p
                  className="cursor-pointer hover:text-black"
                  onClick={() => {
                    logout();
                    setShowProfileMenu(false);
                  }}
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 cursor-pointer hover:scale-110 transition-transform"
            alt="cart"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {safeCartCount()}
          </p>
        </Link>

        {/* Mobile Menu */}
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img src={assets.menu_icon} alt="menu" className="w-6" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md sm:hidden z-50">
          <ul className="flex flex-col items-center py-4 space-y-3 text-[16px] text-gray-700 font-medium">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/collection" onClick={() => setMenuOpen(false)}>
              Collection
            </NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>
              About
            </NavLink>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
