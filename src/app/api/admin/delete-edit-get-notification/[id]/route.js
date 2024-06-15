

import dbConnect from '@/libs/dbConnect';
import { NotificationModel } from '@/models/notificationModel';

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
        console.log("GET Notifction DETAILS : ", notification)
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
        const body = await req.json();
        console.log(id, body)
        // // Update the notification details
        const updateNotification = await NotificationModel.findByIdAndUpdate(
            id,
            body,
            { new: true }
        );
        console.log(updateNotification)
        return NextResponse.json({ message: 'notification Edited Successfully', success: true }, { status: 200 });
    } catch (error) {
        console.error('Error Editing notification details:', error);
        return NextResponse.json({ message: 'notification Editing failed', success: false }, { status: 500 });
    }
}
