import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

function ProductItem({ id, image, name, price, bestseller = false }) {
  const { currency } = useContext(ShopContext);
  const [imageLoaded, setImageLoaded] = useState(false);

  const imgSrc = Array.isArray(image) ? image[0] : image;

  return (
    <Link
      to={`/product/${id}`}
      className="group text-gray-700 cursor-pointer block rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {/* Skeleton placeholder while image loads */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        )}

        {bestseller && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-amber-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-md uppercase tracking-wide">
            Popular
          </span>
        )}

        <img
          className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={imgSrc}
          alt={name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="p-3">
        <p className="pt-1 pb-1 text-sm font-medium line-clamp-1 group-hover:text-black transition-colors">
          {name}
        </p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm font-semibold text-gray-900">
            {currency}
            {price}
          </p>
          <span className="text-xs font-medium text-gray-400 group-hover:text-gray-700 transition-colors">
            Shop &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
