

import dbConnect from '@/app/libs/dbConnect';
import { Result } from '@/app/models/ResultModel';

import { NextResponse } from 'next/server';
export const revalidate = 0;
export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const result = await Result.findOneAndDelete({ _id: id });

        return NextResponse.json({ message: 'result  Deleted', success: true }, { status: 200 });
    } catch (error) {
        console.error('Error deleting result:', error);
        return NextResponse.json({ message: 'Deleting result failed', success: false }, { status: 500 });
    }
}

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const result = await Result.findOne({ _id: id });
        console.log("GET result DETAILS : ", result)
        return NextResponse.json({ message: 'result Fetched Successfully', result: result, success: true }, { status: 200 });
    } catch (error) {
        console.error('Error fetching result details:', error);
        return NextResponse.json({ message: 'student result failed', success: false }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const body = await req.json();
        const updateResult = await Result.findByIdAndUpdate(
            id,
            body,
            { new: true }
        );
        console.log(updateResult)
        return NextResponse.json({ message: 'result Edited Successfully', success: true }, { status: 200 });
    } catch (error) {
        console.error('Error Editing result details:', error);
        return NextResponse.json({ message: 'result Editing failed', success: false }, { status: 500 });
    }
}
