import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendurl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPatched, setIsPatched] = useState(false);

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendurl}/api/product/list`, {
        headers: { token },
      });

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message || "Failed to load products");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to fetch products. Please try again.");
    } finally {
      // simulate patch/backup delay
      setTimeout(() => {
        setIsPatched(true);
        setLoading(false);
      }, 500);
    }
  };

  const removeproduct = async (id) => {
    try {
      const response =await axios.post(
        backendurl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch(error) {
      console.error(error);
      toast.error("Unable to remove product. Please try again.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const isStillLoading = loading || !isPatched;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
            🛍️ Product Inventory
          </h1>
          <p className="text-gray-600">Manage and view all your products</p>
        </div>

        {/* Loading State */}
        {isStillLoading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-lg font-semibold text-gray-700 animate-pulse">
              Loading...
            </p>
          </div>
        ) : list.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Start by adding your first product to the inventory
            </p>
          </div>
        ) : (
          <>
            {/* Table Header (Desktop) */}
            <div className="hidden lg:grid grid-cols-[100px_1fr_150px_120px_100px] gap-6 bg-white px-6 py-4 rounded-t-xl shadow-sm border-b border-gray-200">
              <p className="text-sm font-semibold text-gray-700 uppercase">
                Image
              </p>
              <p className="text-sm font-semibold text-gray-700 uppercase">
                Product Name
              </p>
              <p className="text-sm font-semibold text-gray-700 uppercase">
                Category
              </p>
              <p className="text-sm font-semibold text-gray-700 uppercase">
                Price
              </p>
              <p className="text-sm font-semibold text-gray-700 uppercase text-center">
                Action
              </p>
            </div>

            {/* Product List */}
            <div className="divide-y divide-gray-100">
              {list.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col lg:grid lg:grid-cols-[100px_1fr_150px_120px_100px] gap-6 bg-white p-5 lg:px-6 lg:py-4 shadow-sm hover:shadow-md transition-all duration-200 rounded-lg lg:rounded-none"
                >
                  {/* Image */}
                  <div className="flex justify-center lg:justify-start">
                    <img
                      src={item.image?.[0] || "/placeholder.png"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col justify-center">
                    <p className="font-semibold text-gray-900 text-lg truncate">
                      {item.name}
                    </p>
                    <p className="lg:hidden text-gray-500 text-sm mt-1">
                      {item.category} • {currency}
                      {item.price}
                    </p>
                  </div>

                  {/* Category (Desktop Only) */}
                  <div className="hidden lg:flex items-center">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>

                  {/* Price (Desktop Only) */}
                  <div className="hidden lg:flex items-center font-semibold text-gray-900">
                    {currency}
                    {item.price}
                  </div>

                  {/* Delete Button */}
                  <div className="flex justify-end items-center">
                    <p
                      className="text-red-500 hover:text-red-600 cursor-pointer font-bold text-lg transition-transform hover:scale-110"
                      onClick={() => removeproduct(item._id)}
                    >
                      X
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default List;
