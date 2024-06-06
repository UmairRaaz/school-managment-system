import dbConnect from "@/libs/dbConnect";
import { TeacherModel } from "@/models/teacherModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await dbConnect();

        const allTeachers = await TeacherModel.find({ });

        return NextResponse.json({ message: "Teacher fetched successfully", success: true, teachers:  allTeachers }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Adding fetched failed", success: false }, { status: 400 });
    }
}
