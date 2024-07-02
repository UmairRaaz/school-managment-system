

import dbConnect from '@/app/libs/dbConnect';
import { FeeModel } from '@/app/models/feesModel';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const notification = await FeeModel.findOneAndDelete({ _id: id });

        return NextResponse.json({ message: 'Fees  Deleted', success: true }, { status: 200 });
    } catch (error) {
        console.error('Error deleting Fees:', error);
        return NextResponse.json({ message: 'Deleting Fees failed', success: false }, { status: 500 });
    }
}

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const fees = await FeeModel.findOne({ _id: id }).populate('studentId', 'SID Name Section CurrentClass FatherName MobileNumber');
        console.log("GET fees DETAILS : ", fees);
        return NextResponse.json({ message: 'Fees fetched successfully', fees, success: true }, { status: 200 });
    } catch (error) {
        console.error('Error fetching fees details:', error);
        return NextResponse.json({ message: 'Fetching fees failed', success: false }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const body = await req.json();
        console.log(body)
        const updateFees = await FeeModel.findByIdAndUpdate(
            id,
            body,
            { new: true }
        );
        // console.log(updateFees)
        return NextResponse.json({ message: 'Fees Edited Successfully', success: true }, { status: 200 });
    } catch (error) {
        console.error('Error Editing notification details:', error);
        return NextResponse.json({ message: 'Fees Editing failed', success: false }, { status: 500 });
    }
}
