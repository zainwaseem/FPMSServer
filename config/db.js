import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(
      "mongodb+srv://zainwaseem:9wDAP1TC0W2xyMAE@cluster0.dx631ev.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log(`Datebase Connected`))
    .catch((error) => console.log(error.message));
};
export default connectDB;

// mongodb username & Password
// zainwaseem
// 9wDAP1TC0W2xyMAE
