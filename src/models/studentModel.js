import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    SID: {
        type: String,
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
    age : {
        type: String,
        required: true,
    },
    AdmissionDate: {
        type: Date,
        required: true
    },
    SeatNumber: {
        type: String,
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
        type: String,
        required: true
    },
    AdmissionFeeDiscount: {
        type: String,
        required: false,
        default: 0
    },
    ApprovedAdmissionFee: {
        type: String,
        required: true
    },
    LabCharges: {
        type: String,
        required: true
    },
    LabChargesDiscount: {
        type: String,
        required: false,
        default: 0
    },
    ApprovedLabChargesFee: {
        type: String,
        required: true
    },
    TuitionFee: {
        type: String,
        required: true
    },
    TuitionFeeDiscount: {
        type: String,
        required: false,
        default: 0
    },
    ApprovedTuitionFee: {
        type: String,
        required: true
    },
    CoursePayment: {
        type: String,
        required: true
    },
    CoursePaymentDiscount: {
        type: String,
        required: false,
        default: 0
    },
    ApprovedCoursePayment: {
        type: String,
        required: true
    },
    StationaryCharges: {
        type: String,
        required: true
    },
    AnnualCharges: {
        type: String,
        required: true
    },
    SchoolFee: {
        type: String,
        required: true
    },
    Arrears: {
        type: String,
        required: false,
        default: 0
    },
    image: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default:"student"
    }
});


export const StudentModel = mongoose.models?.StudentModel || mongoose.model("StudentModel",studentSchema )
