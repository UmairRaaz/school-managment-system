import dbConnect from "@/app/libs/dbConnect";
import { NotificationModel } from "@/app/models/notificationModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { uploads } from "@/app/libs/cloudinary";

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
        console.log(formDataObject)
        if (formDataObject.image) {
            const { image } = formDataObject;
            let notificationImage;
            if (Array.isArray(image) && image.length > 0) {
                notificationImage = image[1];  
            } else {
                notificationImage = image;
            }
            if (notificationImage) {
                const uploadedImage = await uploads(notificationImage, "image");
                formDataObject.image = uploadedImage.secure_url;
            }
        }

        const notification = await NotificationModel.create(formDataObject);
        console.log(notification);

        return NextResponse.json({ message: "Notification added successfully", success: true }, { status: 200 });
    } catch (error) {
        console.error('Error adding notification:', error);
        return NextResponse.json({ message: "Notification addition failed", success: false }, { status: 400 });
    }
}
