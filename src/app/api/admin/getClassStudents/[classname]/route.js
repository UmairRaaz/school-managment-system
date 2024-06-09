import dbConnect from "@/libs/dbConnect";
import { StudentModel } from "@/models/studentModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { classname } = params;
  try {
    await dbConnect();

    const students = await StudentModel.aggregate([
      {
        $match: { CurrentClass: classname }
      },
      {
        $project: {
          _id: 1, 
          SID: 1
        }
      }
    ]);

    console.log(students);

    return NextResponse.json({
      message: "Students fetched successfully",
      success: true,
      data: students
    }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Students fetch failed",
      success: false
    }, { status: 500 });
  }
}
