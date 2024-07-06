import dbConnect from "@/app/libs/dbConnect";
import { Attendance } from "@/app/models/attendanceModel";
import { FeeModel } from "@/app/models/feesModel";
import { NotificationModel } from "@/app/models/notificationModel";
import { Result } from "@/app/models/ResultModel";
import { StudentModel } from "@/app/models/studentModel";


import { Types } from "mongoose";
import { NextResponse } from "next/server";
export const revalidate = 0;
async function aggregateData(collectionModel, matchStages, groupStages, month, year) {
    try {
        await dbConnect();

        let aggregationPipeline = [];

        if (month && year) {
            const dateFilter = getDateFilter(month, year);
            matchStages.unshift({ $match: dateFilter });
        }

        if (matchStages && matchStages.length > 0) {
            aggregationPipeline = aggregationPipeline.concat(matchStages);
        }

        aggregationPipeline = aggregationPipeline.concat(groupStages);

        const result = await collectionModel.aggregate(aggregationPipeline);
        // console.log("result", result);
        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to aggregate data");
    }
}

function getDateFilter(month, year) {
    if (month && year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);
        return {
            createdAt: {
                $gte: startDate,
                $lt: endDate
            }
        };
    }
    return {};
}

async function aggregateAttendance(studentId, month, year) {
    const objectId = new Types.ObjectId(studentId);

    let matchStages = [
        { $unwind: "$students" },
        { $match: { "students.id": objectId } }
    ];

    let groupStages = [
        {
            $group: {
                _id: null,
                totalPresent: { $sum: { $cond: [{ $eq: ["$students.isPresent", true] }, 1, 0] } },
                totalAbsent: { $sum: { $cond: [{ $eq: ["$students.isPresent", false] }, 1, 0] } }
            }
        }
    ];

    // Optionally add date filter if month and year are provided
    if (month && year) {
        matchStages.unshift({ $match: getDateFilter(month, year) });
    }

    return await aggregateData(Attendance, matchStages, groupStages);
}

async function aggregateFees(studentId, month, year) {
    const objectId = new Types.ObjectId(studentId);

    let matchStages = [
        { $match: { studentId: objectId } }
    ];

    let groupStages = [
        {
            $group: {
                _id: null,
                totalFees: { $sum: "$totalFee" },
                totalPaidCount: { $sum: { $cond: [{ $eq: ["$isPaid", true] }, 1, 0] } },
                totalUnpaidAmount: { $sum: { $cond: [{ $eq: ["$isPaid", false] }, "$totalFee", 0] } },
                totalPaidAmount: { $sum: { $cond: [{ $eq: ["$isPaid", true] }, "$totalFee", 0] } },
                totalUnpaidCount: { $sum: { $cond: [{ $eq: ["$isPaid", false] }, 1, 0] } }
            }
        }
    ];

    // Optionally add date filter if month and year are provided
    if (month && year) {
        matchStages.unshift({ $match: getDateFilter(month, year) });
    }

    return await aggregateData(FeeModel, matchStages, groupStages);
}

async function aggregateNotifications(studentClass, month, year) {
    let matchStages = [
        { $match: { $or: [{ class: studentClass }, { notificationFor: "public" }] } }
    ];

    let groupStages = [
        {
            $group: {
                _id: null,
                totalForClass: { $sum: { $cond: [{ $eq: ["$class", studentClass] }, 1, 0] } },
                totalForPublic: { $sum: { $cond: [{ $eq: ["$notificationFor", "public"] }, 1, 0] } }
            }
        }
    ];

    return await aggregateData(NotificationModel, matchStages, groupStages, month, year);
}

async function aggregateResultsNew(studentId, month, year) {
    console.log("Received studentId:", studentId);

    if (typeof studentId !== "string") {
        console.error("studentId is not a string");
        return null;
    }
    
    const objectId = new Types.ObjectId(studentId);

    let matchStages = [
        { $match: { studentId: objectId } }
    ];

    if (month && year) {
        matchStages.unshift({ $match: getDateFilter(month, year) });
    }

    

    let groupStages = [
        {
            $group: {
                _id: null,
                totalResult: { $sum: 1 },
                totalPass: { $sum: { $cond: [{ $eq: ["$isPass", true] }, 1, 0] } },
                totalFail: { $sum: { $cond: [{ $eq: ["$isPass", false] }, 1, 0] } }
            }
        }
    ];
    const aggregationPipeline = matchStages.concat(groupStages);
    const result = await Result.aggregate(aggregationPipeline);
    console.log("Aggregation Result: ", result);

    return result.length > 0 ? result[0] : null;
}


export async function POST(req) {
    try {
        await dbConnect()
        const { studentId, month, year } = await req.json();

        if (!studentId) {
            return NextResponse.json({
                message: "studentId is required",
                success: false
            }, { status: 400 });
        }

        const objectId = new Types.ObjectId(studentId);
        const student = await StudentModel.findById(objectId);
        const studentClass = student ? student.CurrentClass : null;
        const attendanceResult = await aggregateAttendance(studentId, month, year);
        const feeResult = await aggregateFees(studentId, month, year);
        const notificationResult = await aggregateNotifications(studentClass, month, year);
        console.log("type of studentId", typeof studentId)
        const resultAggregation = await aggregateResultsNew(studentId, month, year);

        console.log("Result Aggregation:", resultAggregation);

        const totalPresent = attendanceResult ? attendanceResult.totalPresent : 0;
        const totalAbsent = attendanceResult ? attendanceResult.totalAbsent : 0;
        const totalFees = feeResult ? feeResult.totalFees : 0;
        const totalUnpaidAmount = feeResult ? feeResult.totalUnpaidAmount : 0;
        const totalPaidCount = feeResult ? feeResult.totalPaidCount : 0;
        const totalUnpaidCount = feeResult ? feeResult.totalUnpaidCount : 0;
        const totalPaidAmount = feeResult ? feeResult.totalPaidAmount : 0;

        const totalForClass = notificationResult ? notificationResult.totalForClass : 0;
        const totalForPublic = notificationResult ? notificationResult.totalForPublic : 0;

        const totalResult = resultAggregation ? resultAggregation.totalResult : 0;
        const totalPass = resultAggregation ? resultAggregation.totalPass : 0;
        const totalFail = resultAggregation ? resultAggregation.totalFail : 0;

        return NextResponse.json({
            message: "Data Fetch Successfully",
            success: true,
            data: {
                attendance: {
                    totalPresent,
                    totalAbsent
                },
                fees: {
                    totalFees,
                    totalUnpaidAmount,
                    totalPaidCount,
                    totalUnpaidCount,
                    totalPaidAmount
                },
                notifications: {
                    totalForClass,
                    totalForPublic
                },
                results: {
                    totalResult,
                    totalPass,
                    totalFail
                }
            }
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Data Fetch Failed",
            success: false
        }, { status: 500 });
    }
}

