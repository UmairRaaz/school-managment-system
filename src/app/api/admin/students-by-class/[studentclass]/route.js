

import dbConnect from '@/libs/dbConnect';
import { StudentModel } from '@/models/studentModel';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { studentclass } = params;
        const students = await StudentModel.find({CurrentClass: studentclass });

        return NextResponse.json({ message: 'fee  found', students: students, success: true }, { status: 200 });
    } catch (error) {
        console.error('Error fetching fee details:', error);
        return NextResponse.json({ message: 'Fetching fee details failed', success: false }, { status: 500 });
    }
}