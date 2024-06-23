'use client'
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function AdminAddClassFees() {
  const { register, handleSubmit, watch, setValue, reset } = useForm();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  const fetchStudents = async (studentclass) => {
    try {
      console.log(studentclass)
      const response = await axios.get(`/api/admin/students-by-class/${studentclass}`);
      setStudents(response.data.students);
      console.log(response.data.students);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      setLoading(false);
    }
  };

  const handleClassChange = (e) => {
    const classId = e.target.value;
    console.log(classId)
    setSelectedClass(classId);
    fetchStudents(classId);
  };

  const handleStudentChange = async (e) => {
    const studentId = e.target.value;
    setSelectedStudent(studentId);
    console.log(selectedStudent)
    try {
      const response = await axios.get(`/api/admin/delete-edit-get-student/${studentId}`);
      const student = response.data.student;
      setValue('studentName', student.Name);
      setValue('fatherName', student.FatherName);
      setValue('rollNo', student.SID);
      setValue('className', student.CurrentClass);
      setValue('section', student.Section);
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const feeData = {
        studentId: selectedStudent,
        isPaid: data.feeStatus === "paid",
        date: data.date,
        AdmissionFee: data.admission,
        MonthlyFee: data.monthly,
        TuitionFee: data.tuition,
        Discount: data.discount,
        Penalty: data.penalty,
        month: new Date(data.date).toLocaleString('default', { month: 'long' }),
        year: new Date(data.date).getFullYear(),
        feeDescription: data.feeDescription
      };
      const response = await axios.post("/api/admin/admin-add-fee", feeData);
      if(response.data.success){
        alert("Fee added successfully")
        reset()
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const feeValues = watch([
    "admission",
    "monthly",
    "tuition",
    "discount",
    "penalty",
  ]);
  const total =
    (parseFloat(feeValues[0]) || 0) +
    (parseFloat(feeValues[1]) || 0) +
    (parseFloat(feeValues[2]) || 0) -
    (parseFloat(feeValues[3]) || 0) +
    (parseFloat(feeValues[4]) || 0);

  useEffect(() => {
    setValue("total", total.toFixed(2));
  }, [feeValues, setValue, total]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center mt-10 pt-10">
      <div className="bg-white p-8 w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-start text-center text-sm text-blue-500 mb-4">
            Add Class Fees
          </div>
          <div className="flex justify-start text-center text-sm text-blue-500 mt-4">
            Student Information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label htmlFor="classId" className="text-xs block text-gray-700">
                Class
              </label>
              <select
                id="classId"
                name="classId"
                onChange={handleClassChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              >
                <option value="">Select a class</option>
                {[...Array(10).keys()].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="studentId" className="text-xs block text-gray-700">
                Student
              </label>
              <select
                id="studentId"
                name="studentId"
                onChange={handleStudentChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              >
                <option value="">Select a student</option>
                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="studentName" className="text-xs block text-gray-700">
                Student Name
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("studentName", { required: true })}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="fatherName" className="text-xs block text-gray-700">
                Father Name
              </label>
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("fatherName", { required: true })}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="rollNo" className="text-xs block text-gray-700">
                Roll No
              </label>
              <input
                type="text"
                id="rollNo"
                name="rollNo"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("rollNo", { required: true })}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="className" className="text-xs block text-gray-700">
                Class
              </label>
              <input
                type="text"
                id="className"
                name="className"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("className", { required: true })}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="section" className="text-xs block text-gray-700">
                Section
              </label>
              <input
                type="text"
                id="section"
                name="section"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("section", { required: true })}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="feeDescription" className="text-xs block text-gray-700">
                Fee Description
              </label>
              <input
                type="text"
                id="feeDescription"
                name="feeDescription"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("feeDescription")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="feeStatus" className="text-xs block text-gray-700">
                Fee Status
              </label>
              <select
                id="feeStatus"
                name="feeStatus"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("feeStatus")}
              >
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="date" className="text-xs block text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("date",{ required: true})}
              />
            </div>
          </div>
          <div className="flex justify-start text-center text-sm text-blue-500 mt-4">
            Fees
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label htmlFor="admission" className="text-xs block text-gray-700">
                Admission Fee
              </label>
              <input
                type="number"
                id="admission"
                name="admission"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("admission")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="monthly" className="text-xs block text-gray-700">
                Monthly Fee
              </label>
              <input
                type="number"
                id="monthly"
                name="monthly"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("monthly", {required: true})}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="tuition" className="text-xs block text-gray-700">
                Tuition Fee
              </label>
              <input
                type="number"
                id="tuition"
                name="tuition"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("tuition")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="discount" className="text-xs block text-gray-700">
                Discount
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("discount")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="penalty" className="text-xs block text-gray-700">
                Penalty
              </label>
              <input
                type="number"
                id="penalty"
                name="penalty"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("penalty")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="total" className="text-xs block text-gray-700">
                Total Fee
              </label>
              <input
                type="text"
                id="total"
                name="total"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("total")}
                readOnly
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminAddClassFees;
