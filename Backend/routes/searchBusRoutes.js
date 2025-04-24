const express = require("express");
const router = express.Router();
const { searchBus } = require("../controllers/searchBusController");
const upload = require("../multer/multerConfig");
const { addNewBus } = require("../controllers/searchBusController");
const { authenticateUser } = require("../middleware/authMiddleware");

router.post("/add", upload.single("busImage"), addNewBus);
router.post("/searchbus" ,searchBus);

router.get("/check", authenticateUser, (req, res) => {
    res.status(200).json({ message: "User is authenticated" });
  });

module.exports = router;
