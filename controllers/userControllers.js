import User from "../models/userModel.js";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const register = async (req, res, next) => {
  try {
    const { name, email, password, role, active } = req.body;
    if (name.match(/[0-9]/)) {
      return res.json({
        message: "Name can`t be a number",
      });
    }
    if (!name || !email || !password) {
      return res.json({
        message: "Please fill out the fields.",
      });
    }
    if (role == "role") {
      return res.json({
        message: "Select a role please.",
      });
    }
    if (password.length < 8) {
      return res.json({ message: "Password must be at least 8 characters" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.json({ message: "Email already exists" });
    }
    // const hashpass = await bcrypt.hash(req.body.password, 10);
    // console.log(hashpass);

    const newUser = new User({
      name,
      email,
      password,
      role,
      active,
    });
    const user = await newUser.save();
    res.status(200).json({ message: `User added successfully` });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        message: "Please fill out the fields.",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "User not registered",
      });
    }
    // const isMatchedPassword = await bcrypt.compare(password, user.password);
    if (user.password != password)
      return res.json({ message: "Email or Password is incorrect" });
    // console.log(user.active)
    if (user.active == "false") {
      return res.json({ message: "Your Account has been Deactivated" });
    }
    //  console.log(`matched`);

    const token = jwt.sign({ id: user._id }, "mysupersecret786", {
      expiresIn: "5d",
    });

    return res.cookie("token", token, { httpOnly: true }).json({
      token: `You are logged in`,
    });
  } catch (error) {
    next(error);
  }
};
const getALLUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    // .sort({ name: 1 });

    return res.json(users);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  if (req.cookies)
    return res
      .cookie("token", "", { httpOnly: true, expires: new Date(0) })
      .status(200)
      .json({ message: "Successfully logged out 😏" });
  else {
    return res.json("error in logging you out");
  }
};

const getUser = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Not found" });
  }
  try {
    const user = await User.findById(req.params.id);
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { name, role, email, password, active } = req.body;
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Not found" });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        password,
        role,
        active,
      },
      { new: true }
    );
    return res.json({ message: `User has been updated` });
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  // const { _id } = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Not found" });
  }

  try {
    const daletedUser = await User.findByIdAndDelete(req.params.id);
    // console.log(daletedUser)
    return res.json({ message: `User has been deleted` });
  } catch (error) {
    next(error);
  }
};
const loggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);
    const decode = jwt.verify(token, "mysupersecret786");
    const id = decode.id;
    req.user = await User.findById(id);

    return res.send(req.user.role);
    // res.send(true);
  } catch (err) {
    return res.json(false);
  }
};

// const deactivateUser = async () => {
//   const { active } = req.body;
// };
export {
  register,
  login,
  getALLUsers,
  logout,
  getUser,
  updateUser,
  deleteUser,
  loggedIn,
  // deactivateUser,
};
