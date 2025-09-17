import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image, customStyle }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const qty = Number(cartItems?.[id] || 0);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className={`food-item-image ${customStyle || ""}`} src={image} alt={name} />

        {!qty ? (
          <img
            className="add"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(id);
            }}
            src={assets.add_icon_white}
            alt="add"
          />
        ) : (
          <div className="food-item-counter">
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="remove" />
            <p>{qty}</p>
            <img
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(id);
              }}
              src={assets.add_icon_green}
              alt="add"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <p className="food-item-name">{name}</p>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">
          ₹{price}
          <span className="food-item-weight"> /500g</span>
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
