"use client";
import React from "react";
import { useProductContext } from "../context/ProductContext";
import { useEffect, useState } from "react";
import Product from "../components/Product";

const page = ({ params }) => {
  const { slug } = React.use(params);

  const { products } = useProductContext();

  const [productById, setproductById] = useState(null);
  const [relatedProduct, setrelatedProduct] = useState([]);

  useEffect(() => {
    const filterProduct = products.find((p) => p._id === slug);

    if (filterProduct) {
      setproductById(filterProduct);

      const related = products.filter(
        (p) => p.category === filterProduct.category
      );
      setrelatedProduct(related);
    }
  }, [slug,products]);

  if(!productById) return <p className="text-center my-5">Loading...</p>

  return (
    <div>
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6 d-flex justify-content-center align-items-center p-3">
            <img
              src={productById.imgSrc}
              alt="img"
              
              style={{
                width:'100%',
                maxWidth: "300px",
                height:'auto',
                borderRadius: "10px",
                border: "1px solid yellow",
              }}
            />
          </div>

          {/* prduct details */}
          <div className="col-md-6 text-center">
          <h1 className="card-title">{productById.title}</h1>
          <p className="card-text">{productById.description}</p>
          <button className="btn btn-primary mx-3">{productById.price}</button>
          <button className="btn btn-danger mx-3">Buy Now</button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <h1 className="text-center my-5">Related Products</h1>
      <Product items={relatedProduct} />
    </div>
    
    
  );
};

export default page;
