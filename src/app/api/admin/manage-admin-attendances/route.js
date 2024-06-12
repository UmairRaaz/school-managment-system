import dbConnect from "@/libs/dbConnect";
import { Attendance } from "@/models/attendanceModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await dbConnect();
    const attendances = await Attendance.find({});
    console.log("All Attendances:", attendances); // Log all attendances

    return NextResponse.json({ message: "attendance fetched successfully", success: true, attendance: attendances }, { status: 200 });
  } catch (error) {
    console.error("Error fetching attendance:", error);

    return NextResponse.json({ message: "attendance fetched failed", success: false }, { status: 500 });
  }
}

export async function PUT(req) {
  const { attendanceId, studentId, isPresent } = await req.json();

  try {
    await dbConnect();

    const attendance = await Attendance.findById(attendanceId);
    if (!attendance) {
      return NextResponse.json({ message: 'Attendance record not found', success: false }, { status: 404 });
    }

    attendance.students.forEach((student) => {
      if (student.id == studentId) {
        student.isPresent = isPresent;
      }
    });

    await attendance.save();

    const updatedAttendances = await Attendance.find({});
    return NextResponse.json({ message: "Attendance updated successfully", success: true, attendance: updatedAttendances }, { status: 200 });

  } catch (error) {
    console.error('Error updating attendance:', error);
    return NextResponse.json({ message: 'Failed to update attendance', success: false }, { status: 500 });
  }
}