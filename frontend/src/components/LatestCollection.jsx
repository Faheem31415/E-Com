import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 10));
      setLoading(false); // ✅ stop loading when data is ready
    } else {
      setLoading(true);
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover the newest arrivals curated just for you. From trendy outfits
          to everyday essentials, explore fresh styles added this season to keep
          your wardrobe updated and fashionable.
        </p>
      </div>

      {/* ✅ Conditional rendering based on loading state */}
      {loading ? (
        <div className="text-center text-gray-500 py-10 text-lg">
          Loading latest products...
        </div>
      ) : latestProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {latestProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-10">
          No products found.
        </div>
      )}
    </div>
  );
};

export default LatestCollection;
