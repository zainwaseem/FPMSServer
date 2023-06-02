import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import employeeRoutes from "./routes/EmployeeRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";
import inventoryRoutes from "./routes/InventoryRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import stripe from "./routes/stripe.js";
import employeeWorkingRoutes from "./routes/EmpworkRoutes.js";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));

import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: "dlf1jfgzk",
  api_key: "137343997832747",
  api_secret: "f4C1Mhxz1n7ItBmGvPjTF9oXz6M",
});

const corsOptions = {
  origin: "http://localhost:3000",
  // origin: "*",
  credentials: true,
  //access-control-allow-credentials:true
  // optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());
connectDB();

// Error Handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong!";

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

//Routes
app.use("/", userRoutes); //Authentication Zain && User routes Taqasur
app.use("/", employeeRoutes); //Haseeb ul hassan
app.use("/", productRoutes); //Zain Waseem
app.use("/", OrderRoutes); //Zain Waseem
app.use("/api/stripe", stripe); //Zain Waseem
app.use("/", inventoryRoutes); //Zain Waseem Taqasur
app.use("/", contactRoutes); //Hasseb ul Hassan
app.use("/", employeeWorkingRoutes); //Hasseb ul Hassan

app.get("*", (req, res) => {
  res.send(`Please Login to access the routes`);
});
// Creating Express Server
const PORT = process.env.PORT || 5000;
// const port = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
