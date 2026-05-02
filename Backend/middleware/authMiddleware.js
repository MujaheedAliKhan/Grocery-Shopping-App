// 🧠 What this does

// 👉 Reads token from request
// 👉 Verifies it
// 👉 Adds user info:

// req.user = {
//   id: "...",
//   role: "admin"
// }

const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token, Access Denied",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECREAT);
    req.user = decoded; //contians id + role
    console.log("Auth middleware running");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;
