const express = require("express");
const router = express.Router();
const { searchBus } = require("../controllers/searchBusController");
const upload = require("../multer/multerConfig");
const { addNewBus } = require("../controllers/searchBusController");

router.post("/add", upload.single("busImage"), addNewBus);
router.post("/searchbus", searchBus);

module.exports = router;

