/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';
import lipStockImage from '../assets/lightSkinBackground.jpg'; // Import the image

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [rating, setRating] = useState(0); // State to manage the rating
  const [quantity, setQuantity] = useState(1); // Quantity state
  const [showTryOnPopup, setShowTryOnPopup] = useState(false);
  const [shade, setShade] = useState('');
  const [lipColor, setLipColor] = useState("#ff6b6b66"); // Default color for lip color changer
  const [skinToneValue, setSkinToneValue] = useState(0.5); // State for skin tone slider (0 to 1)

  const fetchProductData = async () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]); // Default image
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  // Function to render star ratings
  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <span
          key={index}
          className={`cursor-pointer text-lg ${
            index < rating ? 'text-yellow-500' : 'text-gray-400'
          }`}
          onClick={() => setRating(index + 1)}
        >
          ★
        </span>
      ));
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(Math.max(1, quantity - 1)); // Prevent quantity from going below 1

  // Available colors with their labels for lip color changer
  const colors = [
    { label: "Red", value: "#ff000066" }, // 40% opacity
    { label: "Pink", value: "#ff69b466" }, // 40% opacity
    { label: "Coral", value: "#ff7f5066" }, // 40% opacity
    { label: "Burgundy", value: "#80002066" }, // 40% opacity
    { label: "Purple", value: "#80008066" }, // 40% opacity
    { label: "Orange", value: "#ff8c0066" }, // 40% opacity
  ];

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 min-h-screen">
      {/* Product Data */}
      <div className="flex flex-col sm:flex-row gap-12 container mx-auto px-4">
        {/* Product Images */}
        <div className="flex-1 flex flex-col gap-4 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[20%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                alt=""
                key={index}
                className="w-[20%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-md border border-gray-200"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto rounded-lg shadow-lg border border-gray-200"
              src={image}
              alt=""
            />
          </div>
        </div>
        {/* Product Details */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="font-medium text-2xl">{productData.name}</h1>
          <p className="text-sm text-gray-600 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            {/* Shades Section */}
            <div className="flex flex-col gap-4 my-8">
              <p className="text-sm font-semibold text-gray-800">Select your shade</p>
              <div className="flex gap-2">
                {productData.shades.map((item, index) => (
                  <button
                    key={index}
                    className={`border py-2 px-4 bg-gray-100 rounded-md hover:bg-gray-200 ${
                      item === shade ? "border-pink-600 font-semibold" : ""
                    }`}
                    onClick={() => setShade(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <hr className="text-gray-400"></hr>
          <div className="flex items-center gap-2">
            {/* Render star ratings */}
            <div className="flex">{renderStars()}</div>
            <p className="text-sm text-gray-500">(8 customer reviews)</p>
          </div>
          <p className="text-1xl text-pink-500">
            {currency}
            {productData.price}
          </p>
          <p className="font-medium mt-4">Quantity</p>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={decreaseQuantity}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-12 text-center border border-gray-300 rounded-md"
            />
            <button
              onClick={increaseQuantity}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              +
            </button>
          </div>
          {/* Add to Cart and Try it On Buttons */}
          <div className="flex justify-start gap-4 mt-4">
            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(productData._id, shade, quantity)}
              className="flex items-center justify-center bg-pink-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-pink-600 transition ease-in-out w-48"
            >
              <img src={assets.cart} className="w-5 h-5 mr-2" alt="Cart" />
              Add to Cart
            </button>

            <button
              onClick={() => setShowTryOnPopup(true)} // Allow Try It On without shade selection
              className="flex items-center justify-center bg-pink-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-pink-600 transition ease-in-out w-48"
            >
              <img src={assets.camera} className="w-5 h-5 mr-2" alt="Try On" />
              Try it On
            </button>
          </div>
        </div>
      </div>
      {/* Try It On Popup */}
      {showTryOnPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Virtual Try-On</h2>
            {/* Skin Tone Slider */}
            <div className="mt-4">
              <label htmlFor="skin-tone" className="block text-sm font-medium text-gray-700 mb-2">
                Skin Tone Slider
              </label>
              <input
                type="range"
                id="skin-tone"
                name="skin-tone"
                min="0"
                max="0.8"
                step="0.1"
                value={skinToneValue}
                onChange={(e) => setSkinToneValue(parseFloat(e.target.value))}
                className="w-48"
              />
              <p className="text-sm text-gray-600 mt-2">
                Adjust the slider to change the skin tone
              </p>
            </div>
            {/* Lip Color Changer Component */}
            <div className="flex flex-col items-center p-8 bg-gray-100 rounded-lg w-full max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-6">Lip Color Changer</h2>
              <div className="mb-8 w-72 h-56 relative flex justify-center items-center">
                {/* Background Image with Skin Tone Adjustment */}
                <div
                  className="w-full h-full rounded-full absolute"
                  style={{
                    backgroundImage: `url(${lipStockImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: `brightness(${1.2 - skinToneValue}) contrast(${0.8 + skinToneValue})`, // Adjust brightness and contrast
                  }}
                ></div>
                {/* Lip shape using SVG (10% smaller) */}
                <svg
                  viewBox="0 0 100 50"
                  className="w-64 h-28 absolute z-10" // Reduced size by 10%
                >
                  <path
                    d="M10,30 Q30,10 50,20 Q70,10 90,30 Q70,50 50,40 Q30,50 10,30 Z"
                    fill={lipColor} // Use lipColor with transparency
                  />
                </svg>
              </div>
              <div className="flex flex-wrap justify-center gap-3 mb-4">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setLipColor(color.value)}
                    className="p-4 rounded-full border-2 border-gray-300 w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
                    style={{ backgroundColor: color.value }}
                    aria-label={`Change to ${color.label}`}
                    title={color.label}
                  />
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-lg font-medium">
                  Current color:{" "}
                  <span style={{ color: lipColor }}>
                    {colors.find((c) => c.value === lipColor)?.label || "Custom"}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Click on any color button to change the lip color
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button 
                onClick={() => setShowTryOnPopup(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Description and Review Section */}
      <div className="mt-6 container mx-auto px-4">
        <div className="flex gap-2">
          <button className="px-5 py-2 text-sm font-medium">Description</button>
          <button className="px-5 py-2 text-sm text-gray-600">More Information</button>
          <button className="px-5 py-2 text-sm text-gray-600">Reviews</button>
        </div>
        <div className='flex flex-col gap-4 border pc-6 py-6 text-sm text-gray-500'>
          <p>{productData.description}</p>
        </div>
      </div>
      {/* Display related products */}
      <RelatedProducts brand={productData.brand} category={productData.category}/>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;