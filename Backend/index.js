const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const contactMessage = require("./routes/contactMessageRoutes");
const searchBus = require("./routes/searchBusRoutes");
const checkout = require("./routes/checkoutRoutes");

dotenv.config();

const app = express();
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// app.use("/bus", userRoutes);
app.use("/bus", contactMessage);
app.use("/bus", searchBus);
app.use("/bus", checkout);
app.use("/auth", userRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
