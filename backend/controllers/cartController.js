import userModel from "../models/userModel.js";

// Helper to resolve user id (prefer auth middleware)
const getUserId = (req) => req.user?.id || req.user?._id || req.body.userId;

// ADD item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = getUserId(req);
    const itemId = String(req.body.itemId || "").trim();
    const qty = Number(req.body.qty || 1);

    if (!userId) return res.json({ success: false, message: "Unauthorized" });
    if (!itemId) return res.json({ success: false, message: "itemId required" });

    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    const cartData = user.cartData || {};
    cartData[itemId] = (cartData[itemId] || 0) + (qty > 0 ? qty : 1);

    user.cartData = cartData;
    await user.save();

    return res.json({ success: true, message: "Added to Cart", cartData });
  } catch (error) {
    console.log("Add to cart error:", error);
    return res.json({ success: false, message: "Error in add to cart" });
  }
};

// REMOVE one unit of an item from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = getUserId(req);
    const itemId = String(req.body.itemId || "").trim();

    if (!userId) return res.json({ success: false, message: "Unauthorized" });
    if (!itemId) return res.json({ success: false, message: "itemId required" });

    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    const cartData = user.cartData || {};
    if (cartData[itemId] > 1) {
      cartData[itemId] -= 1;
    } else {
      // if 0 or undefined, ensure the key is removed
      delete cartData[itemId];
    }

    user.cartData = cartData;
    await user.save();

    return res.json({ success: true, message: "Removed from Cart", cartData });
  } catch (error) {
    console.log("Remove from cart error:", error);
    return res.json({ success: false, message: "Error removing from cart" });
  }
};

// GET cart
export const getCart = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.json({ success: false, message: "Unauthorized" });

    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    const cartData = user.cartData || {};
    return res.json({ success: true, cartData });
  } catch (error) {
    console.log("Get cart error:", error);
    return res.json({ success: false, message: "Error fetching cart" });
  }
};

// CLEAR cart (used after successful order)
export const clearCart = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.json({ success: false, message: "Unauthorized" });

    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    user.cartData = {}; // if your schema uses an array, change to []
    await user.save();

    return res.json({ success: true, cartData: user.cartData });
  } catch (error) {
    console.log("Clear cart error:", error);
    return res.json({ success: false, message: "Failed to clear cart" });
  }
};
