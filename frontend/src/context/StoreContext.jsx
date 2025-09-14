import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const url = import.meta.env.VITE_SERVER_URL?.replace(/\/$/, "");
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const addToCart = async (itemId) => {
    if (!token) {
      setShowLoginPopup(true);
      return;
    }
    try {
      // Clear the cart cleared flag when adding new items
      localStorage.removeItem("cartCleared");
      await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
      await fetchCartData();
    } catch (error) {
      console.log("Add to cart error:", error.response?.data?.message || error.message);
      alert("Please log in again or check your token.");
    }
  };

  const removeFromCart = async (itemId) => {
    if (!token) return alert("Please log in to remove items from cart.");
    try {
      await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
      await fetchCartData();
    } catch (error) {
      console.log("Remove from cart error:", error.response?.data?.message || error.message);
      alert("Please log in again or check your token.");
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.log("Fetch food list error:", error.response?.data?.message || error.message);
    }
  };

  const fetchCartData = async () => {
    if (!token) return;
    // Don't fetch if cart was recently cleared
    if (localStorage.getItem("cartCleared") === "true") {
      localStorage.removeItem("cartCleared");
      return;
    }
    try {
      const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      }
    } catch (error) {
      console.log("Fetch cart data error:", error.response?.data?.message || error.message);
    }
  };

  // 🔥 Clear cart in state AND on server
  const clearCart = async ({ syncServer = true } = {}) => {
    try {
      setCartItems({});
      localStorage.removeItem("cartItems"); // if ever used locally
      if (syncServer && token) {
        const resp = await axios.post(`${url}/api/cart/clear`, {}, { headers: { token } });
        if (!resp.data?.success) {
          console.warn("Server clear failed:", resp.data);
        }
      }
      // Prevent refetching cart data after clearing
      localStorage.setItem("cartCleared", "true");
    } catch (error) {
      console.log("Clear cart error:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchFoodList();
      const localToken = localStorage.getItem("token");
      if (localToken) setToken(localToken);
    })();
  }, []);

  useEffect(() => {
    if (token) fetchCartData();
  }, [token]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    clearCart, // 👈 expose
    showLoginPopup,
    setShowLoginPopup,
  };

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
};

export default StoreContextProvider;
