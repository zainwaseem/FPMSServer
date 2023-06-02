import mongoose from "mongoose";

const EmpWorkingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    todayWorking: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("EmpWorking", EmpWorkingSchema);
