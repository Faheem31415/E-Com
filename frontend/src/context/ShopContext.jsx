// src/context/ShopContext.jsx
import React, { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = "$";
  const delivery_fee = 10;
  const navigate = useNavigate();

  // Hydration state to avoid rendering app before token is restored
  const [isHydrating, setIsHydrating] = useState(true);

  // tokenState is the single source of truth for logged-in state
  const [tokenState, setTokenState] = useState("");

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Public setToken: persists to localStorage and updates state
  const setToken = useCallback((t) => {
    if (t) {
      localStorage.setItem("token", t);
      setTokenState(t);
    } else {
      localStorage.removeItem("token");
      setTokenState("");
    }
  }, []);

  // Hydrate token from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("token");
      if (saved) setTokenState(saved);
    } catch (err) {
      // ignore
    } finally {
      setIsHydrating(false);
    }
  }, []);

  /* ------------------------- Products ------------------------- */
  const getProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data?.success) setProducts(res.data.products || []);
    } catch (err) {
      toast.error(err?.message || "Failed to fetch products");
    }
  }, [backendUrl]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  /* --------------------------- Cart --------------------------- */
  const getUserCart = useCallback(
    async (token) => {
      try {
        const res = await axios.post(
          `${backendUrl}/api/cart/get`,
          {},
          { headers: { token } }
        );
        if (res.data?.success) {
          setCartItems(res.data.cartData || {});
        } else {
          setCartItems({});
        }
      } catch (err) {
        toast.error(err?.message || "Failed to fetch cart");
        setCartItems({});
      }
    },
    [backendUrl]
  );

  // fetch cart when token becomes available, clear cart when no token
  useEffect(() => {
    if (tokenState) {
      getUserCart(tokenState);
    } else {
      setCartItems({});
    }
  }, [tokenState, getUserCart]);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    if (!tokenState) {
      toast.error("Please Login");
      return;
    }

    const newCart = structuredClone(cartItems || {});
    if (!newCart[itemId]) newCart[itemId] = {};
    newCart[itemId][size] = (newCart[itemId][size] || 0) + 1;
    setCartItems(newCart);

    if (tokenState) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token: tokenState } }
        );
        // keep server/client in sync
        await getUserCart(tokenState);
      } catch (err) {
        toast.error(err?.message || "Failed to add to cart");
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const newCart = structuredClone(cartItems || {});
    if (!newCart[itemId]) newCart[itemId] = {};
    newCart[itemId][size] = quantity;
    setCartItems(newCart);

    if (tokenState) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token: tokenState } }
        );
        await getUserCart(tokenState);
      } catch (err) {
        toast.error(err?.message || "Failed to update cart");
      }
    }
  };

  const getCartCount = () => {
    let total = 0;
    for (const id in cartItems) {
      const sizes = cartItems[id];
      if (sizes && typeof sizes === "object") {
        for (const s in sizes) total += Number(sizes[s] || 0);
      }
    }
    return total;
  };

  const getCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (!product) continue;
      for (const size in cartItems[id]) {
        total += product.price * Number(cartItems[id][size] || 0);
      }
    }
    return total;
  };

  /* ------------------------- Hydration UI ---------------------- */
  if (isHydrating) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-lg font-medium">Loading...</div>
      </div>
    );
  }

  const value = {
    backendUrl,
    currency,
    delivery_fee,
    navigate,
    token: tokenState,
    setToken,
    products,
    cartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    setCartItems,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
