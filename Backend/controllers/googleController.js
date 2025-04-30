require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // استيراد النموذج
const client = new OAuth2Client(process.env.CLIENT_ID);

exports.googleSignIn = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const [user, created] = await User.findOrCreate({
      where: { google_id: payload.sub },
      defaults: {
        email: payload.email,
        full_name: payload.name,
        password: "password",
        role: "user",
      },
    });
    const jwtToken = jwt.sign(
      { id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("authToken", jwtToken, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    res.send({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
