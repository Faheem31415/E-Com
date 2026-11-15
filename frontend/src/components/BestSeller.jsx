import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import ProductSkeleton from "./ProductSkeleton";

function BestSeller() {
  const { products, productsLoading } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const bestProducts = products.filter((item) => item.bestseller);
      setBestSeller(bestProducts.slice(0, 5));
    } else {
      setBestSeller([]);
    }
  }, [products]);

  return (
    <div className="my-14">
      {/* Header section */}
      <div className="text-center py-8">
        <div className="text-3xl sm:text-4xl">
          <Title text1={"BEST"} text2={"SELLERS"} />
        </div>
        <p className="w-11/12 sm:w-3/4 md:w-1/2 m-auto text-xs sm:text-sm md:text-base text-gray-500 mt-2">
          Discover our most popular and highly-rated products, chosen by our
          community for exceptional quality, comfort, and timeless style.
        </p>
      </div>

      {/* Grid: Loading skeletons vs Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 gap-y-6">
        {productsLoading ? (
          <ProductSkeleton count={5} />
        ) : bestSeller.length > 0 ? (
          bestSeller.map((item, index) => (
            <ProductItem
              key={item._id || index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              bestseller={true}
            />
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">No best sellers currently available.</p>
            <p className="text-xs text-gray-400 mt-1">Check back soon or explore our latest collection!</p>
          </div>
        )}
      </div>

      {/* Bottom CTA to view full catalog */}
      {!productsLoading && bestSeller.length > 0 && (
        <div className="text-center mt-10">
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-gray-700 hover:text-black uppercase group"
          >
            <span>View All Bestsellers</span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default BestSeller;
