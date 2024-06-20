import dbConnect from "@/libs/dbConnect";
import { FeeModel } from "@/models/feesModel";
import { StudentModel } from "@/models/studentModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        dbConnect()
        const allFees = await FeeModel.find({}).populate('studentId', 'SID Name Section CurrentClass MobileNumber');
        return NextResponse.json({
            message: "Fee records fetched successfully",
            allFees: allFees,
            success: true
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "fetching Fees Failed", success: false }, { status: 500 });
    }
}
