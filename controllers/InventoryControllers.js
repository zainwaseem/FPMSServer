import mongoose from "mongoose";
import Inventory from "../models/InventoryModel.js";

export const placeInevtory = async (req, res, next) => {
  try {
    const { length, purchasedPrice, category, material, quantity } = req.body;
    if (!material || !purchasedPrice || !category || !quantity || !length) {
      return res.json({
        message: "Please fill all fields",
      });
    }
    // return true if exist othervise false
    const existMaterial = await Inventory.findOne({ category });
    if (existMaterial) {
      if (existMaterial.category === category) {
        if (existMaterial.length >= length) {
          console.log(`Inventory already exists`);
          return res.json({ message: "Inventory already exists" });
        }
      }
    }
    const newInventoryOrder = new Inventory({
      length,
      purchasedPrice,
      category,
      material,
      quantity,
    });
    await newInventoryOrder.save();
    return res.json({ message: "New Inventory order Placed successfully" });
  } catch (error) {
    next(error);
  }
};

export const getALLInventroies = async (req, res, next) => {
  try {
    const inventory = await Inventory.find();
    // .sort({ name: 1 })
    return res.json(inventory);
  } catch (error) {
    next(error);
  }
};

export const deleteInventory = async (req, res, next) => {
  // const { _id } = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.json({ message: "loading..." });
  }

  try {
    await Inventory.findByIdAndDelete(req.params.id);
    return res.json({ message: `Inventory has been deleted` });
  } catch (error) {
    next(error);
  }
};

export const updateInventory = async (req, res) => {
  const { length, purchasedPrice, category, material, quantity } = req.body;

  if (!material || !purchasedPrice || !category || !length || !quantity) {
    return res.json({ message: `Please fill the required fields` });
  }
  try {
    await Inventory.findByIdAndUpdate(req.params.id, {
      length,
      purchasedPrice,
      category,
      material,
      quantity,
    });
    return res.status(200).json({ message: `Inventory Added Successfully...` });
  } catch (error) {
    next(error);
  }
};
