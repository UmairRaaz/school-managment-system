import dbConnect from "@/libs/dbConnect";
import { Attendance } from "@/models/attendanceModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    console.log(id);

    const allAttendances = await Attendance.find({teacher : id})
    console.log("allAttendances", allAttendances)
    return NextResponse.json({ message: "Attendance fetched successfully", success: true, data: allAttendances },{ status: 200 });
  } catch (error) {
    console.error("Error fetching attendance:", error);

    return NextResponse.json({ message: "Attendance fetch failed", success: false },{ status: 500 });
  }
}
