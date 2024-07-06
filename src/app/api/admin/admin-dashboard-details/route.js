import dbConnect from "@/app/libs/dbConnect";
import { StudentModel } from "@/app/models/studentModel";
import { TeacherModel } from "@/app/models/teacherModel";
import { FeeModel } from "@/app/models/feesModel";
import { Result } from "@/app/models/ResultModel";
import { Attendance } from "@/app/models/attendanceModel";
import { NotificationModel } from "@/app/models/notificationModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    const filterData = await req.json();
    const { year, month, class: classFilter } = filterData;

    try {
        await dbConnect();
        const hasFilters = year && month;

        const dateFilter = getDateFilter(year, month);

        // Aggregate queries for different models
        const studentTotal = await aggregateStudentTotal(hasFilters, dateFilter, classFilter); //done
        const resultTotal = await aggregateResultTotal(hasFilters, dateFilter, classFilter); //done
        const attendanceSummary = await aggregateAttendanceSummary(hasFilters, dateFilter, classFilter); //done
        const resultSummary = await aggregateResultSummary(hasFilters, dateFilter, classFilter); //done
        const notificationSummary = await aggregateNotificationSummary(hasFilters, dateFilter, classFilter); //done

        const teacherTotal = await aggregateTeacherTotal(hasFilters, dateFilter, classFilter); //done

        const feeSummary = await aggregateFeeSummary(hasFilters, dateFilter, classFilter); //nothas


        console.log(notificationSummary)
        // Extracting totals from aggregated results
        const totalStudents = studentTotal.length > 0 ? studentTotal[0].total : 0;
        const totalTeachers = teacherTotal.length > 0 ? teacherTotal[0].total : 0;
        const totalResults = resultTotal.length > 0 ? resultTotal[0].total : 0;
        const passedResults = resultSummary.length > 0 ? resultSummary[0].passed : 0;
        const failedResults = resultSummary.length > 0 ? resultSummary[0].failed : 0;
        const totalFeeSum = feeSummary.length > 0 ? feeSummary[0].totalFee : 0;
        const totalPaidFeeSum = feeSummary.length > 0 ? feeSummary[0].totalPaidFee : 0;
        const totalUnpaidFeeSum = feeSummary.length > 0 ? feeSummary[0].totalUnpaidFee : 0;
        const countPaid = feeSummary.length > 0 ? feeSummary[0].countPaid : 0;
        const countUnpaid = feeSummary.length > 0 ? feeSummary[0].countUnpaid : 0;
        const totalAttendance = attendanceSummary.length > 0 ? attendanceSummary[0].totalStudents : 0;
        const totalPresent = attendanceSummary.length > 0 ? attendanceSummary[0].totalPresent : 0;
        const totalAbsent = attendanceSummary.length > 0 ? attendanceSummary[0].totalAbsent : 0;
        const totalPublicNotifications = notificationSummary.length > 0 ? notificationSummary[0].totalPublicNotifications : 0;
        const totalClassNotifications = notificationSummary.length > 0 ? notificationSummary[0].totalClassNotifications : 0;
        const totalNotifications = notificationSummary.length > 0 ? notificationSummary[0].totalCount : 0;

        return NextResponse.json({
            message: "Data Fetched Successfully",
            data: {
                totalStudents,
                totalTeachers,
                totalResults,
                passedResults,
                failedResults,
                totalFeeSum,
                totalPaidFeeSum,
                totalUnpaidFeeSum,
                totalAttendance,
                totalPresent,
                totalAbsent,
                totalPublicNotifications,
                totalClassNotifications,
                totalNotifications,
                countPaid,
                countUnpaid,
            },
            success: true
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Data Fetch Failed",
            success: false
        }, { status: 500 });
    }
}

function getDateFilter(year, month) {
    const currentYear = new Date().getFullYear();
    const filterYear = year || currentYear;
    const startDate = new Date(filterYear, month - 1, 1);
    const endDate = new Date(filterYear, month, 1);
    console.log(startDate, endDate);
    return {
        createdAt: {
            $gte: startDate,
            $lt: endDate
        }
    };
}


async function aggregateStudentTotal(hasFilters, dateFilter, classFilter) {
    const pipeline = [];
    await dbConnect();
    if (classFilter && !hasFilters) {
        const matchStage = { $match: { CurrentClass: classFilter } };
        pipeline.push(matchStage);
    }
    else if (hasFilters) {
        const matchStage = { $match: { $or: [dateFilter, { CurrentClass: classFilter }] } };
        pipeline.push(matchStage);
    }
    pipeline.push({ $group: { _id: null, total: { $sum: 1 } } });

    return await StudentModel.aggregate(pipeline);
}
async function aggregateAttendanceSummary(hasFilters, dateFilter, classFilter) {
    const pipeline = [];
    await dbConnect();
    if (classFilter && !hasFilters) {
        const matchStage = { $match: { className: classFilter } };
        pipeline.push(matchStage);
    }
    else if (hasFilters) {
        const matchStage = { $match: { $or: [dateFilter, { className: classFilter }] } };
        pipeline.push(matchStage);
    }

    pipeline.push({ $unwind: "$students" });
    pipeline.push({
        $group: {
            _id: null,
            totalStudents: { $sum: 1 },
            totalPresent: { $sum: { $cond: [{ $eq: ["$students.isPresent", true] }, 1, 0] } },
            totalAbsent: { $sum: { $cond: [{ $eq: ["$students.isPresent", false] }, 1, 0] } }
        }
    });

    return await Attendance.aggregate(pipeline);
}
async function aggregateTeacherTotal(hasFilters, dateFilter, classFilter) {
    const pipeline = [];
    await dbConnect();
    // Match stage based on filters
    if (classFilter && !hasFilters) {
        // Unwind the 'classes' array first
        pipeline.push({ $unwind: "$classes" });

        // Match based on classFilter
        pipeline.push({ $match: { "classes": classFilter } });
    } else if (hasFilters) {
        // Match based on dateFilter and optionally on classFilter
        const matchStage = {
            $match: {
                $and: [
                    dateFilter,
                    classFilter ? { "classes": classFilter } : {}
                ]
            }
        };
        pipeline.push(matchStage);
    }

    // Group stage to count distinct teachers (using '_id' as null)
    pipeline.push({ $group: { _id: null, total: { $sum: 1 } } });

    return await TeacherModel.aggregate(pipeline);
}

