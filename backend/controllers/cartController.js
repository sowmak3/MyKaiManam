import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
    try {
        // Fetch user data
        let userData = await userModel.findById(req.body.userId);

        // Check if user exists
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Get current cart data
        let cartData = userData.cartData || {};

        // Add or update item quantity
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        // Update user's cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.log("Add to cart error:", error);
        res.json({ success: false, message: "Error in add to cart" });
    }
};



// remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true, message:"Removed from Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }

};

// fetch user cart data
const getCart = async (req, res) => {
    try {
        // Find user
        let userData = await userModel.findById(req.body.userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Get cart data, or empty object if not present
        let cartData = userData.cartData || {};

        res.json({ success: true, cartData });
    } catch (error) {
        console.log("Get cart error:", error);
        res.json({ success: false, message: "Error fetching cart" });
    }
};


export { addToCart, removeFromCart, getCart };
