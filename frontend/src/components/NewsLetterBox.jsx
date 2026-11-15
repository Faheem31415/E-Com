import React, { useState } from "react";
import { toast } from "react-toastify";

function NewsLetterBox() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    // Simulate brief network delay for UX feedback
    setTimeout(() => {
      setLoading(false);
      toast.success("Welcome aboard! Use coupon WELCOME20 for 20% off your first order 🎉");
      setEmail("");
    }, 400);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200/80 py-14 px-6 sm:px-12 rounded-3xl text-center max-w-3xl mx-auto shadow-sm my-16">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm text-gray-800 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      </div>

      <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
        Subscribe now & get 20% off
      </h3>

      <p className="text-gray-500 mb-8 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
        Join our fashion community and be the first to know about new arrivals,
        exclusive sales, and member-only styling drops.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider hover:bg-black transition-all duration-300 shadow hover:shadow-md disabled:opacity-60 cursor-pointer"
        >
          {loading ? "JOINING..." : "SUBSCRIBE"}
        </button>
      </form>

      <p className="text-[11px] text-gray-400 mt-4">
        🔒 We value your privacy. Unsubscribe anytime with one click.
      </p>
    </div>
  );
}

export default NewsLetterBox;
