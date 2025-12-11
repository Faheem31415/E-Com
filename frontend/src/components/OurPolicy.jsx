import React from "react";
import { assets } from "../assets/frontend_assets/assets";

function OurPolicy() {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      desc: "We offer hassle-free exchange policy",
    },
    {
      icon: assets.quality_icon,
      title: "7 Days Return Policy",
      desc: "We provide 7 days free return policy",
    },
    {
      icon: assets.support_img,
      title: "Best Customer Support",
      desc: "We provide 24/7 customer support",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-10 text-gray-800">
        Our Policies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={policy.icon}
              alt={policy.title}
              className="w-14 h-14 mb-4 object-contain"
            />
            <p className="text-lg font-semibold text-gray-700 mb-1">
              {policy.title}
            </p>
            <p className="text-sm text-gray-500">{policy.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurPolicy;
