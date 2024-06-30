'use client'

import axios from "axios";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const calculateGrade = (percentage) => {
  if (percentage >= 80) return "A1";
  if (percentage >= 70) return "A";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C";
  if (percentage >= 40) return "D";
  return "Fail";
};

const Form = () => {
  const { register, handleSubmit, control, reset, watch, setValue } = useForm({
    defaultValues: {
      name: "",
      fatherName: "",
      class: "",
      section: "",
      rollNumber: "",
      cast: "",
      age: "",
      date: "",
      note: "",
      image: "",
      subjects: Array(10).fill({ name: "", totalMarks: 0, minMarks: 0, obtainedMarks: 0 }),
    }
  });

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  const fetchStudents = async (studentclass) => {
    try {
      const response = await axios.get(`/api/admin/students-by-class/${studentclass}`);
      setStudents(response.data.students);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      setLoading(false);
    }
  };

  const handleClassChange = (e) => {
    const classId = e.target.value;
    setSelectedClass(classId);
    fetchStudents(classId);
  };

  const handleStudentChange = async (e) => {
    const studentId = e.target.value;
    setSelectedStudent(studentId);
    try {
      const response = await axios.get(`/api/admin/delete-edit-get-student/${studentId}`);
      const student = response.data.student;
      setValue('name', student.Name);
      setValue('image', student.image);
      setValue('fatherName', student.FatherName);
      setValue('rollNumber', student.SID);
      setValue('class', student.CurrentClass);
      setValue('section', student.Section);
      setValue('cast', student.Caste);
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const { fields, replace } = useFieldArray({
    control,
    name: "subjects",
  });

  const watchSubjects = watch("subjects");

  const onSubmit = async (data) => {
    const filteredData = {
      ...data,
      subjects: data.subjects.filter(subject => subject.name.trim() !== "" || subject.totalMarks > 0 || subject.minMarks > 0 || subject.obtainedMarks > 0),
    };

    const response = await axios.post("/api/admin/add-result", filteredData);
    if (response.data.success) {
      alert("Result added successfully");
      reset();
    }
  };

  const totalMarks = watchSubjects.reduce((sum, subject) => sum + Number(subject.totalMarks), 0);
  const totalObtainedMarks = watchSubjects.reduce((sum, subject) => sum + Number(subject.obtainedMarks), 0);
  const percentage = totalMarks > 0 ? ((totalObtainedMarks / totalMarks) * 100).toFixed(2) : 0;
  const grade = calculateGrade(percentage);

  return (
    <div className="container mx-auto p-2 text-[8px] mt-20 px-10">
      <h1 className="text-xs mb-2 text-blue-600 pt-10">Add Result Card</h1>
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap justify-between gap-2">
          <div className="flex-grow">
            <label className="block">Class:</label>
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
          <div className="flex-grow">
            <label className="block">Student:</label>
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
          <div className="flex-grow">
            <label className="block">Name:</label>
            <input type="text" {...register("name")} className="w-full p-1 border text-[8px]" readOnly />
          </div>
          <div className="flex-grow">
            <label className="block">Father Name:</label>
            <input type="text" {...register("fatherName")} className="w-full p-1 border text-[8px]" readOnly />
          </div>
          <div className="flex-grow">
            <label className="block">Class:</label>
            <input type="text" {...register("class")} className="w-full p-1 border text-[8px]" readOnly />
          </div>
          <div className="flex-grow">
            <label className="block">Section:</label>
            <input type="text" {...register("section")} className="w-full p-1 border text-[8px]" readOnly />
          </div>
          <div className="flex-grow">
            <label className="block">Roll Number:</label>
            <input type="text" {...register("rollNumber")} className="w-full p-1 border text-[8px]" readOnly />
          </div>
          <div className="flex-grow">
            <label className="block">Cast:</label>
            <input type="text" {...register("cast")} className="w-full p-1 border text-[8px]" />
          </div>
          <div className="flex-grow">
            <label className="block">Age:</label>
            <input type="text" {...register("age")} className="w-full p-1 border text-[8px]" />
          </div>
          <div className="flex-grow">
            <label className="block">Date:</label>
            <input type="date" {...register("date")} className="w-full p-1 border text-[8px]" />
          </div>
          <div className="flex-grow">
            <label className="block">Note:</label>
            <input type="text" {...register("note")} className="w-full p-1 border text-[8px]" />
          </div>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="border p-2 mb-2">
            <h2 className="text-[8px]">Subject {index + 1}</h2>
            <div className="flex flex-wrap justify-between gap-2">
              <div className="flex-grow">
                <label className="block">Name:</label>
                <input type="text" {...register(`subjects.${index}.name`)} className="w-full p-1 border text-[8px]" />
              </div>
              <div className="flex-grow">
                <label className="block">Total Marks:</label>
                <input type="number" {...register(`subjects.${index}.totalMarks`)} className="w-full p-1 border text-[8px]" />
              </div>
              <div className="flex-grow">
                <label className="block">Min Marks:</label>
                <input type="number" {...register(`subjects.${index}.minMarks`)} className="w-full p-1 border text-[8px]" />
              </div>
              <div className="flex-grow">
                <label className="block">Obtained Marks:</label>
                <input type="number" {...register(`subjects.${index}.obtainedMarks`)} className="w-full p-1 border text-[8px]" />
              </div>
            </div>
          </div>
        ))}

        <div className="border p-2">
          <h2 className="text-[10px]"></h2>
          <div className="flex flex-wrap justify-between gap-2">
            <div className="flex-grow">
              <label className="block">Total Marks:</label>
              <input type="text" value={totalMarks} readOnly className="w-full p-1 border text-[8px]" />
            </div>
            <div className="flex-grow">
              <label className="block">Obtained Marks:</label>
              <input type="text" value={totalObtainedMarks} readOnly className="w-full p-1 border text-[8px]" />
            </div>
            <div className="flex-grow">
              <label className="block">Percentage:</label>
              <input type="text" value={percentage} readOnly className="w-full p-1 border text-[8px]" />
            </div>
            <div className="flex-grow">
              <label className="block">Grade:</label>
              <input type="text" value={grade} readOnly className="w-full p-1 border text-[8px]" />
            </div>
          </div>
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Add Result
        </button>
      </form>
    </div>
  );
};

export default Form;
