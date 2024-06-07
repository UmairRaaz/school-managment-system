

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
        console.error('Error fetching student details:', error);
        return NextResponse.json({ message: 'Deleting student failed', success: false }, { status: 500 });
    }
}

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const student = await StudentModel.findOne({ _id: id });
        console.log("GET student DETAILS : ", student)
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
        const body = await req.json();
        // const { username, password, name, email, phoneNumber, classes, subjects } = body;

        // Retrieve the current teacher record
        const currentStudent = await TeacherModel.findById(id);
        if (!currentStudent) {
            return NextResponse.json({ message: 'Student not found', success: false }, { status: 404 });
        }

        // Check if the username is being changed
        if (username && username !== currentStudent.username) {
            // Check if the new username is already taken
            const usernameTaken = await TeacherModel.findOne({ username });
            if (usernameTaken) {
                return NextResponse.json({ message: 'Username is already taken', success: false }, { status: 400 });
            }
        }

        // Update the teacher details
        const updatedStudent = await StudentModel.findByIdAndUpdate(
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

        return NextResponse.json({ message: 'Student Edited Successfully', success: true }, { status: 200 });
    } catch (error) {
        console.error('Error Editing Student details:', error);
        return NextResponse.json({ message: 'Student Editing failed', success: false }, { status: 500 });
    }
}
