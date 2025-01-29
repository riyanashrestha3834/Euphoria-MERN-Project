/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const LoginPopup = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "visible" : "invisible"
      } transition-opacity duration-300`}
    >
      <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* Login Form */}
        {isLogin ? (
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Phone Number"
              className="border border-gray-300 rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="submit"
              className="bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition"
            >
              Login
            </button>
          </form>
        ) : (
          /* Signup Form */
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border border-gray-300 rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="border border-gray-300 rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="submit"
              className="bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition"
            >
              Sign Up
            </button>
          </form>
        )}

        {/* Toggle between Login and Signup */}
        <p className="text-sm text-center mt-4 text-gray-600">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-pink-500 cursor-pointer hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;
