import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

const usersSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      validite: function (v) {
        return /^([a-z0-9_-]+)(@[a-z0-9-]+)(\.[a-z]+|\.[a-z]+\.[a-z]+)?$/is.test(
          v
        );
      },
      message: (props) => `${props.value} is not valid email`,
    },
    password: {
      type: String,
      minlength: [8, "8 characters must"],
    },
    role: {
      type: String,
      default: "user",
    },
    active: {
      type: String,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", usersSchema);
