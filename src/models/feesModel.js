import mongoose from "mongoose";
import { CounterModel } from "./counterModel";

const Schema = mongoose.Schema;

const FeeSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'StudentModel', required: true },
  isPaid: { type: Boolean, default: false },
  date: { type: Date },
  AdmissionFee: { type: Number, default: 0 },
  MonthlyFee: { type: Number },
  TuitionFee: { type: Number, default: 0 },
  Discount: { type: Number, default: 0 },
  FeeDescription: { type: String, default: "Monthly Fee" },
  Penalty: { type: Number, default: 0 },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  serialNumber: { type: Number, unique: true }
});

FeeSchema.pre('save', async function (next) {
  const fee = this;
  
  if (!this.date) {
    const monthIndex = new Date(Date.parse(this.month + " 1, " + this.year)).getMonth();
    const lastDayOfMonth = new Date(this.year, monthIndex + 1, 0).getDate();
    this.date = new Date(this.year, monthIndex, lastDayOfMonth);
  }

  if (this.isNew) {
    try {
      const counter = await CounterModel.findOneAndUpdate(
        { model: 'FeeModel', field: 'serialNumber' },
        { $inc: { count: 1 } },
        { new: true, upsert: true }
      );
      fee.serialNumber = counter.count;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});


export const FeeModel = mongoose.models?.FeeModel || mongoose.model('FeeModel', FeeSchema);
