import dbConnect from "@/libs/dbConnect";
import { StudentModel } from "@/models/studentModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        console.log(body)

        const checkUserName = await StudentModel.findOne({ username: body.username });
        console.log(checkUserName);

        if (checkUserName) {
            return NextResponse.json({ message: "Username already taken", success: false }, { status: 400 });
        } else {
            const newStudent = await StudentModel.create(body);
            console.log(newStudent);
            return NextResponse.json({ message: "Student added successfully", success: true }, { status: 200 });

        }

    } catch (error) {
        return NextResponse.json({ message: "Adding Student failed", success: false }, { status: 400 });
    }
}
