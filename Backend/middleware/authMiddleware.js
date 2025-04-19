const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = (req, res, next) => {
  let token =
    req.cookies.authtoken ||
    (req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null);

  console.log("Received Token:", token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    req.user = decoded;

    return res.status(200).json({
      message: "User authenticated",
      user: decoded,
    });
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

const authenticateAdmin = (req, res, next) => {
  const token = req.cookies.authtoken;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admin access only." });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authenticateUser, authenticateAdmin };
