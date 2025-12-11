import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            tempData.push({
              _id: itemId,
              size,
              quantity: cartItems[itemId][size],
            });
          }
        }
      }
      setCartData(tempData, products);
    }
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10 lg:px-16">
      {/* Title */}
      <div className="text-center mb-10">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Empty Cart */}
      {cartData.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-20">
          Your cart is empty 🛒
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Cart Items Section */}
          <div className="flex-1 space-y-6 w-full">
            {cartData.map((item, index) => {
              const productData = products.find((p) => p._id === item._id);
              if (!productData) return null;

              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-all duration-200 border border-gray-100"
                >
                  {/* Product Info */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                    <img
                      src={productData.image[0]}
                      alt={productData.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border border-gray-200"
                    />
                    <div className="text-center sm:text-left">
                      <p className="font-semibold text-lg text-gray-800">
                        {productData.name}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Size:{" "}
                        <span className="font-medium text-gray-700">
                          {item.size}
                        </span>
                      </p>
                      <p className="text-gray-800 font-medium mt-1">
                        {currency}
                        {productData.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity + Delete */}
                  <div className="flex items-center gap-4 mt-4 sm:mt-0 sm:self-end">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val > 0) updateQuantity(item._id, item.size, val);
                      }}
                      className="w-16 border border-gray-300 rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <img
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      src={assets.bin_icon}
                      alt="Delete"
                      className="w-6 h-6 cursor-pointer hover:scale-110 hover:rotate-6 transition-transform duration-200"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Total Section */}
          <div className="w-full lg:w-[30%] xl:w-[28%]">
            <CartTotal />
            <div className="w-full text-end">
              <button
                onClick={() => navigate("/place-order")}
                className="bg-black text-white text-sm my-8 px-8 py-3 rounded-full hover:bg-gray-800 transition-all duration-200"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
