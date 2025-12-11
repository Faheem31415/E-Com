import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendurl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendurl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendurl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Status updated successfully!");
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-10 bg-gray-50 min-h-screen">
      <h3 className="text-2xl sm:text-3xl font-bold mb-10 text-gray-800 text-center md:text-left">
        Manage Orders
      </h3>

      {!orders.length ? (
        <div className="flex flex-col justify-center items-center h-[60vh] space-y-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No Orders"
            className="w-24 h-24 opacity-70"
          />
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <img
                    src={assets.parcel_icon}
                    alt="Parcel"
                    className="w-7 h-7"
                  />
                  <p className="font-semibold text-gray-700">
                    Order #{index + 1}
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              {/* Order Details */}
              <div className="text-sm text-gray-700 space-y-2 mb-3">
                <p>
                  <span className="font-semibold">Items:</span>{" "}
                  {order.items
                    .map((item) => `${item.name} × ${item.quantity}`)
                    .join(", ")}
                </p>
                <p>
                  <span className="font-semibold">Customer:</span>{" "}
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}
                </p>
                <p>
                  <span className="font-semibold">Payment:</span>{" "}
                  {order.payment ? (
                    <span className="text-green-600 font-medium">Done</span>
                  ) : (
                    <span className="text-red-500 font-medium">Pending</span>
                  )}{" "}
                  ({order.paymentMethod})
                </p>
                <p>
                  <span className="font-semibold">Amount:</span> {currency}
                  {order.amount}
                </p>
              </div>

              {/* Status Dropdown */}
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="Order placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
