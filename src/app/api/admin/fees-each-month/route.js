import dbConnect from "@/libs/dbConnect";
import { FeeModel } from "@/models/feesModel";
import { StudentModel } from "@/models/studentModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        dbConnect()
        const now = new Date();
        const month = now.toLocaleString('default', { month: 'long' }); 
        const year = now.getFullYear(); 
        const students = await StudentModel.find({});

        const feePromises = students.map(async student => {
            const existingFee = await FeeModel.findOne({ studentId: student._id, month, year });
            if (!existingFee) {
                return FeeModel.create({ 
                    studentId: student._id,
                    month,
                    year,
                    date: new Date(year, now.getMonth(), 1), 
                    isPaid: false
                });
            }
        });

        await Promise.all(feePromises);

        const allFees = await FeeModel.find({}).populate('studentId', 'SID Name Section CurrentClass MobileNumber');
        return NextResponse.json({
            message: "Fee records generated successfully",
            allFees: allFees,
            success: true
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Assigning Fees Failed", success: false }, { status: 500 });
    }
}
