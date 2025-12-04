import React from "react";
 import './assets/style.css'
const ProductList = ({ products, onAddToCart }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.product_id} className="product-card">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150";
            }}
          />

          <h3>{product.name}</h3>
          <p>₹{product.price}</p>

          <button onClick={() => onAddToCart(product.product_id)}>
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
