import dbConnect from "@/libs/dbConnect";
import { FeeModel } from "@/models/feesModel";

import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        const newFee = await FeeModel.create(body)
        return NextResponse.json({ message: "Fees added successfully", success: true }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Adding Fees failed", success: false }, { status: 400 });
    }
}
