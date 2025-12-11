import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

function ProductItem({ id, image, name, price }) {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/product/${id}`}
      className="text-gray-700 cursor-pointer block rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="overflow-hidden">
        <img
          className="w-full h-auto object-cover hover:scale-110 transition-transform duration-500 ease-in-out"
          src={image[0]}
          alt={name}
        />
      </div>

      <div className="p-2">
        <p className="pt-2 pb-1 text-sm font-medium">{name}</p>
        <p className="text-sm font-semibold text-gray-900">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
}

export default ProductItem;
