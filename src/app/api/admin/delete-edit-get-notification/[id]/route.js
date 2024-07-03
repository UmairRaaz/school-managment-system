

import { uploads } from '@/app/libs/cloudinary';
import dbConnect from '@/app/libs/dbConnect';
import { NotificationModel } from '@/app/models/notificationModel';

import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const notification = await NotificationModel.findOneAndDelete({ _id: id });

        return NextResponse.json({ message: 'notification  Deleted', success: true }, { status: 200 });
    } catch (error) {
        console.error('Error deleting notification:', error);
        return NextResponse.json({ message: 'Deleting notification failed', success: false }, { status: 500 });
    }
}

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const notification = await NotificationModel.findOne({ _id: id });
        // console.log("GET Notifction DETAILS : ", notification)
        return NextResponse.json({ message: 'notification Fetched Successfully', notification: notification, success: true }, { status: 200 });
    } catch (error) {
        console.error('Error fetching notification details:', error);
        return NextResponse.json({ message: 'student notification failed', success: false }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const formData = await req.formData();
        const formDataObject = {};
        for (const [key, value] of formData.entries()) {
            if (formDataObject[key]) {
                if (!Array.isArray(formDataObject[key])) {
                    formDataObject[key] = [formDataObject[key]];
                }
                formDataObject[key].push(value);
            } else {
                formDataObject[key] = value;
            }
        }

        console.log("formDataObject", formDataObject)
        const currentNotification = await NotificationModel.findById(id);
        let imageLink = currentNotification.image || ""; 

        if (formDataObject.removeImage === "true") {
            imageLink = "";
        } else if (formDataObject.image && typeof formDataObject.image === 'object') {
            const { image } = formDataObject;
            let uploadedImage;

            if (Array.isArray(image)) {
                uploadedImage = await uploads(image[1], "image");
                imageLink = uploadedImage.secure_url;
            } else {
                uploadedImage = await uploads(image, "image");
                imageLink = uploadedImage.secure_url;
            }
        }

        const updateNotification = await NotificationModel.findByIdAndUpdate(
            id,
            { ...formDataObject, image: imageLink },
            { new: true }
        );

        return NextResponse.json({ message: 'Notification edited successfully', success: true }, { status: 200 });
    } catch (error) {
        console.error('Error editing notification details:', error);
        return NextResponse.json({ message: 'Notification editing failed', success: false }, { status: 500 });
    }
}

