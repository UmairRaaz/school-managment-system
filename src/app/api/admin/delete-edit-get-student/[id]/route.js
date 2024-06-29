

import { uploads } from '@/libs/cloudinary';
import dbConnect from '@/libs/dbConnect';
import { StudentModel } from '@/models/studentModel';
import { TeacherModel } from '@/models/teacherModel';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const student = await StudentModel.findOneAndDelete({ _id: id });

        return NextResponse.json({ message: 'student  Deleted', success: true }, { status: 200 });
    } catch (error) {
        console.error('Error deleting student:', error);
        return NextResponse.json({ message: 'Deleting student failed', success: false }, { status: 500 });
    }
}

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const student = await StudentModel.findOne({ _id: id });
        return NextResponse.json({ message: 'student Fetched Successfully', student: student, success: true }, { status: 200 });
    } catch (error) {
        console.error('Error fetching student details:', error);
        return NextResponse.json({ message: 'student fetching failed', success: false }, { status: 500 });
    }
}


export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
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

        let imageLink = formDataObject.image; 

        const currentStudent = await StudentModel.findById(formData._id);
        if (!currentTeacher) {
            return NextResponse.json({ message: 'Student not found', success: false }, { status: 404 });
        }

        // Check if the username is being changed
        if (username && username !== currentStudent.username) {
            // Check if the new username is already taken
            const usernameTaken = await StudentModel.findOne({ username });
            if (usernameTaken) {
                return NextResponse.json({ message: 'Username is already taken', success: false }, { status: 400 });
            }
        }

        if (formDataObject.image && typeof formDataObject.image === 'object') {
            const { image } = formDataObject;
            let uploadedImage;


            if (Array.isArray(image)) {
                uploadedImage = await uploads(image[1], "image");
                imageLink = uploadedImage.secure_url;
            } else {
                uploadedImage = await uploads(image, "image");
                imageLink = uploadedImage.secure_url;
            }


            formDataObject.image = uploadedImage;
        }

        const updatedStudent = await StudentModel.findByIdAndUpdate(
            id,
            { ...formDataObject, image: imageLink },
            { new: true }
        );

        // Return a success response with JSON
        return NextResponse.json(
            { message: 'Student Edited Successfully', success: true },
            { status: 200 }
        );
    } catch (error) {
        // Handle errors and return an error response with JSON
        console.error('Error Editing Student details:', error);
        return NextResponse.json(
            { message: 'Student Editing failed', success: false },
            { status: 500 }
        );
    }
}
