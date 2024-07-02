import dbConnect from "@/app/libs/dbConnect";
import { Result } from "@/app/models/ResultModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await dbConnect();

        const allResults = await Result.find({ });

        return NextResponse.json({ message: "results fetched successfully", success: true, results:  allResults }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "results fetched failed", success: false }, { status: 400 });
    }
}