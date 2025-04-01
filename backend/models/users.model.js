import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    instrument: {
      type: String,
    },
    role:{
      type: String,
      required: true,
      enum: ["admin","player"],
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
