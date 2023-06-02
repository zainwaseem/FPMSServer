import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userID: { type: String },
    orderedProducts: [],
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     userId: { type: String, required: true },
//     products: [
//       {
//         productId: {
//           type: String,
//         },
//         quantity: {
//           type: Number,
//           default: 1,
//         },
//       },
//     ],
//     amount: { type: Number, required: true },
//     status: { type: String, default: "pending" },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Order", orderSchema);
