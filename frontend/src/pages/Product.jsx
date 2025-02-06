/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [rating, setRating] = useState(0); // State to manage the rating
  const [quantity, setQuantity] = useState(1); // Quantity state

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

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex flex-col sm:flex-row gap-12">
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
            <p className="text-sm font-semibold text-gray-800">All Shades</p>
            <div className="flex gap-2">
              {productData.shades.map((shade, index) => (
                <button
                  className="border py-2 px-4 bg-gray-100 rounded-md hover:bg-gray-200"
                  key={index}
                  onClick={() => setImage(productData.image[index])} // Update image based on shade
                >
                  {shade}
                </button>
              ))}
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
            <button className="flex items-center justify-center bg-pink-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-pink-600 transition ease-in-out w-48">
              <img src={assets.cart} className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
            <button className="flex items-center justify-center bg-pink-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-pink-600 transition ease-in-out w-48">
              <img src={assets.camera} className="w-5 h-5 mr-2" />
              Try it On
            </button>
          </div>
        </div>
      </div>
      {/* Description and Review Section */}
      <div className="mt-6">
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
