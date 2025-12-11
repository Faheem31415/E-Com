import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div className="flex flex-col items-center px-6 sm:px-12 md:px-20 lg:px-32 py-12 bg-white text-gray-800">
      {/* ABOUT US SECTION */}
      <div className="text-center mb-10">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
        <img
          src={assets.about_img}
          alt="About Us"
          className="w-full md:w-1/2 rounded-2xl shadow-lg object-cover"
        />
        <div className="flex flex-col gap-5 md:w-1/2 text-lg leading-relaxed">
          <p>
            Welcome to our fashion marketplace — your one-stop destination for
            stylish, comfortable, and premium-quality clothing. We believe that
            fashion should be accessible, affordable, and effortlessly modern.
            Our goal is to bring you the latest trends while ensuring top-tier
            quality you can trust.
          </p>

          <p>
            From everyday essentials to seasonal collections, every product is
            curated with care. Whether you're upgrading your wardrobe or
            searching for the perfect outfit, our platform makes shopping simple
            and enjoyable with a seamless browsing and checkout experience.
          </p>

          <div className="mt-4">
            <b className="text-xl text-gray-900">Our Mission</b>
            <p className="mt-2">
              Our mission is to redefine online clothing shopping by blending
              trend-forward fashion with exceptional customer satisfaction. We
              aim to deliver high-quality apparel at fair prices, backed by fast
              delivery, easy returns, and a support team that always puts you
              first.
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US SECTION */}
      <div className="text-center mb-10">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition duration-300">
          <b className="text-xl block mb-2 text-indigo-600">
            Quality Assurance
          </b>
          <p className="text-gray-700">
            Every piece we offer goes through strict quality checks to make sure
            you receive clothing that feels great, fits perfectly, and lasts
            long — without compromising on style.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition duration-300">
          <b className="text-xl block mb-2 text-indigo-600">Convenience</b>
          <p className="text-gray-700">
            Shop effortlessly with a smooth interface, secure payments, fast
            delivery, and easy returns. We make sure your shopping experience is
            simple, quick, and hassle-free.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition duration-300">
          <b className="text-xl block mb-2 text-indigo-600">
            Exceptional Customer Service
          </b>
          <p className="text-gray-700">
            Our support team is always ready to help you — whether you need
            assistance with sizing, order updates, or product recommendations,
            we’re here to give you a smooth shopping experience.
          </p>
        </div>
      </div>

      {/* NEWSLETTER BOX */}
      <div className="w-full">
        <NewsLetterBox />
      </div>
    </div>
  );
};

export default About;
