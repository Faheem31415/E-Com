import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading your orders...
      </div>
    );
  }

  if (!orderData.length) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center space-y-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No Orders"
          className="w-24 h-24 opacity-70"
        />
        <p className="text-gray-600 text-lg font-medium">No orders found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 py-10 px-4 md:px-10 lg:px-16">
      {/* Page Title */}
      <div className="text-center mb-12">
        <Title text1="My" text2="Orders" />
        <p className="text-gray-500 text-sm md:text-base mt-2">
          Track your recent purchases and delivery status
        </p>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            {/* Product Details */}
            <div className="p-5 flex flex-col sm:flex-row gap-5 items-center sm:items-start">
              {/* Product Image */}
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-xl border border-gray-200"
              />

              {/* Product Info */}
              <div className="text-center sm:text-left flex-1">
                <p className="text-lg font-semibold text-gray-800">
                  {item.name}
                </p>

                <div className="text-gray-600 text-sm mt-1 space-y-1">
                  <p>
                    <span className="font-medium text-gray-800">
                      {currency}
                      {item.price}
                    </span>
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>

                <p className="text-gray-500 text-xs sm:text-sm mt-2">
                  Date:{" "}
                  <span className="font-medium text-gray-700">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </p>

                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  Payment:{" "}
                  <span className="font-medium text-gray-700">
                    {item.paymentMethod}
                  </span>
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100"></div>

            {/* Order Status + Button */}
            <div className="flex items-center justify-between px-5 py-4 bg-gray-50">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    item.status === "Delivered"
                      ? "bg-green-500"
                      : item.status === "Processing"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  } animate-pulse`}
                ></div>
                <p
                  className={`text-sm font-medium ${
                    item.status === "Delivered"
                      ? "text-green-600"
                      : item.status === "Processing"
                      ? "text-yellow-600"
                      : "text-blue-600"
                  }`}
                >
                  {item.status}
                </p>
              </div>

              <button
                onClick={loadOrderData}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-full shadow-sm transition-all duration-200"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
