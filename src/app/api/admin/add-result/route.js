import dbConnect from "@/app/libs/dbConnect"
import { Result } from "@/app/models/ResultModel"
import mongoose from "mongoose";
import { NextResponse } from "next/server"


export async function POST(req) {
    try {
        await dbConnect();  

        const body = await req.json();

        if (body.studentId) {
            body.studentId = new mongoose.Types.ObjectId(body.studentId);
        }

        const result = await Result.create(body);
        console.log(result);

        return NextResponse.json({ message: "result added successfully", result: result, success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "result added failed", success: false });
    }
}