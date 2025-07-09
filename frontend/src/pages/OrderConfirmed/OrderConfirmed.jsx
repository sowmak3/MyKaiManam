import React, { useContext } from "react";
import "./OrderConfirmed.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const OrderConfirmed = () => {
  const { setCartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleHome = () => {
    // ✅ Clear cart state
    setCartItems({});
    // ✅ Clear local storage cart
    localStorage.removeItem("cartItems");
    // Navigate home
    navigate("/");
  };

  return (
    <div className="order-confirmed-container">
      <h1>🎉 Thank You for Your Order!</h1>
      <p>Your order has been placed successfully.</p>
      <p>We will confirm it on WhatsApp within 30 minutes.</p>
      <button onClick={handleHome}>Return to Home</button>
    </div>
  );
};

export default OrderConfirmed;
