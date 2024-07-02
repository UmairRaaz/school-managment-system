import { uploads } from "@/app/libs/cloudinary";
import dbConnect from "@/app/libs/dbConnect";
import { StudentModel } from "@/app/models/studentModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();
        const formData = await req.formData();
        let formDataObject = {};

        for (const [key, value] of formData.entries()) {
            if (formDataObject[key]) {
                if (!Array.isArray(formDataObject[key])) {
                    formDataObject[key] = [formDataObject[key]];
                }
                formDataObject[key].push(value);
            } else {
                formDataObject[key] = value;
            }
        }

        const {image} = formDataObject
        let StudnetImage = image[1]
        const uploadedImage = await uploads(StudnetImage, "image");

        // Check if username already exists
        const checkUserName = await StudentModel.findOne({ username: formDataObject.username });
        console.log(checkUserName);

        if (checkUserName) {
            return NextResponse.json({ message: "Username already taken", success: false }, { status: 400 });
        } else {
            const newStudent = await StudentModel.create({...formDataObject, image:uploadedImage.secure_url });
            console.log(newStudent);
            return NextResponse.json({ message: "Student added successfully", success: true }, { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Adding Student failed", success: false }, { status: 400 });
    }
}
