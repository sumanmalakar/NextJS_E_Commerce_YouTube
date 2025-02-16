import Cart from "../models/Cart";
import { NextResponse } from "next/server";

// add items to cart
export const addToCart = async (req) => {
  const body = await req.json();

  const newCart = await Cart.create(body);

  return NextResponse.json({
    message: "Item added to cart successfully..!",
    success: true,
    cartItem: newCart,
  });
};

// get items from cart
export const getCartItems = async (req) => {
  const cartItems = await Cart.find();

  return NextResponse.json({
    message: "Fetched all cart items",
    success: true,
    cartItems,
  });
};

// clear all cart items
export const clearCart = async (req) => {
  await Cart.deleteMany({});
  return NextResponse.json({
    message: "Cart Has been Cleared..!",
    success: true,
  });
};
