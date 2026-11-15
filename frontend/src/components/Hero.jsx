import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-stone-50 shadow-sm my-4">
      <div className="flex flex-col sm:flex-row items-center">
        {/* Hero Left Content */}
        <div className="w-full sm:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
          <div className="text-[#333] max-w-md">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              New Season 2026 Collection
            </div>

            {/* Sub-header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 md:w-11 h-[2px] bg-[#414141]"></span>
              <p className="font-medium text-xs sm:text-sm tracking-widest uppercase text-gray-600">
                Curated Fashion
              </p>
            </div>

            {/* Main Headline */}
            <h1 className="prata-regular text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight my-2">
              Latest Arrivals
            </h1>

            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed my-4">
              Explore timeless silhouettes, versatile designs, and premium fabrics tailored for every occasion.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/collection"
                className="group inline-flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-black transition-all duration-300 shadow hover:shadow-md"
              >
                <span>SHOP NOW</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                  &rarr;
                </span>
              </Link>
              <Link
                to="/collection"
                className="text-xs sm:text-sm font-medium text-gray-700 hover:text-black underline underline-offset-4 transition-colors"
              >
                Browse Catalog
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Right Image */}
        <div className="w-full sm:w-1/2 relative overflow-hidden flex items-center justify-center">
          <img
            className="w-full h-full object-cover max-h-[520px] transition-transform duration-700 hover:scale-103"
            src={assets.hero_img}
            alt="Latest Arrivals Banner"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
