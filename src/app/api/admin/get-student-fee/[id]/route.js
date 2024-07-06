

import dbConnect from '@/app/libs/dbConnect';
import { FeeModel } from '@/app/models/feesModel';
import { NextResponse } from 'next/server';
export const revalidate = 0;
export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const fee = await FeeModel.find({studentId: id  }).populate('studentId', 'SID Name Section CurrentClass MobileNumber');

        return NextResponse.json({ message: 'fee  found', fee: fee, success: true }, { status: 200 });
    } catch (error) {
        console.error('Error fetching fee details:', error);
        return NextResponse.json({ message: 'Fetching fee details failed', success: false }, { status: 500 });
    }
}
