import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import Header from "./Header";
import Footer from "./Footer";

const Cusomterhome = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load products + initial cart count
  useEffect(() => {
    fetch("http://localhost:9090/api/products", { credentials: "include" })
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(err => console.log("Error fetching products:", err));

    // Load the cart count
    fetch("http://localhost:9090/api/cart/items", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setCartCount(data?.cart?.products?.length || 0);
      })
      .catch(() => {});
  }, []);

  // Add to Cart
  const handleAddToCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:9090/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      alert("Added to cart!");

      // 🔥 Increase cart count instantly
      setCartCount(prev => prev + 1);

    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  return (
    <div>
      <Header cartCount={cartCount} />  {/* 👈 pass cart count */}
      
      <ProductList 
        products={products}
        onAddToCart={handleAddToCart}
      />

      <Footer />
    </div>
  );
};

export default Cusomterhome;
