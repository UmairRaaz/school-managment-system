import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    SID: {
        type: Number,
        required: true,
        default: 0
    },
    Name: {
        type: String,
        required: true
    },
    FatherName: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    AdmissionDate: {
        type: Date,
        required: true
    },
    SeatNumber: {
        type: Number,
        default: 0
    },
    AdmissionClass: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    GRNo: {
        type: String,
        required: true
    },
    Section: {
        type: String,
        required: true
    },
    CNICNumber: {
        type: String,
        required: true
    },
    Caste: {
        type: String,
        required: true
    },
    DateOfBirth: {
        type: Date,
        required: true
    },
    FamilyNumber: {
        type: String,
        required: true
    },
    CurrentClass: {
        type: String,
        required: true
    },
    MobileNumber: {
        type: String,
        required: true
    },
    PlaceOfBirth: {
        type: String,
        required: true
    },
    Religion: {
        type: String,
        required: true
    },
    ReligionStatus: {
        type: String,
        required: true
    },
    Reason: {
        type: String,
        required: false
    },
    Remarks: {
        type: String,
        required: false
    },
    AdmissionNote: {
        type: String,
        required: false
    },
    Nationality: {
        type: String,
        required: true
    },
    LeaveDate: {
        type: Date,
        required: false
    },
    LastSchool: {
        type: String,
        required: false
    },
    LastSchoolGroup: {
        type: String,
        required: false
    },
    AdmissionFee: {
        type: Number,
        required: true
    },
    AdmissionFeeDiscount: {
        type: Number,
        required: false,
        default: 0
    },
    ApprovedAdmissionFee: {
        type: Number,
        required: true
    },
    LabCharges: {
        type: Number,
        required: true
    },
    LabChargesDiscount: {
        type: Number,
        required: false,
        default: 0
    },
    ApprovedLabChargesFee: {
        type: Number,
        required: true
    },
    TuitionFee: {
        type: Number,
        required: true
    },
    TuitionFeeDiscount: {
        type: Number,
        required: false,
        default: 0
    },
    ApprovedTuitionFee: {
        type: Number,
        required: true
    },
    CoursePayment: {
        type: Number,
        required: true
    },
    CoursePaymentDiscount: {
        type: Number,
        required: false,
        default: 0
    },
    ApprovedCoursePayment: {
        type: Number,
        required: true
    },
    StationaryCharges: {
        type: Number,
        required: true
    },
    AnnualCharges: {
        type: Number,
        required: true
    },
    SchoolFee: {
        type: Number,
        required: true
    },
    Arrears: {
        type: Number,
        required: false,
        default: 0
    },
    StudentImage: {
        type: String,
        required: false
    }
});


export const StudentModel = mongoose.models?.StudentModel || mongoose.model("StudentModel",studentSchema )
