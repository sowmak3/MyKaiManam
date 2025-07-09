import express from "express";
import { createOrder, userOrders, listOrders, updateStatus } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/create", authMiddleware, createOrder);
router.post("/userorders", authMiddleware, userOrders);
router.get('/list', listOrders)
router.post("/status", updateStatus)

export default router;
