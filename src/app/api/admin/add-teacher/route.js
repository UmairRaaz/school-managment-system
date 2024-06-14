import dbConnect from "@/libs/dbConnect";
import { TeacherModel } from "@/models/teacherModel";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        const { username, password, name, email, phoneNumber, classes,section, subjects } = body;

        const checkUserName = await TeacherModel.findOne({ username });
        console.log(checkUserName);

        if (checkUserName) {
            return NextResponse.json({ message: "Username already taken", success: false }, { status: 400 });
        } else {

            const newTeacher = await TeacherModel.create({
                username,
                password,
                name,
                email,
                section,
                phoneNumber,
                classes,
                subjects
            });
            console.log(newTeacher);
            return NextResponse.json({ message: "Teacher added successfully", success: true }, { status: 200 });
        }


    } catch (error) {
        return NextResponse.json({ message: "Adding teacher failed", success: false }, { status: 400 });
    }
}
