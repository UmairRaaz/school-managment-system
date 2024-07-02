import dbConnect from "@/app/libs/dbConnect";
import { FeeModel } from "@/app/models/feesModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();

        const { date } = body;

        if (!date) {
            return NextResponse.json(
                { message: "Date is required", success: false },
                { status: 400 }
            );
        }

        const dateObject = new Date(date);
        const month = dateObject.toLocaleString('default', { month: 'long' });
        const year = dateObject.getFullYear();

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
