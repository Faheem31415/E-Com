import React, { useContext, useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const MODE = {
  LOGIN: "login",
  SIGNUP: "signup",
};

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

const validatePassword = (pw) => pw && pw.length >= 6;

const Login = () => {
  const [mode, setMode] = useState(MODE.LOGIN); // login | signup
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const abortRef = useRef(null);

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  // Redirect if already authenticated
  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  // Cleanup / cancel outstanding request when unmounting or before next request
  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Basic client-side validation
      if (!validateEmail(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
      if (!validatePassword(password)) {
        toast.error("Password must be at least 6 characters.");
        return;
      }
      if (mode === MODE.SIGNUP && !name.trim()) {
        toast.error("Please enter your name.");
        return;
      }

      // Prevent double submits
      if (loading) return;

      setLoading(true);
      // AbortController for axios (axios supports signal)
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        if (mode === MODE.SIGNUP) {
          const res = await axios.post(
            `${backendUrl}/api/user/register`,
            { name: name.trim(), email, password },
            { signal: controller.signal }
          );

          if (!res?.data?.success) {
            toast.error(res?.data?.message || "Registration failed");
            setLoading(false);
            return;
          }

          toast.success("Registered! Check email for OTP.");
          navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
          setLoading(false);
          return;
        }

        // Login flow
        const res = await axios.post(
          `${backendUrl}/api/user/login`,
          { email, password },
          { signal: controller.signal }
        );

        if (!res?.data?.success) {
          toast.error(res?.data?.message || "Login failed");
          setLoading(false);
          return;
        }

        if (!res?.data?.verified) {
          toast.error("Please verify your email.");
          navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
          setLoading(false);
          return;
        }

        // Persist token via context (ShopContext.setToken should persist to localStorage)
        setToken(res.data.token);
        toast.success("Signed in successfully");
        navigate("/");
      } catch (err) {
        // Ignore aborts
        if (axios.isCancel?.(err) || err.name === "CanceledError") {
          // request cancelled
          return;
        }

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong. Please try again.";
        toast.error(message);
      } finally {
        setLoading(false);
        abortRef.current = null;
      }
    },
    [mode, email, password, name, backendUrl, navigate, setToken, loading]
  );

  const switchTo = (m) => {
    setMode(m);
    // clear sensitive fields when switching mode
    setPassword("");
  };

  const submitLabel = mode === MODE.LOGIN ? "Sign In" : "Sign Up";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-60 h-60 bg-blue-400 opacity-20 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-400 opacity-20 blur-3xl rounded-full" />
      </div>

      <form
        onSubmit={onSubmit}
        className="backdrop-blur-xl bg-white/70 shadow-2xl border border-white/20 rounded-2xl p-8 max-w-md w-full animate-fadeIn"
        aria-labelledby="auth-heading"
      >
        <h2 id="auth-heading" className="text-3xl font-bold text-center mb-4 text-gray-800 tracking-wide">
          {mode === MODE.LOGIN ? "Login" : "Sign Up"}
        </h2>

        {mode === MODE.SIGNUP && (
          <div className="mb-4">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg mt-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              autoComplete="name"
              aria-required="true"
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg mt-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            autoComplete={mode === MODE.LOGIN ? "username" : "email"}
            aria-required="true"
            aria-invalid={email && !validateEmail(email)}
          />
        </div>

        <div className="mb-2 relative">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg mt-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
            autoComplete={mode === MODE.LOGIN ? "current-password" : "new-password"}
            aria-required="true"
            aria-invalid={password && !validatePassword(password)}
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-2 top-9 text-sm text-gray-600 hover:text-gray-900"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {mode === MODE.LOGIN && (
          <p
            className="text-blue-600 text-sm mb-2 cursor-pointer hover:underline"
            onClick={() => navigate(`/forgot-password`)}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate(`/forgot-password`)}
          >
            Forgot Password?
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition rounded-lg shadow-lg ${loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
        >
          {loading ? `${submitLabel}...` : submitLabel}
        </button>

        <p className="mt-6 text-center text-sm text-gray-700">
          {mode === MODE.LOGIN ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-blue-600 font-bold cursor-pointer hover:underline"
                onClick={() => switchTo(MODE.SIGNUP)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && switchTo(MODE.SIGNUP)}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 font-bold cursor-pointer hover:underline"
                onClick={() => switchTo(MODE.LOGIN)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && switchTo(MODE.LOGIN)}
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
