import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

function CartTotal() {
  const { currency, getCartAmount, delivery_fee } = useContext(ShopContext);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const fetchTotal = async () => {
      const amount = await getCartAmount();
      setSubtotal(amount);
    };
    fetchTotal();
  }, [getCartAmount]);

  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 w-full">
      <div className="text-center mb-6">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="space-y-4 text-gray-700">
        <div className="flex justify-between text-sm md:text-base">
          <p>Subtotal</p>
          <p className="font-medium">
            {currency}
            {subtotal.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between text-sm md:text-base">
          <p>Shipping Fee</p>
          <p className="font-medium">
            {currency}
            {delivery_fee.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between text-lg font-semibold">
          <p>Total</p>
          <p>
            {currency}
            {total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
