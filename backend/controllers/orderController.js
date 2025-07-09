import orderModel from "../models/orderModel.js";

const createOrder = async (req, res) => {
  try {
    let { items, amount, address, userId } = req.body; // ✅ Using req.body.userId as before

    items = items.filter((item) => item.quantity > 0 && item.name !== "Unknown");

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      status: "Food Processing",
      payment: false,
    });

    await newOrder.save();
    res.status(200).json({ success: true, message: "Order created", data: newOrder });
  } catch (error) {
    console.log("Create order error:", error);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};

const userOrders = async (req, res) => {
  try {
    const userId = req.body.userId; // ✅ Same style

    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log("Get user orders error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

// Listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({success:true, data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false, message: "Error"})
    
  }
}


// api for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


export { createOrder, userOrders, listOrders, updateStatus };
