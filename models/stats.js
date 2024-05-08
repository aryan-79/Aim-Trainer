import { Schema, models, model } from "mongoose";

const statSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    avg: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Stat = models.Stat || model("Stat", statSchema);
export default Stat;
