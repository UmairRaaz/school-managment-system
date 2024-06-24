import dbConnect from "@/libs/dbConnect";
import { AdminModel } from "@/models/userModel";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const body = await req.json();
        const { id } = params;
        const { name, role, email, phoneNumber, username, password } = body;

        // Check if the new username is already taken by another user
        const existingUser = await AdminModel.findOne({ username });

        if (existingUser && existingUser._id.toString() !== id) {
            return NextResponse.json({ message: "Username is already taken", success: false }, { status: 409 });
        }

        // Proceed with the update if username is not taken
        const user = await AdminModel.findByIdAndUpdate(
            id,
            { name, role, email, phoneNumber, username, password },
            { new: true }
        );

        if (user) {
            return NextResponse.json({ message: "User updated", success: true }, { status: 200 });
        } else {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }
    } catch (error) {
        console.error("Error while updating user:", error);
        return NextResponse.json({ message: "Updating user failed", success: false }, { status: 500 });
    }
}
