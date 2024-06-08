'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const StudentPreviewPage = ({ params }) => {
    const [student, setStudentDetails] = useState({})
    const id = params.id
    const [loading, setIsLoading] = useState(true);

    const getStudentDetails = async (id) => {
        try {
            console.log("id", id)
            const response = await axios.get(`/api/admin/delete-edit-get-student/${id}`)
            console.log(response.data.student)
            setStudentDetails(response.data.student)
        } catch (error) {
            console.error("Error fetching student details:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getStudentDetails(id)
    }, [])
    return (
        <div>
            {loading ? "Loading" :
                (
                    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
                        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Student Information</h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col items-center md:col-span-1">
                                <img
                                    src={student.StudentImage || 'default_image_url.jpg'}
                                    alt="Student"
                                    className="w-40 h-40 rounded-full object-cover mb-4"
                                />
                                <div className="text-center">
                                    <p className="text-xl font-semibold">{student.Name}</p>
                                    <p className="text-gray-600">{student.Username}</p>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <p><span className="font-semibold">SID:</span> {student.SID}</p>
                                        <p><span className="font-semibold">Father's Name:</span> {student.FatherName}</p>
                                        <p><span className="font-semibold">Gender:</span> {student.Gender}</p>
                                        <p><span className="font-semibold">Admission Date:</span> {new Date(student.AdmissionDate).toLocaleDateString()}</p>
                                        <p><span className="font-semibold">Seat Number:</span> {student.SeatNumber}</p>
                                        <p><span className="font-semibold">Admission Class:</span> {student.AdmissionClass}</p>
                                        <p><span className="font-semibold">Address:</span> {student.Address}</p>
                                        <p><span className="font-semibold">GR No:</span> {student.GRNo}</p>
                                        <p><span className="font-semibold">Section:</span> {student.Section}</p>
                                        <p><span className="font-semibold">CNIC Number:</span> {student.CNICNumber}</p>
                                        <p><span className="font-semibold">Caste:</span> {student.Caste}</p>
                                        <p><span className="font-semibold">Date of Birth:</span> {new Date(student.DateOfBirth).toLocaleDateString()}</p>
                                        <p><span className="font-semibold">Family Number:</span> {student.FamilyNumber}</p>
                                        <p><span className="font-semibold">Current Class:</span> {student.CurrentClass}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p><span className="font-semibold">Mobile Number:</span> {student.MobileNumber}</p>
                                        <p><span className="font-semibold">Place of Birth:</span> {student.PlaceOfBirth}</p>
                                        <p><span className="font-semibold">Religion:</span> {student.Religion}</p>
                                        <p><span className="font-semibold">Religion Status:</span> {student.ReligionStatus}</p>
                                        {student.Reason && <p><span className="font-semibold">Reason:</span> {student.Reason}</p>}
                                        {student.Remarks && <p><span className="font-semibold">Remarks:</span> {student.Remarks}</p>}
                                        {student.AdmissionNote && <p><span className="font-semibold">Admission Note:</span> {student.AdmissionNote}</p>}
                                        <p><span className="font-semibold">Nationality:</span> {student.Nationality}</p>
                                        {student.LeaveDate && <p><span className="font-semibold">Leave Date:</span> {new Date(student.LeaveDate).toLocaleDateString()}</p>}
                                        {student.LastSchool && <p><span className="font-semibold">Last School:</span> {student.LastSchool}</p>}
                                        {student.LastSchoolGroup && <p><span className="font-semibold">Last School Group:</span> {student.LastSchoolGroup}</p>}
                                        <p><span className="font-semibold">Admission Fee:</span> {student.AdmissionFee}</p>
                                        <p><span className="font-semibold">Approved Admission Fee:</span> {student.ApprovedAdmissionFee}</p>
                                        <p><span className="font-semibold">Lab Charges:</span> {student.LabCharges}</p>
                                        <p><span className="font-semibold">Approved Lab Charges Fee:</span> {student.ApprovedLabChargesFee}</p>
                                        <p><span className="font-semibold">Tuition Fee:</span> {student.TuitionFee}</p>
                                        <p><span className="font-semibold">Approved Tuition Fee:</span> {student.ApprovedTuitionFee}</p>
                                        <p><span className="font-semibold">Course Payment:</span> {student.CoursePayment}</p>
                                        <p><span className="font-semibold">Approved Course Payment:</span> {student.ApprovedCoursePayment}</p>
                                        <p><span className="font-semibold">Stationary Charges:</span> {student.StationaryCharges}</p>
                                        <p><span className="font-semibold">Annual Charges:</span> {student.AnnualCharges}</p>
                                        <p><span className="font-semibold">School Fee:</span> {student.SchoolFee}</p>
                                        {student.Arrears && <p><span className="font-semibold">Arrears:</span> {student.Arrears}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default StudentPreviewPage