import foodModel from "../models/foodModel.js";
import fs from 'fs'

export const addFood = async (req, res) => {
  const image_filename = req.file?.filename;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};



//all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

//remove food item
const removeFood = async (req, res) => {
  try {
    console.log("📥 Full request body:", req.body); // Show everything sent

    const id = req.body.id;
    if (!id) {
      console.log("❌ ID missing from request");
      return res.json({ success: false, message: "No ID provided" });
    }

    const food = await foodModel.findById(id);
    console.log("🔍 foodModel.findById result:", food);

    if (!food) {
      console.log("❌ Food not found in DB");
      return res.json({ success: false, message: "Food not found" });
    }

    if (food.image) {
      const imagePath = `uploads/${food.image}`;
      fs.unlink(imagePath, (err) => {
        if (err) console.log("⚠️ Image delete error:", err);
        else console.log("🗑️ Image deleted:", imagePath);
      });
    }

    await foodModel.findByIdAndDelete(id);
    console.log("✅ Food deleted from MongoDB");

    return res.json({ success: true, message: "Food Removed" });

  } catch (error) {
    console.log("❌ Catch block error:", error);
    return res.json({ success: false, message: "Error" });
  }
};






export { listFood, removeFood };
