import React, { createContext, useEffect, useState } from "react";
import { food_list as ASSET_FOOD_LIST } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  // Products (from assets; swap with fetch if you have backend list)
  const [food_list, setFoodList] = useState(ASSET_FOOD_LIST || []);

  // Cart
  const [cartItems, setCartItems] = useState({});
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      if (saved) setCartItems(JSON.parse(saved));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const qty = Number(prev[itemId] || 0);
      return { ...prev, [itemId]: qty + 1 };
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const qty = Number(prev[itemId] || 0);
      if (qty <= 1) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return { ...prev, [itemId]: qty - 1 };
    });
  };

  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem("cartItems");
  };

  // Auth
  const [token, setToken] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
  }, []);

  // Totals
  const findProduct = (id) =>
    food_list.find((p) => String(p._id || p.id) === String(id));
  const getTotalCartItems = () =>
    Object.values(cartItems).reduce((s, q) => s + (Number(q) || 0), 0);
  const getTotalCartAmount = () =>
    Object.entries(cartItems).reduce((sum, [id, qty]) => {
      const item = findProduct(id);
      return item ? sum + item.price * Number(qty || 0) : sum;
    }, 0);

  const ctx = {
    // data
    food_list,
    cartItems,
    token,

    // setters
    setFoodList,
    setCartItems,
    setToken,
    showLoginPopup,
    setShowLoginPopup,

    // actions
    addToCart,
    removeFromCart,
    clearCart,

    // selectors
    getTotalCartAmount,
    getTotalCartItems,
  };

  return <StoreContext.Provider value={ctx}>{children}</StoreContext.Provider>;
};

export default StoreContextProvider;