import { Attendance } from "@/models/attendanceModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();

        // Check if attendance is already taken for the same date, class, and teacher
        const existingAttendance = await Attendance.findOne({
            teacher: body.teacher,
            className: body.className,
            date: body.date
        });
        if (existingAttendance && existingAttendance.date === Date.now()) {
            return NextResponse.json({ message: "Attendance already taken for this date and class", success: false }, { status: 400 });
        }

        const attendance = await Attendance.create(body);
        return NextResponse.json({ message: "Attendance taken successfully", success: true }, { status: 200 });
    } catch (error) {
        console.error("Error taking attendance:", error);
        return NextResponse.json({ message: "Attendance taking failed", success: false }, { status: 500 });
    }
}
