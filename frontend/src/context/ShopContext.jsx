/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { products } from "../assets/assets";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const currency = "Rs.";
  const delivery_fee = 50;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState("");
  const [name, setName] = useState(""); 

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const value = {
    products: filteredProducts,
    currency,
    delivery_fee,
    searchQuery,
    setSearchQuery,
    backendUrl,
    token,
    setToken,
    name,
    setName, 
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
