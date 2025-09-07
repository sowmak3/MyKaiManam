import express from "express";
import { addToCart, removeFromCart, getCart, clearCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add",    authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/get",    authMiddleware, getCart);

// NEW: clear the cart (call this after order success)
cartRouter.post("/clear",  authMiddleware, clearCart);

export default cartRouter;
