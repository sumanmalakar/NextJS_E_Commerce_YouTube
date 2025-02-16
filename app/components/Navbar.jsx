"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useProductContext } from "../context/ProductContext";

import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const { products, data, cart, setData } = useProductContext();

  const filterByCategory = (category) => {
    setData(products.filter((p) => p.category === category));
  };

  const filterByPrice = (price) => {
    setData(products.filter((p) => p.price >= price));
  };

  const pathname = usePathname();
  const router = useRouter();

  const [searchTerm, setsearchTerm] = useState("");

  const handleSumbit = (e) => {
    e.preventDefault();
    router.push(`/search/${searchTerm}`)
    setsearchTerm("")
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg sticky-top p-3"
        style={{
          backgroundColor: "blue",
        }}
      >
        <div className="container d-flex justify-content-center align-items-center">
          <Link href={"/"} className="navbar-brand fw-bold text-light">
            Next.JS E_Commerce
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSumbit} className="d-flex flex-grow-1 mx-4">
            <div className="input-group">
              <input
                value={searchTerm}
                onChange={(e) => setsearchTerm(e.target.value)}
                type="text"
                className="form-control border-secondary"
                placeholder="Search Products..."
              />
              <button className="btn btn-danger" type="submit">
                <FaSearch />
              </button>
            </div>
          </form>

          {/* Cart Button */}
          <Link href={"/cart"} className="ms-2">
            <button className="btn btn-light position-relative">
              <FaShoppingCart className="fs-5 text-danger" />
              {cart.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length}
                </span>
              )}
            </button>
          </Link>
        </div>
      </nav>

      {/* filter system */}
      {pathname == "/" && (
        <div className="container">
          <div className="bg-dark text-light my-3">
            <div className="container p-3 rounded">
              <div className="row">
                {/* category filters */}
                <div className="col-md-6 d-flex flex-wrap align-items-center gap-2">
                  <strong>Category:</strong>

                  <button
                    onClick={() => setData(products)}
                    className="btn btn-outline-light px-3"
                  >
                    All
                  </button>
                  <button
                    onClick={() => filterByCategory("mobiles")}
                    className="btn btn-outline-light px-3"
                  >
                    Mobiles
                  </button>
                  <button
                    onClick={() => filterByCategory("laptops")}
                    className="btn btn-outline-light px-3"
                  >
                    Laptops
                  </button>
                  <button
                    onClick={() => filterByCategory("tablets")}
                    className="btn btn-outline-light px-3"
                  >
                    Tablets
                  </button>
                </div>

                {/* price filters */}
                <div className="col-md-6 d-flex flex-wrap align-items-center gap-2">
                  <strong>Price:</strong>
                  <button
                    onClick={() => filterByPrice(29999)}
                    className="btn btn-outline-warning px-3"
                  >
                    {">="} 29,999
                  </button>
                  <button
                    onClick={() => filterByPrice(49999)}
                    className="btn btn-outline-warning px-3"
                  >
                    {">="} 49,999
                  </button>
                  <button
                    onClick={() => filterByPrice(69999)}
                    className="btn btn-outline-warning px-3"
                  >
                    {">="} 69,999
                  </button>
                  <button
                    onClick={() => filterByPrice(89999)}
                    className="btn btn-outline-warning px-3"
                  >
                    {">="} 89,999
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
