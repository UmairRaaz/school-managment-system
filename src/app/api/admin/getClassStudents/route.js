import dbConnect from "@/app/libs/dbConnect";
import { StudentModel } from "@/app/models/studentModel";
import { NextResponse } from "next/server";
export const revalidate = 0;
export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    const { selectedClass, selectedSection } = data;
    console.log(selectedClass, selectedSection)

    const students = await StudentModel.aggregate([
      {
        $match: {
          $and: [
            { CurrentClass: selectedClass },
            { Section: selectedSection }
          ]
        }
      },
      {
        $project: {
          _id: 1,
          SID: 1,
          Name: 1,  
          CurrentClass: 1,
          Section: 1
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
    console.error(error);
    return NextResponse.json({
      message: "Students fetch failed",
      success: false
    }, { status: 500 });
  }
}
