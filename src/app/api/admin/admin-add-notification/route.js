import dbConnect from "@/libs/dbConnect";
import { NotificationModel } from "@/models/notificationModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
    try {
        await dbConnect();
        let body = await req.json();
        console.log(body);

        // if (body.teacher) {
        //     body.teacher = mongoose.Types.ObjectId(body.teacher);
        // }
        // if (body.admin) {
        //     body.admin = mongoose.Types.ObjectId(body.admin);
        // }

        const notification = await NotificationModel.create(body);
        console.log(notification);

        return NextResponse.json({ message: "Notification added successfully", success: true }, { status: 200 });
    } catch (error) {
        console.error('Error adding notification:', error);
        return NextResponse.json({ message: "Notification addition failed", success: false }, { status: 400 });
    }
}
