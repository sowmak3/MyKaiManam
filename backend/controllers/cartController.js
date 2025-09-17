import userModel from "../models/userModel.js";

// Prefer auth middleware; fallback to body (legacy)
const getUserId = (req) => req.user?.id || req.user?._id || req.body.userId;

// Normalize Map/Object to a plain object for JSON
const toPlain = (cart) => {
  if (!cart) return {};
  if (cart instanceof Map) return Object.fromEntries(cart.entries());
  // Mongoose doc can behave like POJO; spreading is ok
  return { ...cart };
};

// ---------- ADD (atomic increment) ----------
export const addToCart = async (req, res) => {
  try {
    const userId = getUserId(req);
    const itemId = String(req.body.itemId || "").trim();
    const qty = Math.max(1, Number(req.body.qty || 1));

    if (!userId) return res.json({ success: false, message: "Unauthorized" });
    if (!itemId) return res.json({ success: false, message: "itemId required" });

    // Atomic increment; creates key if not present
    const updated = await userModel
      .findOneAndUpdate(
        { _id: userId },
        { $inc: { [`cartData.${itemId}`]: qty } },
        { new: true, projection: { cartData: 1 } }
      )
      .lean();

    return res.json({
      success: true,
      message: "Added to Cart",
      cartData: toPlain(updated?.cartData),
    });
  } catch (error) {
    console.log("Add to cart error:", error);
    return res.json({ success: false, message: "Error in add to cart" });
  }
};

// ---------- REMOVE (atomic: decrement or unset) ----------
export const removeFromCart = async (req, res) => {
  try {
    const userId = getUserId(req);
    const itemId = String(req.body.itemId || "").trim();

    if (!userId) return res.json({ success: false, message: "Unauthorized" });
    if (!itemId) return res.json({ success: false, message: "itemId required" });

    // Decrement 1
    await userModel.updateOne(
      { _id: userId },
      { $inc: { [`cartData.${itemId}`]: -1 } }
    );

    // If <= 0, remove the key
    const doc = await userModel.findById(userId).select("cartData").lean();
    const qty = Number((doc?.cartData ?? {})[itemId] ?? 0);
    if (qty <= 0) {
      await userModel.updateOne(
        { _id: userId },
        { $unset: { [`cartData.${itemId}`]: "" } }
      );
    }

    const updated = await userModel.findById(userId).select("cartData").lean();
    return res.json({
      success: true,
      message: "Removed from Cart",
      cartData: toPlain(updated?.cartData),
    });
  } catch (error) {
    console.log("Remove from cart error:", error);
    return res.json({ success: false, message: "Error removing from cart" });
  }
};

// ---------- GET ----------
export const getCart = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.json({ success: false, message: "Unauthorized" });

    const user = await userModel.findById(userId).select("cartData").lean();
    return res.json({ success: true, cartData: toPlain(user?.cartData) });
  } catch (error) {
    console.log("Get cart error:", error);
    return res.json({ success: false, message: "Error fetching cart" });
  }
};

// ---------- CLEAR ----------
export const clearCart = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.json({ success: false, message: "Unauthorized" });

    await userModel.updateOne({ _id: userId }, { $set: { cartData: {} } });
    const user = await userModel.findById(userId).select("cartData").lean();

    return res.json({ success: true, cartData: toPlain(user?.cartData) });
  } catch (error) {
    console.log("Clear cart error:", error);
    return res.json({ success: false, message: "Failed to clear cart" });
  }
};
