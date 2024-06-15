import dbConnect from "@/libs/dbConnect";
import { NotificationModel } from "@/models/notificationModel";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const notifications = await NotificationModel.find({});
    console.log(notifications)
    return NextResponse.json({ message: "notifications fetched successfully", success: true, notifications: notifications });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch notifications", success: false }, { status: 500 });
  }
}
