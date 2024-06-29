import dbConnect from "@/libs/dbConnect";
import { NotificationModel } from "@/models/notificationModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { uploads } from "@/libs/cloudinary";

export async function POST(req) {
    try {
        await dbConnect();

        let body = await req.formData();
        const formDataObject = {};

        // Correct the loop to read entries from body
        for (const [key, value] of body.entries()) {
            if (formDataObject[key]) {
                if (!Array.isArray(formDataObject[key])) {
                    formDataObject[key] = [formDataObject[key]];
                }
                formDataObject[key].push(value);
            } else {
                formDataObject[key] = value;
            }
        }

     
        const { image } = formDataObject;
        let notificationImage;

        // Assuming image is stored as an array; adjust index as needed
        if (Array.isArray(image) && image.length > 0) {
            notificationImage = image[1];
        } else {
            notificationImage = image;
        }
        console.log(notificationImage)
        if (notificationImage) {
            const uploadedImage = await uploads(notificationImage, "image");
            formDataObject.image = uploadedImage.secure_url;
        }

        // Create notification with formDataObject
        const notification = await NotificationModel.create(formDataObject);
        console.log(notification);

        return NextResponse.json({ message: "Notification added successfully", success: true }, { status: 200 });
    } catch (error) {
        console.error('Error adding notification:', error);
        return NextResponse.json({ message: "Notification addition failed", success: false }, { status: 400 });
    }
}