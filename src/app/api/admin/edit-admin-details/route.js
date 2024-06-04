import dbConnect from "@/libs/dbConnect";
import { AdminModel } from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        const { name, role, email, phoneNumber, username } = body;
        const user = await AdminModel.findOneAndUpdate(
            { username },
            { name, role, email, phoneNumber },
            { new: true }
        );

        console.log("updated user", user);

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
