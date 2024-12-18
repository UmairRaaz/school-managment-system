import dbConnect from "@/app/libs/dbConnect";
import { NotificationModel } from "@/app/models/notificationModel";
import { NextResponse } from "next/server";
export const revalidate = 0;
export async function GET() {
  await dbConnect();

  try {
    const notifications = await NotificationModel.find({});
    return NextResponse.json({ message: "notifications fetched successfully", success: true, notifications: notifications });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch notifications", success: false }, { status: 500 });
  }
}
