const express = require("express");
const multer = require("multer");
const { registerDriver } = require("../controllers/driverConroller");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post(
  "/register",
  upload.fields([{ name: "license_img" }, { name: "non_conviction_img" }]),
  registerDriver
);

module.exports = router;
