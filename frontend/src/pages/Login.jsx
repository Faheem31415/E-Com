import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login"); // "Login" or "Sign Up"
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "Sign Up") {
        const res = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (!res.data?.success) return toast.error(res.data?.message || "Registration failed");
        toast.success("Registered! Check email for OTP.");
        return navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
      }

      const res = await axios.post(`${backendUrl}/api/user/login`, { email, password });
      if (!res.data?.success) return toast.error(res.data?.message || "Login failed");

      if (!res.data?.verified) {
        toast.error("Please verify your email.");
        return navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
      }

      // Use context setToken (persists to localStorage)
      setToken(res.data.token);
      navigate("/");
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  // If already logged in, redirect home
  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-gray-100 via-gray-200 to-gray-300 relative overflow-hidden">

      {/* Background Gradient Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-60 h-60 bg-blue-400 opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-400 opacity-20 blur-3xl rounded-full"></div>
      </div>

      <form
        onSubmit={onSubmit}
        className="backdrop-blur-xl bg-white/70 shadow-2xl border border-white/20 rounded-2xl p-10 max-w-md w-full animate-fadeIn"
      >
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800 tracking-wide">
          {state}
        </h2>

        {state === "Sign Up" && (
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg mt-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            value={email}
            autoComplete={state === "Login" ? "username" : "email"}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg mt-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            required
            value={password}
            autoComplete={state === "Login" ? "current-password" : "new-password"}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg mt-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
          />
        </div>

        {state === "Login" && (
          <p
            className="text-blue-600 text-sm mb-2 cursor-pointer hover:underline"
            onClick={() => navigate(`/forgot-password`)}
          >
            Forgot Password?
          </p>
        )}

        <button className="w-full py-3 text-lg font-semibold text-white bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 transition rounded-lg shadow-lg">
          {state === "Login" ? "Sign In" : "Sign Up"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-700">
          {state === "Login" ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-blue-600 font-bold cursor-pointer hover:underline"
                onClick={() => setState("Sign Up")}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 font-bold cursor-pointer hover:underline"
                onClick={() => setState("Login")}
              >
                Login
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
