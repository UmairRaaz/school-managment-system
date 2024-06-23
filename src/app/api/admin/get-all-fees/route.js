import dbConnect from "@/libs/dbConnect";
import { FeeModel } from "@/models/feesModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();

        const { month, year } = body;

        if (!month || !year) {
            return NextResponse.json(
                { message: "Month and year are required", success: false },
                { status: 400 }
            );
        }

        const allFees = await FeeModel.find({ month: month, year: year }).populate(
            "studentId",
            "SID Name Section CurrentClass FatherName MobileNumber"
        );
        console.log(allFees.length); // Ensure allFees is properly populated here
        return NextResponse.json({
            message: "Fee records fetched successfully",
            allFees: allFees,
            success: true,
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Fetching Fees Failed", success: false }, { status: 500 });
    }
}

