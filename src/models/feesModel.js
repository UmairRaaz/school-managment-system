import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FeeSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'StudentModel', required: true },
  isPaid: { type: Boolean, default: false },
  date: { type: Date },
  month: { type: String, required: true },
  year: { type: Number, required: true },
});

FeeSchema.pre('save', function (next) {
  if (!this.date) {
    const monthIndex = new Date(Date.parse(this.month + " 1, " + this.year)).getMonth();
    this.date = new Date(this.year, monthIndex);
  }
  next();
});

export const FeeModel = mongoose.models?.FeeModel || mongoose.model('FeeModel', FeeSchema);
