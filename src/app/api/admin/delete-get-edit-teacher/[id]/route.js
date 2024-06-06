

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
        console.log(id);
        const body = await req.json()
        console.log(body)
        const { username, name, email, phoneNumber, classes, subjects } = body;


        const updatedTeacher = await TeacherModel.findOneAndUpdate({ _id: id }, {
            name,
            email,
            phoneNumber,
            classes,
            subjects
        }, {new: true});

        console.log(updatedTeacher)

        return NextResponse.json({ message: 'Teacher Edited Successfully', success: true }, { status: 200 });
    } catch (error) {
        console.error('Error Editing teacher details:', error);
        return NextResponse.json({ message: 'Teacher Editing failed', success: false }, { status: 500 });
    }
}
