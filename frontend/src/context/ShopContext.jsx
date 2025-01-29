/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const currency= 'Rs.';
const delivery_fee = 50;

const ShopContextProvider = (props) => {
    const value={
        products , currency, delivery_fee
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;  