import foodModel from "../models/foodModel.js";
import fs from 'fs';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';

// ✅ Function to add food
const addFood = async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "MyKaiManam" // optional folder name in your Cloudinary account
    });

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: result.secure_url // save Cloudinary URL
    });

    await food.save();

    // Delete local file after Cloudinary upload
    fs.unlink(req.file.path, (err) => {
      if (err) console.log("⚠️ Local file delete error:", err);
      else console.log("🗑️ Local file deleted after Cloudinary upload");
    });

    res.json({ success: true, message: "Food Added" });

  } catch (error) {
    console.log("❌ Cloudinary Upload Error:", error);
    res.json({ success: false, message: "Error adding food" });
  }
};

// ✅ Function to list all food
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log("❌ Error listing foods:", error);
    res.json({ success: false, message: "Error" });
  }
};

// ✅ Function to remove food
const removeFood = async (req, res) => {
  try {
    console.log("📥 Full request body:", req.body);

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

    // Optional: Remove local file if needed (mostly legacy — now using Cloudinary)
    if (food.image && food.image.startsWith("uploads/")) {
      const imagePath = food.image;
      fs.unlink(imagePath, (err) => {
        if (err) console.log("⚠️ Image delete error:", err);
        else console.log("🗑️ Local image deleted:", imagePath);
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

// ✅ Export functions
export { addFood, listFood, removeFood };
