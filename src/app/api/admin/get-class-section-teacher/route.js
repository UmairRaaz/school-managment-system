import dbConnect from "@/app/libs/dbConnect";
import { StudentModel } from "@/app/models/studentModel";
import { TeacherModel } from "@/app/models/teacherModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();
        const data = await req.json();

        const { selectedClass, sectionName } = data;

        const teachers = await TeacherModel.find({classes : selectedClass, section: sectionName})
        console.log(teachers);

        return NextResponse.json({
            message: "Students fetched successfully",
            success: true,
            teachers: teachers
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Students fetch failed",
            success: false
        }, { status: 500 });
    }
}
