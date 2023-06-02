import mongoose from "mongoose";
const InventorySchema = new mongoose.Schema(
  {
    material: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    purchasedPrice: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    length: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Inventory", InventorySchema);
