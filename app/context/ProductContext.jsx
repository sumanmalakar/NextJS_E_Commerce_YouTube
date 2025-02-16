"use client";
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// create product context
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchAllProducts = async () => {
    const api = await axios.get(`${API_BASE_URL}/products`);
    setProducts(api.data.product);
    setData(api.data.product);
    console.log("fetched all products = ", products);
  };

  const addToCart = async (title, imgSrc, price, toast) => {
    const api = await axios.post(`${API_BASE_URL}/cart`, {
      title,
      imgSrc,
      price,
    });
    if (api.data.success) {
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
      });
    }

    console.log("product added to cart ", api.data);
  };

  const getCartItems = async () => {
    const api = await axios.get(`${API_BASE_URL}/cart`);
    setCart(api.data.cartItems);
    console.log("cart items = ", api.data);
  };

  const clearCart = async () => {
    const api = await axios.delete(`${API_BASE_URL}/cart`);
    getCartItems();
  };

  useEffect(() => {
    getCartItems();
    fetchAllProducts();
  }, []);

  console.log("fetched all products = ", products);

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        data,
        setData,
        addToCart,
        getCartItems,
        clearCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// custom Hook for context
export const useProductContext = () => useContext(ProductContext);

export default ProductContext;
