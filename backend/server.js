import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// ✅ Load environment variables
dotenv.config();

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

// test route
app.get("/", (req, res) => {
    res.send("API Working");
});

// start server
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
