import dbConnect from "@/libs/dbConnect";
import { Attendance } from "@/models/attendanceModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    // const attendances = await Attendance.find({});
    console.log(id)
    const studentId = mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : id;

    const studentAttendance = await Attendance.aggregate([
      {
        $unwind: "$students"
      },
      {
        $match: {
          'students.id': studentId
        }
      }
    ]);

    return NextResponse.json({ message: "attendance fetched successfully", success: true, attendance: studentAttendance }, { status: 200 });
  } catch (error) {
    console.error("Error fetching attendance:", error);

    return NextResponse.json({ message: "attendance fetched failed", success: false }, { status: 500 });
  }
}
