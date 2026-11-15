import React from "react";
import { assets } from "../assets/frontend_assets/assets";

function OurPolicy() {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      desc: "Hassle-free sizing exchanges with instant assistance.",
    },
    {
      icon: assets.quality_icon,
      title: "7 Days Return Policy",
      desc: "Return with ease within 7 days for a 100% full refund.",
    },
    {
      icon: assets.support_img,
      title: "24/7 Dedicated Support",
      desc: "Round-the-clock expert support for every order query.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
          Why Shop With Us
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-md mx-auto">
          We are committed to delivering premium quality, seamless customer service, and absolute peace of mind.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="group flex flex-col items-center text-center bg-white p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center mb-5 transition-colors duration-300">
              <img
                src={policy.icon}
                alt={policy.title}
                className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1.5">
              {policy.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xs">
              {policy.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurPolicy;
