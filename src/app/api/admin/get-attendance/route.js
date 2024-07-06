import dbConnect from "@/app/libs/dbConnect";
import { Attendance } from "@/app/models/attendanceModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
export const revalidate = 0;
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { selectedTeacher, selectedClass, selectedSection, selectedSubject } = body;
    console.log(selectedTeacher, selectedClass, selectedSection, selectedSubject);
    const attendance = await Attendance.find({
      teacher: selectedTeacher,
      className: selectedClass,
      subject: selectedSubject,
      section: selectedSection 
    });

    console.log(attendance);
    return NextResponse.json({ message: "Attendance fetched successfully", success: true, attendance: attendance }, { status: 200 });
  } catch (error) {
    console.error("Error fetching attendance:", error);

    return NextResponse.json({ message: "Attendance fetched failed", success: false }, { status: 500 });
  }
}
