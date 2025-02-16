"use client";
import React from "react";
import Link from "next/link";
import { ToastContainer, toast, Bounce } from "react-toastify";

import { useProductContext } from "../context/ProductContext";

const Product = ({ items }) => {
  const { addToCart, getCartItems } = useProductContext();


  if (items.length === 0)
    return (
      <h1 className="text-center my-5" style={{ marginTop: "15rem" }}>
        Loading...
      </h1>
    );

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="cotainer my-5">
        <div className="row">
          {items.map((product) => (
            <div
              key={product._id}
              className="col-lg-4 col-md-6 my-3 text-center d-flex justify-content-center align-items-center"
            >
              <div
                className="card bg-dark text-light"
                style={{ width: "18rem" }}
              >
                <Link href={`/${product._id}`}>
                  <div className="d-flex justify-content-center align-items-center p-3">
                    <img
                      src={product.imgSrc}
                      alt="img"
                      className="card-img-top"
                      style={{
                        width: "200px",
                        borderRadius: "10px",
                        border: "1px solid yellow",
                      }}
                    />
                  </div>
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <button className="btn btn-primary mx-3">
                    {product.price} ₹
                  </button>
                  <button
                    onClick={() => {
                      addToCart(
                        product.title,
                        product.imgSrc,
                        product.price,
                        toast
                      );
                      getCartItems();
                    }}
                    className="btn btn-warning"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
