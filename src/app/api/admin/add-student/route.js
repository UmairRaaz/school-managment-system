import dbConnect from "@/libs/dbConnect";
import { StudentModel } from "@/models/studentModel";
import { TeacherModel } from "@/models/teacherModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        // const { username, password, name, email, phoneNumber, classes, subjects } = body;

        const checkUserName = await StudentModel.findOne({ username });
        console.log(checkUserName);

        if (checkUserName) {
            return NextResponse.json({ message: "Username already taken", success: false }, { status: 400 });
        } else {

            // const newTeacher = await StudentModel.create({
            //     username,
            //     password,
            //     name,
            //     email,
            //     phoneNumber,
            //     classes,
            //     subjects
            // });
            // console.log(newTeacher);
            return NextResponse.json({ message: "Student added successfully", success: true }, { status: 200 });
        }


    } catch (error) {
        return NextResponse.json({ message: "Adding Student failed", success: false }, { status: 400 });
    }
}
