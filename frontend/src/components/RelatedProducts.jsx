import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

function RelatedProducts({ category, subcategory }) {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = [...products];

      // ✅ Fix: lowercase 'subcategory'
      productsCopy = productsCopy.filter(
        (item) =>
          item.category === category && item.subcategory === subcategory
      );

      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subcategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
      <div className="text-center mb-10">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
        <p className="text-gray-500 text-sm sm:text-base mt-2">
          You may also like similar products
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-2 sm:grid-cols-3 lg:grid-cols-5
          gap-4 sm:gap-6 lg:gap-8
          place-items-center
        "
      >
        {related.length > 0 ? (
          related.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        ) : (
          <p className="col-span-full text-gray-400 text-center py-6">
            No related products found.
          </p>
        )}
      </div>
    </div>
  );
}

export default RelatedProducts;
