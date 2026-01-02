import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo(0, 0);
  }, [productId, products]);

  return productData ? (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
      {/* Product Section */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left — Product Images */}
        <div className="flex flex-col lg:flex-row gap-6 flex-1">
          {/* Thumbnail List */}
          <div className="flex lg:flex-col gap-3 justify-center lg:justify-start">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                alt=""
                onClick={() => setImage(item)}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all duration-300 ${
                  image === item ? "border-orange-500" : "border-gray-200"
                } hover:scale-105`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <img
              src={image}
              alt={productData.name}
              className="w-full max-h-[500px] object-cover rounded-xl shadow-md"
            />
          </div>
        </div>

        {/* Right — Product Details */}
        <div className="flex-1 space-y-5">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            {productData.name}
          </h1>

          {/* Ratings */}
          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <img
                key={i}
                src={assets.star_icon}
                alt="star"
                className="w-4 h-4"
              />
            ))}
            <img src={assets.star_dull_icon} alt="star" className="w-4 h-4" />
            <p className="text-gray-500 text-sm ml-1">(122 reviews)</p>
          </div>

          {/* Price */}
          <p className="text-2xl font-semibold text-orange-600">
            {currency} {productData.price}
          </p>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {productData.description}
          </p>

          {/* Size Selector */}
          <div>
            <p className="font-medium text-gray-700 mb-2">Select Size:</p>
            <div className="flex flex-wrap gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border rounded-md py-2 px-4 text-sm md:text-base transition-all duration-200 ${
                    item === size
                      ? "border-orange-500 bg-orange-100"
                      : "border-gray-300 hover:border-orange-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-md shadow-md transition-all"
          >
            ADD TO CART
          </button>

          {/* Product Info */}
          <hr className="border-gray-200 my-4" />
          <div className="text-gray-500 text-sm space-y-1">
            <p>✅ 100% Original Product</p>
            <p>💵 Cash on Delivery Available</p>
            <p>🔄 Easy Return & Exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews Section */}
      <div className="mt-12">
        <div className="flex gap-6 border-b border-gray-300 pb-2 text-gray-700 font-medium">
          <p className="border-b-2 border-orange-500 pb-1 cursor-pointer">
            Description
          </p>
          <p className="cursor-pointer hover:text-orange-500">Reviews (122)</p>
        </div>

        <div className="mt-4 text-gray-600 text-sm md:text-base space-y-4 leading-relaxed">
          <p>
            Crafted with premium-quality fabric, this clothing item is designed
            to offer all-day comfort while maintaining a modern and stylish
            look. The breathable material feels soft on the skin, making it
            suitable for both everyday wear and special occasions.
          </p>
          <p>
            Featuring a durable finish and a tailored fit, this piece combines
            practicality with elegance. It is easy to maintain, retains its
            color and shape after multiple washes, and pairs effortlessly with a
            variety of outfits for a versatile wardrobe choice.
          </p>
        </div>
      </div>

      {/* related products */}

      <RelatedProducts
        category={productData.category}
        subcategory={productData.subcategory}
      />
    </div>
  ) : (
    <div className="h-60 flex items-center justify-center text-gray-400">
      Loading...
    </div>
  );
};

export default Product;
