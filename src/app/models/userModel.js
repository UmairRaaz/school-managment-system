import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    username : {
        type : String,
        uniquie : true,
        required: true,
    },
    password : {
        type : String,
        required: true,
    },
    name:{
        type : String,
    },
    email:{
        type : String,
        uniquie : true,
    },
    phoneNumber:{
        type : Number,
        uniquie : true,
    },
    role: {
        type: String,
        default : "admin"
    },
    image: {
        type : String
    }
}, {timestamps: true})

export const AdminModel = mongoose.models?.AdminModel || mongoose.model("AdminModel", AdminSchema)