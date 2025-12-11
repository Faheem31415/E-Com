import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [Category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [showScroll, setShowScroll] = useState(false);

  const toggleCategory = (e) => {
    const value = e.target.value;
    if (Category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (Category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        Category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortproduct = () => {
    let fpcopy = [...filterProducts];

    switch (sortType) {
      case "low-high":
        setFilterProducts([...fpcopy].sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts([...fpcopy].sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [Category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortproduct();
  }, [sortType]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-8 pt-10 border-t px-5 sm:px-10 lg:px-20 bg-gray-50 min-h-screen relative">

      {/* ---------------- FILTER SIDEBAR ---------------- */}
      <div className="w-full sm:w-64">
        <div
          className="flex justify-between items-center sm:hidden mb-4 cursor-pointer bg-white px-4 py-2 rounded-lg shadow-sm"
          onClick={() => setShowFilter(!showFilter)}
        >
          <p className="font-semibold text-gray-800">FILTERS</p>
          <img
            className={`h-4 transition-transform duration-300 ${
              showFilter ? "rotate-90" : ""
            }`}
            src={assets.dropdown_icon}
            alt="dropdown"
          />
        </div>

        <div
          className={`space-y-6 transition-all duration-300 ${
            showFilter ? "block" : "hidden"
          } sm:block`}
        >
          {/* Category Filter */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <p className="font-semibold text-gray-800 mb-3">CATEGORIES</p>
            <div className="space-y-2 text-gray-600 text-sm">
              {["Men", "Women", "Kids"].map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={cat}
                    className="accent-gray-700"
                    checked={Category.includes(cat)}
                    onChange={toggleCategory}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Subcategory Filter */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <p className="font-semibold text-gray-800 mb-3">TYPE</p>
            <div className="space-y-2 text-gray-600 text-sm">
              {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={type}
                    className="accent-gray-700"
                    checked={subCategory.includes(type)}
                    onChange={toggleSubCategory}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- PRODUCT SECTION ---------------- */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 text-sm sm:text-base rounded-md px-3 py-2 outline-none bg-white shadow-sm hover:border-gray-400 transition"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>

      {/* ---------------- SCROLL TO TOP ---------------- */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Collection;
