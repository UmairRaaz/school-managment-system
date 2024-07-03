import dbConnect from "@/app/libs/dbConnect";
import { NotificationModel } from "@/app/models/notificationModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        const { studentClass, studentSection } = body;

        // Using aggregation pipeline to match notifications based on class and section
        const notifications = await NotificationModel.aggregate([
            {
                $match: {
                    class: studentClass,
                    section: studentSection
                }
            }
        ]);
        console.log(notifications)
        return NextResponse.json({
            message: 'Notifications fetched successfully',
            notifications,
            success: true
        });
    } catch (error) {
        console.error('Error fetching notifications details:', error);
        return NextResponse.json({
            message: 'Notifications fetching failed',
            success: false
        }, { status: 500 });
    }
}
