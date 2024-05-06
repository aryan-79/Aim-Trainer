import { Schema, models, model } from "mongoose";

const statSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

const Stat = models.Stat || model("Stat", statSchema);
export default Stat;
