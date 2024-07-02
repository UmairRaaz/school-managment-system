import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    addedBy: {
        type: String,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TeacherModel',
    },
    teacherName:{
        type: String,
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminModel',
    },
    class: {
        type: String,
    },
    section: {
        type: String,
    },
    subject: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    notificationFor: {
        type: String,
        required: true,
    },
    createdDate: {
        type: String,
    },
    createdDay: {
        type: String,
    }
}, { timestamps: true });

notificationSchema.pre('save', function (next) {
    const now = new Date();
    this.createdDate = now.toISOString().substring(0, 10);
    this.createdDay = now.toLocaleString('en-US', { weekday: 'long' });
    next();
});

export const NotificationModel = mongoose.models?.NotificationModel || mongoose.model("NotificationModel", notificationSchema);
