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
    notificationFor:{
        type: String,
        required: true,
    }
})

export const NotificationModel = mongoose.models?.NotificationModel || mongoose.model("NotificationModel", notificationSchema)