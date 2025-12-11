import mongoose from "mongoose";

const verifySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    key: {
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

const verifyPasswordModel =
  mongoose.models.verifyPassword ||
  mongoose.model("verifyPassword", verifySchema);

export default verifyPasswordModel;
