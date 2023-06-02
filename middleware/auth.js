import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({
      message: `You need to login to access this route`,
    });
  }
  var decoded = jwt.verify(token, "mysupersecret786");
  const id = decoded.id;
  req.user = await User.findById(id);
  next();
};
const isAuthorized = (...roles) => {
  
  return (req, res, next) => {
    // role !== req.user.role
    if (!roles.includes(req.user.role)) {
      return res.json({
        message: `${req.user.name} is not allowed to perform this operation`,
      });
    }
    next();
  };
};

export { isAuthenticated, isAuthorized };
