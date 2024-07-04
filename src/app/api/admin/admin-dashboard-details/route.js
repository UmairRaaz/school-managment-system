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
    console.log(filterData);

    try {
        await dbConnect();

        // Determine if filters are provided
        const hasFilters = Object.values(filterData).some(value => value !== "");

        // Total number of students
        const studentTotal = await StudentModel.aggregate([
            // ...hasFilters ? [{ $match: {CurrentClass: filterData.class} }] : [],
            { $group: { _id: null, total: { $sum: 1 } } }
        ]);

        // Total number of teachers
        const teacherTotal = await TeacherModel.aggregate([
            // ...hasFilters ? [{ $match: filterData }] : [],
            { $group: { _id: null, total: { $sum: 1 } } }
        ]);

        // Total number of results
        const resultTotal = await Result.aggregate([
            // ...hasFilters ? [{ $match: filterData }] : [],
            { $group: { _id: null, total: { $sum: 1 } } }
        ]);

        // Total fees summary (including paid and unpaid)
        const feeSummary = await FeeModel.aggregate([
            // ...hasFilters ? [{ $match: filterData }] : [],
            {
                $group: {
                    _id: null,
                    totalFee: { $sum: "$totalFee" },
                    totalPaidFee: {
                        $sum: {
                            $cond: [{ $eq: ["$isPaid", true] }, "$totalFee", 0]
                        }
                    },
                    totalUnpaidFee: {
                        $sum: {
                            $cond: [{ $eq: ["$isPaid", false] }, "$totalFee", 0]
                        }
                    },
                    countPaid: {
                        $sum: { $cond: [{ $eq: ["$isPaid", true] }, 1, 0] }
                    },
                    countUnpaid: {
                        $sum: { $cond: [{ $eq: ["$isPaid", false] }, 1, 0] }
                    }
                }
            }
        ]);

        // Total attendance summary (present and absent)
        const attendanceSummary = await Attendance.aggregate([
            // ...hasFilters ? [{ $match: filterData }] : [],
            { $unwind: "$students" }, 
            {
                $group: {
                    _id: null,
                    totalStudents: { $sum: 1 },
                    totalPresent: { $sum: { $cond: [{ $eq: ["$students.isPresent", true] }, 1, 0] } },
                    totalAbsent: { $sum: { $cond: [{ $eq: ["$students.isPresent", false] }, 1, 0] } }
                }
            }
        ]);

        // Total notification summary (public and class notifications)
        const notificationSummary = await NotificationModel.aggregate([
            // ...hasFilters ? [{ $match: filterData }] : [],
            {
                $group: {
                    _id: null,
                    totalPublicNotifications: {
                        $sum: {
                            $cond: [{ $eq: ["$notificationFor", "public"] }, 1, 0]
                        }
                    },
                    totalClassNotifications: {
                        $sum: {
                            $cond: [{ $eq: ["$notificationFor", "class"] }, 1, 0]
                        }
                    },
                    totalCount: { $sum: 1 } // Total count of all notifications
                }
            }
        ]);

        // Result summary
        const resultSummary = await Result.aggregate([
            // ...hasFilters ? [{ $match: filterData }] : [],
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    passed: { $sum: { $cond: [{ $eq: ["$isPass", true] }, 1, 0] } },
                    failed: { $sum: { $cond: [{ $eq: ["$isPass", false] }, 1, 0] } }
                }
            }
        ]);

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
