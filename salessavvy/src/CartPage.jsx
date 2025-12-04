import React, { useEffect, useState } from "react";
import "./assets/CartPage.css";
import Header from "./Header";
import Footer from "./Footer";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [overallPrice, setOverallPrice] = useState(0);
  const [username, setUsername] = useState("");
  const [subtotal, setSubtotal] = useState(0);


  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:9090/api/cart/items", {
          credentials: "include", 
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const data = await response.json();

       
        setCartItems(
          data?.cart?.products.map((item) => ({
            ...item,
            total_price: parseFloat(item.total_price).toFixed(2),
            price_per_unit: parseFloat(item.price_per_unit).toFixed(2),
          })) || []
        );

        setOverallPrice(
          parseFloat(data?.cart?.overall_total_price || 0).toFixed(2)
        );

        setUsername(data?.username || "");
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // Auto recalc subtotal
  useEffect(() => {
    const total = cartItems
      .reduce((total, item) => total + parseFloat(item.total_price), 0)
      .toFixed(2);

    setSubtotal(total);
  }, [cartItems]);

 
 const handleRemoveItem = async (productId) => {
  try {
    const response = await fetch(
      `http://localhost:9090/api/cart/remove/${productId}`,
      {
        method: "DELETE",
        credentials: "include", 
      }
    );

    if (!response.ok) {
      throw new Error("Failed to remove item");
    }

   
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product_id !== productId)
    );

  } catch (error) {
    console.error("Error removing item:", error);
  }
};



  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        handleRemoveItem(productId);
        return;
      }

      const response = await fetch("http://localhost:9090/api/cart/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, productId, quantity: newQuantity }),
      });

      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.product_id === productId
              ? {
                  ...item,
                  quantity: newQuantity,
                  total_price: (item.price_per_unit * newQuantity).toFixed(2),
                }
              : item
          )
        );
      } else {
        throw new Error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <>
      <Header />

      <div className="cart-container">
        <h1>Your Cart</h1>

        {cartItems.length === 0 ? (
          <h2>No items in cart</h2>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.product_id} className="cart-card">
                <img
                  src={
                    item.images?.[0] ||
                    "https://via.placeholder.com/150?text=No+Image"
                  }
                  alt={item.product_name}
                  className="cart-image"
                />

                <div className="cart-details">
                  <h3>{item.product_name}</h3>
                  <p>Price: ₹{item.price_per_unit}</p>

                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.product_id, item.quantity - 1)
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        handleQuantityChange(item.product_id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <p>Total: ₹{item.total_price}</p>

                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item.product_id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-summary">
              <h2>Subtotal: ₹{subtotal}</h2>
              <h2>Overall Price: ₹{overallPrice}</h2>

              <button className="checkout-btn">Checkout</button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default CartPage;
