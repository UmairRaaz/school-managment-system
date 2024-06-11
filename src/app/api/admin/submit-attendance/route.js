import { Attendance } from "@/models/attendanceModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();

        // Convert the date from the request body to a Date object and strip the time component
        const requestDate = new Date(body.date);
        requestDate.setHours(0, 0, 0, 0);

        // Get the current date and strip the time component
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        // Check if the request date is in the future
        if (requestDate.getTime() > currentDate.getTime()) {
            return NextResponse.json({ message: "Cannot take attendance for a future date", success: false }, { status: 400 });
        }

        // Check if attendance is already taken for the same date, class, subject, and teacher
        const existingAttendance = await Attendance.findOne({
            teacher: body.teacher,
            className: body.className,
            subject: body.subject,
            date: body.date
        });

        console.log('Request Date:', requestDate);
        console.log('Current Date:', currentDate);
        console.log('Existing Attendance:', existingAttendance);

        if (existingAttendance) {
            // Convert existingAttendance.date to a Date object and strip the time component
            const existingDate = new Date(existingAttendance.date);
            existingDate.setHours(0, 0, 0, 0);

            // Compare the dates
            if (existingDate.getTime() === requestDate.getTime()) {
                return NextResponse.json({ message: "Attendance already taken for this date, class, and subject", success: false }, { status: 400 });
            }
        }

        const attendance = await Attendance.create(body);
        return NextResponse.json({ message: "Attendance taken successfully", success: true }, { status: 200 });
    } catch (error) {
        console.error("Error taking attendance:", error);
        return NextResponse.json({ message: "Attendance taking failed", success: false }, { status: 500 });
    }
}
