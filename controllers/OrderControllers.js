import mongoose from "mongoose";
import Order from "../models/OrderModel.js";
import Inventory from "../models/InventoryModel.js";

const AddOrder = async (req, res, next) => {
  const userID = req.user._id;
  // console.log(req.body);
  try {
    const newOrder = new Order({ userID, orderedProducts: req.body.cartItems });
    await newOrder.save();
    let perPair = 25;
    const requiredInventory = perPair * req.body.cartTotalQuantity;
    const getInventory = await Inventory.find();
    const dblength = getInventory[0].length;
    let stockInventory = getInventory[0].length - requiredInventory;

    // console.log(stockInventory);
    const stockInventoryID = getInventory[0]._id;
    if (dblength >= requiredInventory) {
      const updateInventoryModel = await Inventory.findByIdAndUpdate(
        stockInventoryID,
        {
          length: stockInventory,
        }
      );
    } else {
      const newInventoryOrder = new Inventory({
        length: requiredInventory,
        purchasedPrice: req.body.cartTotalQuantity * 100,
        category: getInventory[0].category,
        material: getInventory[0].material,
        quantity: req.body.cartTotalQuantity,
      });
      await newInventoryOrder.save();
      return res.json({
        message: "New Inventory order Generated Placed successfully",
      });
      // console.log(`Stock is not Available`);
    }

    return res.status(200).json({
      message: "Order Placed successfully",
    });
  } catch (error) {
    next(error);
  }
};

// const getAllOrders = async (req, res, next) => {
//   try {
//     if (req.user.role == "owner") {
//       const orders = await Order.find().sort({ status: -1 });
//       return res.json(orders);
//     }
//     const orders = await Order.find({ userID: req.user._id }).sort({
//       status: -1,
//     });
//     return res.json(orders);
//   } catch (error) {
//     next(error);
//   }
// };
const getAllOrders = async (req, res, next) => {
  try {
    if (req.user.role == "owner") {
      // const orders = await Order.aggregate([
      //   {
      //     $project: {
      //       _id: 1,
      //       status: 1,
      //       orderedProducts: 1,
      //       createdAt: 1,
      //       order: {
      //         $cond: {
      //           if: { $eq: ["$status", "pending"] },
      //           then: 1,
      //           else: {
      //             $cond: {
      //               if: { $eq: ["$status", "progress"] },
      //               then: 2,
      //               else: 3,
      //             },
      //           },
      //         },
      //       },
      //     },
      //   },
      //   { $sort: { order: 1 } },
      //   { $project: { _id: 1, orderedProducts: 1, status: 1 } },
      // ]);

      const orders = await Order.find();
      // const orderedPairQuantity = orders.orderedProducts[0].cartTotalQuantity;
      // const orderedPairTotalAmount = orders.orderedProducts[0].cartTotalAmount;
      // console.log(orderedPairTotalAmount);
      // console.log(orderedPairQuantity);
      // console.log(orders[0].orderedProducts[0].cartTotalAmount);
      return res.json(orders);
    }
    const orders = await Order.find({ userID: req.user._id }).sort({
      status: -1,
    });
    return res.json(orders);
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.json({ message: "Loading..." });
  }
  try {
    await Order.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Order Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
const updateOrder = async (req, res, next) => {
  const { status } = req.body;
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.json({ message: "Loading..." });
  }
  try {
    await Order.findByIdAndUpdate(req.params.id, {
      status,
    });

    return res.json({
      message: "Order Status updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export { AddOrder, getAllOrders, deleteOrder, updateOrder };
