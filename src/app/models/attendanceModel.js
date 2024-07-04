import mongoose from 'mongoose';

const { Schema } = mongoose;

const attendanceSchema = new Schema({
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  students: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
      },
      rollNumber: {
        type: String,
        required: true,
      },
      isPresent: {
        type: Boolean,
        required: true,
      },
    },
  ],
}, {timestamps: true});

export const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);

