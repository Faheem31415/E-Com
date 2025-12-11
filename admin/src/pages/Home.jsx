import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6 bg-linear-to-b from-gray-50 to-gray-100">
      {/* Main Heading */}
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
        Welcome to the Admin Panel
      </h1>

      {/* Subheading */}
      <p className="text-lg text-gray-600 max-w-2xl mb-10 leading-relaxed">
        Manage your online store effortlessly — add new products, track customer
        orders, and monitor your inventory in real-time.  
        <br />
        Keep your business organized and efficient with our intuitive dashboard.
      </p>

      {/* Visual Boxes Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Box 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
          <div className="text-4xl mb-3">🛍️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Add Products
          </h3>
          <p className="text-gray-600 text-sm">
            Easily upload and manage product details, pricing, and images.
          </p>
        </div>

        {/* Box 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
          <div className="text-4xl mb-3">📦</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Manage Orders
          </h3>
          <p className="text-gray-600 text-sm">
            Track order status, payment details, and delivery progress.
          </p>
        </div>

        {/* Box 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
          <div className="text-4xl mb-3">📊</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Product Insights
          </h3>
          <p className="text-gray-600 text-sm">
            Monitor product performance and gain valuable business insights.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
