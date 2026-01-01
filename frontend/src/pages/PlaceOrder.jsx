import React, { useState, useContext } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        address: formData,
      };

      switch (method) {
        //api calls for cod
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            setCartItems({});
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          )
          if (responseRazorpay.data.success) {
            console.log("Razorpay order received:", responseRazorpay.data.order);

            initPay(responseRazorpay.data.order);
          } else {
            toast.error(responseRazorpay.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen bg-gray-50 py-10 px-5 md:px-16 flex flex-col lg:flex-row gap-10"
    >
      {/* Left Side - Delivery Information */}
      <div className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-6">
        <Title text1={"DELIVERY"} text2={"INFORMATION"} />

        {/* Name Inputs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            placeholder="First Name"
            type="text"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            placeholder="Last Name"
            type="text"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email & Street */}
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          placeholder="Email Address"
          type="email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          placeholder="Street"
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* City & State */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            placeholder="City"
            type="text"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            placeholder="State"
            type="text"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Zipcode & Country */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            required
            onChange={onChangeHandler}
            name="zipCode"
            value={formData.zipCode}
            placeholder="Zipcode"
            type="number"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            placeholder="Country"
            type="text"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Phone */}
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          placeholder="Phone"
          type="number"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Right Side - Order Summary & Payment */}
      <div className="flex-1 lg:max-w-md space-y-6">
        {/* Cart Total */}
        <CartTotal />

        {/* Payment Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          {/* Payment Method Selection */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            {/* Stripe */}
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 border border-gray-300 rounded-xl p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
                method === "stripe" ? "bg-blue-100 border-blue-500" : "bg-white"
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-blue-500" : ""
                }`}
              ></p>
              <img
                src={assets.stripe_logo}
                alt="Stripe"
                className="w-16 h-6 object-contain"
              />
            </div>

            {/* Razorpay */}
            <div
              onClick={() => setMethod("razorpay")}
              className={`flex items-center gap-3 border border-gray-300 rounded-xl p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
                method === "razorpay"
                  ? "bg-blue-100 border-blue-500"
                  : "bg-white"
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-blue-500" : ""
                }`}
              ></p>
              <img
                src={assets.razorpay_logo}
                alt="Razorpay"
                className="w-16 h-6 object-contain"
              />
            </div>

            {/* Cash on Delivery */}
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border border-gray-300 rounded-xl p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
                method === "cod" ? "bg-blue-100 border-blue-500" : "bg-white"
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-blue-500" : ""
                }`}
              ></p>
              <p className="text-gray-700 font-medium">CASH ON DELIVERY</p>
            </div>
          </div>

          {/* Place Order Button */}
          <div className="pt-4 text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-full transition-all duration-200 shadow-sm"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
