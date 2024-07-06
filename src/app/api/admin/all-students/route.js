import dbConnect from "@/app/libs/dbConnect";
import { StudentModel } from "@/app/models/studentModel";
import { NextResponse } from "next/server";
export const revalidate = 0;
export async function GET(req) {
    try {
        await dbConnect();

        const allStudents = await StudentModel.find({ });

        return NextResponse.json({ message: "Students fetched successfully", success: true, students:  allStudents }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Students fetched failed", success: false }, { status: 400 });
    }
}