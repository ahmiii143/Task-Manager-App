import mongoose, { modelNames, mongo } from "mongoose";
const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const ToDo = mongoose.model("ToDo", todoSchema);
