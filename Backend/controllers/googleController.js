require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // استيراد النموذج
const client = new OAuth2Client(process.env.CLIENT_ID);

// تسجيل الدخول باستخدام Google وتخزين الـ JWT في الكوكيز
exports.googleSignIn = async (req, res) => {
  const { token } = req.body;

  try {
    // التحقق من token باستخدام Google API
    const ticket = await client.verifyIdToken({
      idToken: token, // استخدام الـ ID Token المرسل من الواجهة الأمامية
      audience: process.env.CLIENT_ID, // client ID من Google
    });

    const payload = ticket.getPayload(); // الحصول على بيانات المستخدم من Google

    // محاولة العثور على المستخدم أو إنشائه إذا لم يكن موجودًا
    const [user, created] = await User.findOrCreate({ 
      where: { google_id: payload.sub }, // التحقق من Google ID
      defaults: {
        email: payload.email,
        full_name: payload.name,
        password: "password",
        role:"user"
      },
    });

    // توليد الـ JWT
    const jwtToken = jwt.sign(
      { id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // تخزين الـ JWT في الكوكيز
    res.cookie("authtoken", jwtToken, {
      httpOnly: true, // لا يمكن الوصول إليها عبر JavaScript
      secure: false, // اجعلها true في بيئة الإنتاج
      maxAge: 3600000, // 1 ساعة
    });

    res.send({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
