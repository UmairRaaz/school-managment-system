import dbConnect from "@/app/libs/dbConnect";
import { Attendance } from "@/app/models/attendanceModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
export const revalidate = 0;
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json()
    console.log(body)
    const {selectedClass, selectedSection, selectedTeacher, selectedSubject, date} = body
    const isoDate = new Date(date).toISOString();
    const attendance = await Attendance.find({
   
      section : selectedSection,
      className : selectedClass,

      date : isoDate
    })
    console.log(attendance)
    return NextResponse.json({ message: "attendance fetched successfully", success: true, attendance: attendance, id: attendance[0]._id }, { status: 200 });
  } catch (error) {
    console.error("Error fetching attendance:", error);

    return NextResponse.json({ message: "attendance fetched failed", success: false }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { attendanceData, attendanceEditId } = body;

    const updateAttendance = await Attendance.findByIdAndUpdate(attendanceEditId, attendanceData);

    if (!updateAttendance) {
      return NextResponse.json({ message: "Attendance not found", success: false }, { status: 404 });
    }

    return NextResponse.json({ message: "Attendance updated successfully", success: true }, { status: 200 });
  } catch (error) {
    console.error("Error updating attendance:", error);
    return NextResponse.json({ message: "Failed to update attendance", success: false }, { status: 500 });
  }
}
