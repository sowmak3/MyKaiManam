import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized, Login again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Put userId in req.body, as you did originally
    if (!req.body) req.body = {};
    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.log("❌ Auth error:", error);
    res.json({ success: false, message: "Error in auth" });
  }
};

export default authMiddleware;
