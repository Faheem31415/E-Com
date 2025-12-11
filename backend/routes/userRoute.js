import {
  loginUser,
  registerUser,
  adminLogin,
  otpVerify,
  forgotPassword,
  resetPassword,
  verifyPassword
} from "../controllers/userController.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
//otp verification
userRouter.post("/verify-otp", otpVerify);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);
userRouter.post('/verify-Password/:token',verifyPassword)

export default userRouter;
