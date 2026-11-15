import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import ProductSkeleton from "./ProductSkeleton";

const LatestCollection = () => {
  const { products, productsLoading } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    } else {
      setLatestProducts([]);
    }
  }, [products]);

  return (
    <div className="my-14">
      {/* Header section */}
      <div className="text-center py-8">
        <div className="text-3xl sm:text-4xl">
          <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        </div>
        <p className="w-11/12 sm:w-3/4 md:w-1/2 m-auto text-xs sm:text-sm md:text-base text-gray-500 mt-2">
          Discover the newest arrivals curated just for you. From trendy outfits
          to everyday essentials, explore fresh styles added this season.
        </p>
      </div>

      {/* Grid: Loading skeletons vs Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 gap-y-6">
        {productsLoading ? (
          <ProductSkeleton count={10} />
        ) : latestProducts.length > 0 ? (
          latestProducts.map((item, index) => (
            <ProductItem
              key={item._id || index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              bestseller={item.bestseller}
            />
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">No products found at the moment.</p>
            <p className="text-xs text-gray-400 mt-1">Please check back soon for our latest arrivals.</p>
          </div>
        )}
      </div>

      {/* Bottom CTA to view full catalog */}
      {!productsLoading && latestProducts.length > 0 && (
        <div className="text-center mt-10">
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 shadow-sm hover:shadow"
          >
            <span>Explore All Collections</span>
            <span>&rarr;</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default LatestCollection;
