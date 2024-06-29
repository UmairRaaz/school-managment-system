

import dbConnect from '@/libs/dbConnect';
import { TeacherModel } from '@/models/teacherModel';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const teacher = await TeacherModel.findOneAndDelete({ _id: id });

        return NextResponse.json({ message: 'User  Deleted', success: true }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user details:', error);
        return NextResponse.json({ message: 'Deleting user failed', success: false }, { status: 500 });
    }
}

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const teacher = await TeacherModel.findOne({ _id: id });
        console.log("GET TEACHER DETAILS : ", teacher)
        return NextResponse.json({ message: 'Teacher Fetched Successfully', teacher: teacher, success: true }, { status: 200 });
    } catch (error) {
        console.error('Error fetching teacher details:', error);
        return NextResponse.json({ message: 'Teacher fetching failed', success: false }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect(); // Connect to the database
        const { id } = params; // Extract teacher ID from request params
        const formData = await req.formData(); // Parse form data from the request
        let formDataObject = {};

        // Populate formDataObject from formData entries
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
        console.log(formData)
        // Extract username from formDataObject if it exists
        // const { username } = formDataObject;

        // // Retrieve the current teacher record by ID
        // const currentTeacher = await TeacherModel.findById(id);
        // if (!currentTeacher) {
        //     return NextResponse.json({ message: 'Teacher not found', success: false }, { status: 404 });
        // }

        // // Check if the username is being changed and ensure it's unique
        // if (username && username !== currentTeacher.username) {
        //     const usernameTaken = await TeacherModel.findOne({ username });
        //     if (usernameTaken) {
        //         return NextResponse.json({ message: 'Username is already taken', success: false }, { status: 400 });
        //     }
        // }

        // let imageLink = formDataObject.image; // Initialize imageLink with existing image URL from formDataObject

        // // Handle image upload if formDataObject.image is an object (File object)
        // if (formDataObject.image && typeof formDataObject.image === 'object') {
        //     const { image } = formDataObject;
        //     let uploadedImage;

        //     if (Array.isArray(image)) {
        //         uploadedImage = await uploads(image[0], "image"); // Upload the first image in the array
        //         imageLink = uploadedImage.secure_url; // Update imageLink with secure_url
        //     } else {
        //         uploadedImage = await uploads(image, "image"); // Upload single image
        //         imageLink = uploadedImage.secure_url; // Update imageLink with secure_url
        //     }

        //     // Update formDataObject.image only if you need to store additional image data
        //     formDataObject.image = uploadedImage;
        // }

        // // Update the teacher record in the database
        // const updatedTeacher = await TeacherModel.findByIdAndUpdate(
        //     id,
        //     { ...formDataObject, image: imageLink }, // Update image to use imageLink
        //     { new: true } // Return the updated document
        // );

        // Return a success response with JSON
        return NextResponse.json({ message: 'Teacher Edited Successfully', success: true }, { status: 200 });
    } catch (error) {
        // Handle errors and return an error response with JSON
        console.error('Error Editing teacher details:', error);
        return NextResponse.json({ message: 'Teacher Editing failed', success: false }, { status: 500 });
    }
}