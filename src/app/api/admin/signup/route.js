import dbConnect from "@/libs/dbConnect";
import { AdminModel } from "@/models/userModel";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST(req){
    try {
        dbConnect()
        const body = await req.json()
        const adminDetails = body.data
        console.log(adminDetails)
        const admin = await AdminModel.findOne({username : adminDetails.username})
        if(admin){
            return NextResponse.json({
                message : "username already exist",
                success : false,
            })
        }

        const hashedPassword = await hash(adminDetails.password, 10)

        const newAdmin = await AdminModel.create({
            username : adminDetails.username,
            password : hashedPassword,
        })
        console.log("newAdminCreated", newAdmin)
        return NextResponse.json({
            message : "admin created successfully",
            success : true,
        })
    } catch (error) {
        console.log("error while creating admin", error)
        return NextResponse.json({
            message : "creating admin failed",
            success : false,
            error,
        })
    }
}