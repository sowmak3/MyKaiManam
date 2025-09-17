import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, addToCart, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const rows = food_list.filter((p) => Number(cartItems[p._id || p.id] || 0) > 0);

  return (
    <div className="cart">
      <div className="cart-main">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>

          {rows.map((item) => {
            const key = String(item._id || item.id);
            const qty = Number(cartItems[key] || 0);

            return (
              <div key={key} className="cart-items-item">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>₹{item.price}</p>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button className="qty-btn" onClick={() => removeFromCart(key)}>
                    −
                  </button>
                  <p>{qty}</p>
                  <button className="qty-btn" onClick={() => addToCart(key)}>
                    +
                  </button>
                </div>

                <p>₹{item.price * qty}</p>
                <p className="cross" onClick={() => removeFromCart(key)}>
                  x
                </p>
              </div>
            );
          })}
        </div>

        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount()}</b>
            </div>
            <p className="delivery-note">
              🚚 Delivery charges will be paid directly to the delivery partner upon delivery.
            </p>
            <button onClick={() => navigate("/order")}>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
