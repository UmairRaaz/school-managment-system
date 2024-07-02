import dbConnect from "@/app/libs/dbConnect"
import { Result } from "@/app/models/ResultModel"
import { NextResponse } from "next/server"



export async function POST(req){
    try {
        dbConnect()
        const body = await req.json()
        const result = await Result.create(body)
        console.log(result)
        return NextResponse.json({message: "result added successfully", result: [], success: true})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "result added failed", success: false})
    }
}