async function aggregateFeeSummary(hasFilters, dateFilter, classFilter) {
    const pipeline = [];
    await dbConnect();
    // Match stage based on filters
    if (classFilter && !hasFilters) {
        // Match based on classFilter directly on StudentModel's current class
        const matchStage = {
            $lookup: {
                from: "studentmodels", 
                localField: "studentId",
                foreignField: "_id",
                as: "student"
            }
        };
        pipeline.push(matchStage);
        pipeline.push({ $unwind: "$student" });
        pipeline.push({ $match: { "student.CurrentClass": classFilter } });
    } else if (hasFilters) {
        // Match based on dateFilter and optionally on classFilter
        const matchStage = {
            $match: {
                $expr: {
                    $and: [
                        { $eq: [{ $year: "$date" }, parseInt(dateFilter.createdAt.$gte.getFullYear())] },
                        { $eq: [{ $month: "$date" }, parseInt(dateFilter.createdAt.$gte.getMonth() + 1)] }
                    ]
                }
            }
        };
        pipeline.push(matchStage);

        if (classFilter) {
            // Optionally match on classFilter after filtering by date
            const classMatchStage = {
                $lookup: {
                    from: "studentmodels",  // Replace with actual collection name if different
                    localField: "studentId",
                    foreignField: "_id",
                    as: "student"
                }
            };
            pipeline.push(classMatchStage);
            pipeline.push({ $unwind: "$student" });
            pipeline.push({ $match: { "student.CurrentClass": classFilter } });
        }
    }

    pipeline.push({
        $group: {
            _id: null,
            totalFee: { $sum: "$totalFee" },
            totalPaidFee: { $sum: { $cond: [{ $eq: ["$isPaid", true] }, "$totalFee", 0] } },
            totalUnpaidFee: { $sum: { $cond: [{ $eq: ["$isPaid", false] }, "$totalFee", 0] } },
            countPaid: { $sum: { $cond: [{ $eq: ["$isPaid", true] }, 1, 0] } },
            countUnpaid: { $sum: { $cond: [{ $eq: ["$isPaid", false] }, 1, 0] } }
        }
    });

    return await FeeModel.aggregate(pipeline);
}

async function aggregateResultTotal(hasFilters, dateFilter, classFilter) {
    const pipeline = [];
    await dbConnect();
    if (classFilter && !hasFilters) {
        const matchStage = { $match: { class: classFilter } };
        pipeline.push(matchStage);
    }
    else if (hasFilters) {
        const matchStage = { $match: { $or: [dateFilter, { class: classFilter }] } };
        pipeline.push(matchStage);
    }
    pipeline.push({ $group: { _id: null, total: { $sum: 1 } } });

    return await Result.aggregate(pipeline);
}

async function aggregateNotificationSummary(hasFilters, dateFilter, classFilter) {
    const pipeline = [];
    await dbConnect();
    // Match stage based on filters
    if (hasFilters) {
        pipeline.push({ $match: dateFilter });
    } else if (classFilter) {
        const matchStage = {
            $match: {
                $or: [
                    { class: classFilter }, // Match by class if provided
                    { class: { $exists: false } } // Match documents without 'class' property
                ]
            }
        };
        pipeline.push(matchStage);
    }

    // Group stage to count notifications
    pipeline.push({
        $group: {
            _id: null,
            totalPublicNotifications: { $sum: { $cond: [{ $eq: ["$notificationFor", "public"] }, 1, 0] } },
            totalClassNotifications: { $sum: { $cond: [{ $eq: ["$notificationFor", "class"] }, 1, 0] } },
            totalCount: { $sum: 1 }
        }
    });

    return await NotificationModel.aggregate(pipeline);
}

async function aggregateResultSummary(hasFilters, dateFilter, classFilter) {
    const pipeline = [];
    await dbConnect();
    if (classFilter && !hasFilters) {
        const matchStage = { $match: { class: classFilter } };
        pipeline.push(matchStage);
    }
    else if (hasFilters) {
        const matchStage = { $match: { $or: [dateFilter, { class: classFilter }] } };
        pipeline.push(matchStage);
    }

    pipeline.push({
        $group: {
            _id: null,
            total: { $sum: 1 },
            passed: { $sum: { $cond: [{ $eq: ["$isPass", true] }, 1, 0] } },
            failed: { $sum: { $cond: [{ $eq: ["$isPass", false] }, 1, 0] } }
        }
    });

    return await Result.aggregate(pipeline);
}

