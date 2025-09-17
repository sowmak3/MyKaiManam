import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // you’re using a custom header named "token" — keep that
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized, login again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // robustly pull the user id from the token payload
    const userId = decoded.id || decoded._id || decoded.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Invalid token payload" });
    }

    // put it in both places so any controller style works
    req.user = { id: userId };
    if (!req.body) req.body = {};
    req.body.userId = userId;

    next();
  } catch (err) {
    console.error("❌ Auth error:", err.message);
    return res.status(401).json({ success: false, message: "Error in auth" });
  }
};

export default authMiddleware;
