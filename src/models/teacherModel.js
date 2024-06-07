import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    classes: {
        type: [String],
        default: []
    },
    subjects: {
        type: [String],
        default: []
    },
    role: {
        type: String,
        default : "teacher"
    }
});

export const TeacherModel = mongoose.models?.TeacherModel || mongoose.model("TeacherModel", TeacherSchema);
