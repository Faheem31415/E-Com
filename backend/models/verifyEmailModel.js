import mongoose from "mongoose";

const verifySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    otp: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const verifyEmailModel =
  mongoose.models.verifyEmail || mongoose.model("verifyEmail", verifySchema);

export default verifyEmailModel;
