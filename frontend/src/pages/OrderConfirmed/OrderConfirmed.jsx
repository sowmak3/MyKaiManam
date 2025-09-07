import React, { useContext } from "react";
import "./OrderConfirmed.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const OrderConfirmed = () => {
  const { clearCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleHome = async () => {
    await clearCart({ syncServer: false }); // already cleared earlier
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
