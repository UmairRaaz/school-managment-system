

import dbConnect from '@/libs/dbConnect';
import { AdminModel } from '@/models/userModel';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { username } = params;
        const user = await AdminModel.findOne({ username });

        if (!user) {
            return NextResponse.json({ message: 'User not found', success: false }, { status: 404 });
        }

        return NextResponse.json({ message: 'User  found', user: user, success: true }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user details:', error);
        return NextResponse.json({ message: 'Fetching user details failed', success: false }, { status: 500 });
    }
}
