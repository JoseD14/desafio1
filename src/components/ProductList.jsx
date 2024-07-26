"use client";
import React from "react";
import { data } from "@/app/data";
import 'bootstrap/dist/css/bootstrap.min.css';

export const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const onAddProduct = (product) => {
    // Verifica si el producto ya está en el carrito
    const existingProduct = allProducts.find(item => item.id === product.id);
    if (existingProduct) {
      // Si ya está en el carrito, aumenta la cantidad
      const products = allProducts.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setTotal(total + product.price);
      setCountProducts(countProducts + 1);
      setAllProducts(products);
    } else {
    
      setTotal(total + product.price);
      setCountProducts(countProducts + 1);
      setAllProducts([...allProducts, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {data.map((product) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
            <div className="card h-100">
              <img
                src={product.image}  
                alt={product.name}  
                className="card-img-top"
                style={{ objectFit: 'cover', height: '200px' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>  
                <p className="card-text">${product.price}</p>
                <p className="card-text">Stock: {product.countInStock}</p>
                <p className="small">{product.description}</p>  
                <button className="btn btn-primary mt-auto" onClick={() => onAddProduct(product)}>
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
