const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const contactMessage = require("./routes/contactMessageRoutes")

dotenv.config();

const app = express();
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/bus", userRoutes);
app.use("/bus", contactMessage);
app.use("/auth", userRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
