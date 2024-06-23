import dbConnect from "@/libs/dbConnect";
import { FeeModel } from "@/models/feesModel";
import { StudentModel } from "@/models/studentModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json()

        const  {month, year} = body
        

        if (!month || !year) {
            return NextResponse.json({ message: "Month and year are required", success: false }, { status: 400 });
        }

        const students = await StudentModel.find({});

        const feePromises = students.map(async student => {
            const existingFee = await FeeModel.findOne({ studentId: student._id, month, year });
            if (!existingFee) {
                let monthlyFee = 0;
                if (student.CurrentClass >= 1 && student.CurrentClass <= 5) {
                    monthlyFee = 1000;
                } else if (student.CurrentClass >= 6 && student.CurrentClass <= 10) {
                    monthlyFee = 2000;
                }
                return FeeModel.create({
                    studentId: student._id,
                    month,
                    year,
                    date: new Date(year, new Date().getMonth(month), 1), 
                    isPaid: false,
                    MonthlyFee: monthlyFee
                });
            }
        });

        await Promise.all(feePromises);

        const allFees = await FeeModel.find({ month, year }).populate('studentId', 'SID Name Section CurrentClass MobileNumber');
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
