const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const googleRoutes = require("./routes/googleRoutes");
const contactMessage = require("./routes/contactMessageRoutes");
const searchBus = require("./routes/searchBusRoutes");
const checkout = require("./routes/checkoutRoutes");
const passport = require("passport");
const session = require("express-session");
const driverRoutes = require("./routes/driverRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const testimonials = require("./routes/testimonialsRoutes");
const driverProfile = require("./routes/diverProfileRoutes");

dotenv.config();

const app = express();
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use('/bus', testimonials);
app.use("/bus", contactMessage);
app.use("/bus", searchBus);
app.use("/bus", checkout);
app.use("/bus/auth/driver", driverRoutes);
app.use("/auth", userRoutes);
app.use("/auth", googleRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/driver", driverProfile);

app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));

const User = require("../Backend/models/User");
const Testimonial = require("../Backend/models/Testimonials");

User.hasMany(Testimonial, { foreignKey: "user_id", as: "testimonial" });
Testimonial.belongsTo(User, { foreignKey: "user_id", as: "User" });

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
