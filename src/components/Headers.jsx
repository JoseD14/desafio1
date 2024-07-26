"use client";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Headers = ({
  allProducts = [], 
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
}) => {
  const [active, setActive] = useState(false);

  // Función para actualizar la cantidad de un producto en el carrito
  const updateProductQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; // No permitir cantidades menores a 1

    // Actualiza los productos en el carrito y recalcula el total y la cantidad de productos
    const updatedProducts = allProducts.map(product => {
      if (product.id === productId) {
        const quantityDifference = newQuantity - product.quantity;
        setTotal(prevTotal => parseFloat((prevTotal + quantityDifference * product.price).toFixed(2)));
        setCountProducts(prevCount => prevCount + quantityDifference);
        return { ...product, quantity: newQuantity };
      }
      return product;
    });

    setAllProducts(updatedProducts);
  };

  // Función para eliminar un producto del carrito
  const onDeleteProduct = (product) => {
    // Filtra el producto eliminado del carrito
    const results = allProducts.filter(item => item.id !== product.id);
    setTotal(prevTotal => parseFloat((prevTotal - product.price * product.quantity).toFixed(2)));
    setCountProducts(prevCount => prevCount - product.quantity);
    setAllProducts(results);
  };

  // Función para vaciar el carrito con confirmación
  const onCleanCart = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      setAllProducts([]);
      setTotal(0);
      setCountProducts(0);
    }
  };

  // Función para alternar la visibilidad del carrito
  const handleCartToggle = () => {
    setActive(!active);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">Tech Shop</a>
          <div className="d-flex align-items-center">
            <div className="position-relative">
              <img
                src="/images/carro.png"
                alt="Carrito"
                className="icon-cart"
                style={{ width: '30px', cursor: 'pointer' }}
                onClick={handleCartToggle}
              />
              <div className="count-products bg-danger text-white rounded-circle position-absolute top-0 start-100 translate-middle p-1">
                <span id="contador-productos">{countProducts}</span>
              </div>
            </div>
            <div className={`dropdown-menu p-3 shadow-sm ${active ? 'd-block' : 'd-none'}`} style={{ minWidth: '300px', position: 'absolute', top: '100%', right: 0, zIndex: 1000, backgroundColor: 'white', border: '1px solid black' }}>
              {allProducts.length > 0 ? (
                <>
                  <div className="row-product">
                    {allProducts.map(product => (
                      <div className="cart-product d-flex justify-content-between align-items-center" key={product.id}>
                        <div className="info-cart-product d-flex align-items-center">
                          <img
                            src={product.image} 
                            alt={product.name}
                            className="img-thumbnail"
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          />
                          <div className="ms-2">
                            <span className="cantidad-producto-carrito">
                              <input
                                type="number"
                                value={product.quantity}
                                min="1"
                                onChange={(e) => updateProductQuantity(product.id, parseInt(e.target.value))}
                                className="form-control"
                                style={{ width: '80px' }}
                              />
                            </span>
                            <p className="titulo-producto-carrito mb-1">{product.name}</p>
                            <span className="precio-producto-carrito">${product.price}</span>
                          </div>
                        </div>
                        <img
                          src="/images/cerrar.png"
                          alt="Cerrar"
                          className="icon-close"
                          style={{ width: '20px', cursor: 'pointer' }}
                          onClick={() => onDeleteProduct(product)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="cart-total my-2">
                    <h5>Total: <span className="total-pagar">${total.toFixed(2)}</span></h5>
                  </div>
                  <button className="btn btn-danger w-100" onClick={onCleanCart}>
                    Vaciar Carrito
                  </button>
                </>
              ) : (
                <p className="cart-empty text-center">El carrito está vacío</p>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};




