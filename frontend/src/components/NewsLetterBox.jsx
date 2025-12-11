import React from "react";

function NewsLetterBox() {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="bg-gray-100 py-12 px-6 rounded-2xl text-center max-w-3xl mx-auto shadow-sm">
      <p className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
        Subscribe now & get 20% off
      </p>

      <p className="text-gray-600 mb-6 text-sm sm:text-base">
        Join our fashion community and be the first to know about new arrivals,
        exclusive deals, and seasonal drops. Stay stylish with updates delivered
        straight to your inbox.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
        />
        <button
          type="submit"
          className="w-full sm:w-auto bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
}

export default NewsLetterBox;
