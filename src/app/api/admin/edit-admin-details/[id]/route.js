import { uploads } from "@/libs/cloudinary";
import dbConnect from "@/libs/dbConnect";
import { AdminModel } from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(NextRequest, { params }) {
    try {
        await dbConnect();
        const formData = await NextRequest.formData();
        console.log(formData)
        const { id } = params;
        const formDataObject = {};

        for (const [key, value] of formData.entries()) {
            if (formDataObject[key]) {
                if (!Array.isArray(formDataObject[key])) {
                    formDataObject[key] = [formDataObject[key]];
                }
                formDataObject[key].push(value);
            } else {
                formDataObject[key] = value;
            }
        }
        const {name, role, email, username, password, phoneNumber, image} = formDataObject;

        console.log(image[1])
        const uploadedImage = await uploads(image[1], "image");
        console.log(uploadedImage.secure_url)

        // Check if the new username is already taken by another user
        const existingUser = await AdminModel.findOne({ username: username });

        if (existingUser && existingUser._id.toString() !== id) {
            return NextResponse.json({ message: "Username is already taken", success: false }, { status: 409 });
        }

        // Proceed with the update if username is not taken
        const user = await AdminModel.findByIdAndUpdate(
            id,
            { 
                name: name, 
                role: role, 
                email: email, 
                username: username, 
                password: password,
                phoneNumber: phoneNumber,
                image: uploadedImage.secure_url
            },
            { new: true }
        );

        if (user) {
            return NextResponse.json({ message: "User updated", success: true }, { status: 200 });
        } else {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }
        return NextResponse.json({ message: "User updated", success: true }, { status: 200 });
    } catch (error) {
        console.error("Error while updating user:", error);
        return NextResponse.json({ message: "Updating user failed", success: false }, { status: 500 });
    }
}


