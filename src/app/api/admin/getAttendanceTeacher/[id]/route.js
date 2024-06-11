import dbConnect from "@/libs/dbConnect";
import { Attendance } from "@/models/attendanceModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    console.log(id);

    const allAttendances = await Attendance.aggregate([
      // Match documents containing the specified student ID
      {
          $match: {
              'students.id': id
          }
      },
      // Deconstruct the students array
      {
          $unwind: '$students'
      },
      // Match the student with the specified student ID
      {
          $match: {
              'students.id': id
          }
      }
    ]).exec();

    console.log(allAttendances);

    return NextResponse.json({ message: "Attendance fetched successfully", success: true, data: allAttendances },{ status: 200 });
  } catch (error) {
    console.error("Error fetching attendance:", error);

    return NextResponse.json({ message: "Attendance fetch failed", success: false },{ status: 500 });
  }
}
