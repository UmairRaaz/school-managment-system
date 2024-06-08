import dbConnect from "@/libs/dbConnect";
import { StudentModel } from "@/models/studentModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await dbConnect();

        const allStudents = await StudentModel.find({ });

        return NextResponse.json({ message: "Students fetched successfully", success: true, students:  allStudents }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Students fetched failed", success: false }, { status: 400 });
    }
}
