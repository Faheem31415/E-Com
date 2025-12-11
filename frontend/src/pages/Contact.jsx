import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const Contact = () => {
  return (
    <div className="flex flex-col items-center px-6 sm:px-12 md:px-20 lg:px-32 py-12 bg-white text-gray-800">
      {/* TITLE */}
      <div className="text-center mb-10">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-16 w-full">
        {/* IMAGE */}
        <img
          src={assets.contact_img}
          alt="Contact Us"
          className="w-full md:w-1/2 rounded-2xl shadow-lg object-cover"
        />

        {/* CONTACT INFO */}
        <div className="flex flex-col gap-4 md:w-1/2 text-lg leading-relaxed">
          <div>
            <p className="text-2xl font-semibold text-indigo-600 mb-2">
              Our Office
            </p>
            <p className="text-gray-700">
              Fashion Street, Block 12 <br />
              Mumbai, Maharashtra, India
            </p>
          </div>

          <div>
            <p className="text-xl font-medium text-gray-900 mt-4">Customer Support</p>
            <p className="text-gray-700 mt-2">
              Tel:{" "}
              <a href="tel:+919876543210" className="hover:underline">
                +91 98765 43210
              </a>{" "}
              <br />
              Email:{" "}
              <a
                href="mailto:support@foreverstyle.com"
                className="text-indigo-600 hover:underline"
              >
                support@foreverstyle.com
              </a>
            </p>
          </div>

          <div className="mt-6">
            <p className="text-xl font-semibold text-indigo-600">
              Work With Us
            </p>
            <p className="text-gray-700 mt-2">
              We're always looking for creative, passionate people to join our
              growing team. Explore roles in design, logistics, marketing, and more.
            </p>
            <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-xl shadow hover:bg-indigo-700 transition duration-300">
              View Open Positions
            </button>
          </div>
        </div>
      </div>

      {/* NEWSLETTER SECTION */}
      <div className="w-full">
        <NewsLetterBox />
      </div>
    </div>
  );
};

export default Contact;
