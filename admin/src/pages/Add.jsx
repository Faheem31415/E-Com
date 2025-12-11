import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendurl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // ✅ Handle file upload & preview
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
  };

  // ✅ Toggle size selection
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      images.forEach((img, index) => {
        if (img) formData.append(`image${index + 1}`, img);
      });

      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory); // ✅ fixed here
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      const response = await axios.post(
        `${backendurl}/api/product/add`,
        formData,
        { headers: { token } }
      );
      if(response.data.success){
        toast.success(response.data.message);
        setName('');
        setImages([])
        setBestseller(false)
        setPrice('')
        setDescription('')
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10 space-y-8"
    >
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
        Add New Product
      </h2>

      {/* Upload Images */}
      <div>
        <p className="font-semibold text-gray-700 mb-3">Upload Images</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {images.map((image, i) => (
            <label
              key={i}
              htmlFor={`image${i}`}
              className="cursor-pointer border-2 border-dashed border-gray-300 hover:border-slate-500 
                         rounded-xl overflow-hidden flex items-center justify-center bg-gray-50 h-28 transition-all duration-300"
            >
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="upload preview"
                className={`object-cover ${
                  image ? "w-full h-full" : "w-10 opacity-70"
                }`}
              />
              <input
                onChange={(e) => handleImageChange(e, i)}
                type="file"
                id={`image${i}`}
                hidden
                accept="image/*"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div>
        <p className="font-semibold text-gray-700 mb-2">Product Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Type here"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-slate-500 focus:outline-none"
        />
      </div>

      {/* Product Description */}
      <div>
        <p className="font-semibold text-gray-700 mb-2">Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write description here"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none focus:ring-2 focus:ring-slate-500 focus:outline-none"
        />
      </div>

      {/* Category & Subcategory */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <p className="font-semibold text-gray-700 mb-2">Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-slate-500 focus:outline-none"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="font-semibold text-gray-700 mb-2">Subcategory</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-slate-500 focus:outline-none"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="font-semibold text-gray-700 mb-2">Price (₹)</p>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Enter price"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="font-semibold text-gray-700 mb-3">Available Sizes</p>
        <div className="flex flex-wrap gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() => toggleSize(size)}
              className={`border rounded-lg px-4 py-2 cursor-pointer font-medium 
                ${
                  sizes.includes(size)
                    ? "bg-slate-900 text-white"
                    : "border-gray-300 text-gray-700 hover:bg-slate-100"
                }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
          className="w-4 h-4 text-slate-600 focus:ring-slate-500"
        />
        <label htmlFor="bestseller" className="text-gray-700">
          Add to bestseller
        </label>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-slate-900 text-white px-10 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all duration-300"
        >
          ADD PRODUCT
        </button>
      </div>
    </form>
  );
};

export default Add;
