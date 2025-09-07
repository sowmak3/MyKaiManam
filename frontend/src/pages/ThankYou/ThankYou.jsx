import React, { useContext } from "react";
import "./ThankYou.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const ThankYou = () => {
  const totalAmount = localStorage.getItem("finalAmount");
  const { clearCart } = useContext(StoreContext);

  const handlePaid = async () => {
    // Safety net; main clear happens in PlaceOrder
    await clearCart({ syncServer: false });
    localStorage.removeItem("finalAmount");
    window.location.href = "/order-confirmed";
  };

  return (
    <div className="thank-you-container">
      <h1>Please make the payment</h1>
      <p>Use the QR code or UPI ID shown below to complete your payment.</p>
      {totalAmount && <h2 style={{ margin: "15px 0", color: "#333" }}>Total Amount: ₹{totalAmount}</h2>}
      <img src={assets.upiQR} alt="UPI QR" className="upi-qr" />
      <h2>UPI ID: srinidhichellappa@oksbi</h2>
      <p className="optional-text">
        Optionally, you can send your payment confirmation to WhatsApp: <b>+91 9790921516</b>.
      </p>
      <button onClick={handlePaid} className="paid-button">Payment Completed</button>
    </div>
  );
};

export default ThankYou;
