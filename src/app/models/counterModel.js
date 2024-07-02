import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CounterSchema = new Schema({
  model: { type: String, required: true },
  field: { type: String, required: true },
  count: { type: Number, default: 0 },
});

export const CounterModel = mongoose.models?.CounterModel || mongoose.model('CounterModel', CounterSchema);
