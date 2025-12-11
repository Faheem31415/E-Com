import userModel from "../models/userModel.js";
import verifyEmailModel from "../models/verifyEmailModel.js";
import verifyPasswordModel from "../models/verifyPasswordModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendMail.js";
import { createToken } from "../utils/generateToken.js";
import { createResetToken } from "../utils/generateToken.js";

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    if (!user.verified) {
      return res.json({
        success: true,
        verified: false,
        message: "Email not verified",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    return res.json({ success: true, token, verified: true });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password too short" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashed,
      verified: false,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    //otp verification
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    const newVerify = new verifyEmailModel({
      email,
      otp,
      expiresAt,
    });

    await newVerify.save();

    await sendEmail(
      email,
      "🔐 Email Verification (OTP Inside)",
      `
    <div style="max-width:600px;margin:auto;padding:20px;font-family:Arial;background:#f4f4f4;border-radius:10px;">
      <div style="background:white;padding:30px;border-radius:10px;">
        <h2 style="text-align:center;color:#333;">Verify Your Email</h2>

        <p>Hello <strong>${email}</strong>,<br><br>
        Thank you for registering. Your OTP is:</p>

        <h1 style="letter-spacing:8px;text-align:center;color:#4a90e2;">${otp}</h1>

        <p style="text-align:center;color:#777;">This OTP expires in 5 minutes.</p>
      </div>
    </div>
  `
    );

    return res.json({
      success: true,
      message: "Verification email sent",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// OTP VERIFY
const otpVerify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const verifyUser = await verifyEmailModel.findOne({ email });
    if (!verifyUser) {
      return res.json({ success: false, message: "OTP not found" });
    }
    if (verifyUser.expiresAt < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }
    if (verifyUser.otp !== otp) {
      return res.json({ success: false, message: "Incorrect OTP" });
    }
    await userModel.findOneAndUpdate({ email }, { verified: true });
    await verifyEmailModel.deleteOne({ email });

    return res.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const resetToken = createResetToken(user._id);

    const key = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    const newpasswordVerify = new verifyPasswordModel({
      email,
      key,
      expiresAt,
    });

    await newpasswordVerify.save();

    await sendEmail(email, "Reset Key", `Your key: ${key}`);

    return res.json({
      success: true,
      message: "Password reset email sent.",
      token: resetToken,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// VERIFY RESET PASSWORD
const verifyPassword = async (req, res) => {
  try {
    const { email, key } = req.body;
    const verifyUser = await verifyPasswordModel.findOne({ email });

    if (!verifyUser) {
      return res.json({ success: false, message: "Key Not Found" });
    }
    if (verifyUser.expiresAt < Date.now()) {
      return res.json({ success: false, message: "Session expired" });
    }
    if (verifyUser.key !== key) {
      return res.json({ success: false, message: "Incorrect Key" });
    }

    await verifyPasswordModel.deleteOne({ email });

    return res.json({ success: true, message: "KEY verified successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    await userModel.findByIdAndUpdate(decoded.id, { password: hashed });

    return res.json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

//route for admin login
const adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginUser,
  registerUser,
  adminLogin,
  otpVerify,
  forgotPassword,
  resetPassword,
  verifyPassword,
};
