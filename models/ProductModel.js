import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    size: { type: String },
    img: {
      public_id: { type: String },
      secure_url: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
