import dbConnect from "@/app/libs/dbConnect";
import { FeeModel } from "@/app/models/feesModel";
import { StudentModel } from "@/app/models/studentModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();

        const { date } = body;

        if (!date) {
            return NextResponse.json({ message: "Date is required", success: false }, { status: 400 });
        }

        const dateObject = new Date(date);
        const month = dateObject.toLocaleString('default', { month: 'long' });
        const year = dateObject.getFullYear();

        const students = await StudentModel.find({});

        const feePromises = students.map(async (student) => {
            const existingFee = await FeeModel.findOne({ studentId: student._id, month, year });
            if (!existingFee) {
                let monthlyFee = 0;
                if (student.CurrentClass >= 1 && student.CurrentClass <= 5) {
                    monthlyFee = 1000;
                } else if (student.CurrentClass >= 6 && student.CurrentClass <= 10) {
                    monthlyFee = 2000;
                }

                const newFee = await FeeModel.create({
                    studentId: student._id,
                    month,
                    year,
                    date: dateObject,
                    isPaid: false,
                    MonthlyFee: monthlyFee,
                });
                return newFee;
            }
        });

        await Promise.all(feePromises);

        const allFees = await FeeModel.find({ month, year }).populate(
            'studentId',
            'SID Name Section CurrentClass MobileNumber'
        );

        return NextResponse.json(
            {
                message: "Fee records generated successfully",
                allFees: allFees,
                success: true,
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Assigning Fees Failed", success: false }, { status: 500 });
    }
}
