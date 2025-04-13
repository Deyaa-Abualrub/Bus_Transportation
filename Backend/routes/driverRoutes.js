const express = require("express");
const multer = require("multer");
const { registerDriver ,signinDriver} = require("../controllers/driverConroller");
const router = express.Router();
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/");
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

router.post("/signin", signinDriver);

module.exports = router;
