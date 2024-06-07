

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
        await dbConnect();
        const { id } = params;
        const body = await req.json();
        const { username, password, name, email, phoneNumber, classes, subjects } = body;

        // Retrieve the current teacher record
        const currentTeacher = await TeacherModel.findById(id);
        if (!currentTeacher) {
            return NextResponse.json({ message: 'Teacher not found', success: false }, { status: 404 });
        }

        // Check if the username is being changed
        if (username && username !== currentTeacher.username) {
            // Check if the new username is already taken
            const usernameTaken = await TeacherModel.findOne({ username });
            if (usernameTaken) {
                return NextResponse.json({ message: 'Username is already taken', success: false }, { status: 400 });
            }
        }

        // Update the teacher details
        const updatedTeacher = await TeacherModel.findByIdAndUpdate(
            id,
            {
                username,
                password,
                name,
                email,
                phoneNumber,
                classes,
                subjects
            },
            { new: true }
        );

        return NextResponse.json({ message: 'Teacher Edited Successfully', success: true }, { status: 200 });
    } catch (error) {
        console.error('Error Editing teacher details:', error);
        return NextResponse.json({ message: 'Teacher Editing failed', success: false }, { status: 500 });
    }
}
