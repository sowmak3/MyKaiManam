import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, url, token, setCartItems, food_list } = useContext(StoreContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  const handleOrder = async (e) => {
    e.preventDefault();

    const address = {
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zip,
      country,
      phone,
    };

    const orderedItems = Object.entries(cartItems)
      .filter(([id, quantity]) => quantity > 0)
      .map(([id, quantity]) => {
        const product = food_list.find((item) => item._id === id);
        return {
          id,
          name: product ? product.name : "Unknown",
          quantity,
        };
      });

    if (orderedItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      await fetch(`${url}/api/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({
          items: orderedItems,
          amount: getTotalCartAmount(),
          address,
        }),
      });

      // ✅ Save final amount
      const finalAmount = getTotalCartAmount();
      localStorage.setItem("finalAmount", finalAmount);

      // ✅ Clear cart in state and local storage
      setCartItems({});
      localStorage.removeItem("cartItems");

      navigate("/thank-you");
    } catch (error) {
      console.log(error);
      alert("Order failed! Please try again.");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form className="place-order" onSubmit={handleOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>

        <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Flat/House no, Building name, Street" value={street} onChange={(e) => setStreet(e.target.value)} required />

        <div className="multi-fields">
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
          <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required />
        </div>

        <div className="multi-fields">
          <input type="text" placeholder="Zip code" value={zip} onChange={(e) => setZip(e.target.value)} required />
          <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
        </div>

        <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount()}</b>
            </div>
            <p className="delivery-note">🚚 Delivery charges will be paid directly to the delivery partner upon delivery.</p>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
