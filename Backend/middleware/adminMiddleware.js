const adminMiddleware = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access Denied (Admin Only)",
    });
  }
  console.log("Admin middleware running");
  console.log("User role:", req.user.role);
  next();
};

module.exports = adminMiddleware;
