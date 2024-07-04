import mongoose from "mongoose";
const { Schema } = mongoose;

const SubjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  totalMarks: {
    type: Number,
    required: true,
    min: 0
  },
  minMarks: {
    type: Number,
    required: true,
    min: 0
  },
  obtainedMarks: {
    type: Number,
    required: true,
    min: 0
  }
}, { _id: false });


const ResultSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
  },
  fatherName: {
    type: String,
    required: true,
    trim: true
  },
  class: {
    type: String,
    required: true,
    trim: true
  },
  section: {
    type: String,
    required: true,
    trim: true
  },
  rollNumber: {
    type: String,
    required: true,
    trim: true
  },
  cast: {
    type: String,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    required: true
  },
  note: {
    type: String,
    trim: true
  },
  subjects: {
    type: [SubjectSchema],
    validate: {
      validator: function(v) {
        // At least one subject should be filled
        return v && v.length > 0 && v.some(subject => subject.name.trim() !== "" || subject.totalMarks > 0 || subject.minMarks > 0 || subject.obtainedMarks > 0);
      },
      message: 'At least one subject should be filled.'
    }
  },
  isPass: {
    type: Boolean,
    required: true
  }
}, {timestamps: true});


export const Result = mongoose.models?.Result || mongoose.model('Result', ResultSchema);


