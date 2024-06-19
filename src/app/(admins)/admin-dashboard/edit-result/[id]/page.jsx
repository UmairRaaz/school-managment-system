'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

const calculateGrade = (percentage) => {
  if (percentage >= 80) return 'A1';
  if (percentage >= 70) return 'A';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 40) return 'D';
  return 'Fail';
};

const EditResult = ({ params }) => {
  const { id } = params;
  const { register, handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      name: '',
      fatherName: '',
      class: '',
      section: '',
      rollNumber: '',
      cast: '',
      age: '',
      date: '',
      note: '',
      subjects: Array(10).fill({ name: '', totalMarks: 0, minMarks: 0, obtainedMarks: 0 }),
    },
  });
  const router = useRouter()
  const { fields, replace } = useFieldArray({
    control,
    name: 'subjects',
  });

  const [loading, setLoading] = useState(true);
  const watchSubjects = watch('subjects');

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get(`/api/admin/delete-edit-get-result/${id}`);
        const result = response.data.result;

        // Ensure the subjects array has at least 10 fields
        const subjects = result.subjects || [];
        if (subjects.length < 10) {
          subjects.push(...Array(10 - subjects.length).fill({ name: '', totalMarks: 0, minMarks: 0, obtainedMarks: 0 }));
        }

        reset(result);
        replace(subjects);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch result', error);
        setLoading(false);
      }
    };

    fetchResult();
  }, [id, reset, replace]);

  const onSubmit = async (data) => {
    const filteredData = {
      ...data,
      subjects: data.subjects.filter(
        (subject) => subject.name.trim() !== '' || subject.totalMarks > 0 || subject.minMarks > 0 || subject.obtainedMarks > 0
      ),
    };
    try {
      const response = await axios.put(`/api/admin/delete-edit-get-result/${id}`, filteredData);
      if (response.data.success) {
        alert('Result updated successfully');
      }
      router.push("/admin-dashboard/all-results")
    } catch (error) {
      console.error('Failed to update result', error);
      alert('Failed to update result');
    }
  };

  const totalMarks = watchSubjects.reduce((sum, subject) => sum + Number(subject.totalMarks), 0);
  const totalObtainedMarks = watchSubjects.reduce((sum, subject) => sum + Number(subject.obtainedMarks), 0);
  const percentage = totalMarks > 0 ? ((totalObtainedMarks / totalMarks) * 100).toFixed(2) : 0;
  const grade = calculateGrade(percentage);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2 text-[8px] mt-20 px-10">
      <h1 className="text-xs mb-2 text-blue-600 pt-10">Edit Result Card</h1>
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap justify-between gap-2">
          <div className="flex-grow">
            <label className="block">Name:</label>
            <input type="text" {...register('name')} className="w-full p-1 border text-[8px]" />
          </div>
          <div className="flex-grow">
            <label className="block">Father Name:</label>
            <input type="text" {...register('fatherName')} className="w-full p-1 border text-[8px]" />
          </div>
          <div className="flex-grow">
            <label className="block">Class:</label>
            <input type="text" {...register('class')} className="w-full p-1 border text-[8px]" />
          </div>
          <div className="flex-grow">
            <label className="block">Section:</label>
            <input type="text" {...register('section')} className="w-full p-1 border text-[8px]" />
          </div>
          <div className="flex-grow">
            <label className="block">Roll Number:</label>
            <input type="text" {...register('rollNumber')} className="w-full p-1 border text-[8px]" />
          </div>
          <div className="flex-grow">
            <label className="block">Cast:</label>
            <input type="text" {...register('cast')} className="w-full p-1 border text-[8px]" />
          </div>
          <div className="flex-grow">
            <label className="block">Age:</label>
            <input type="text" {...register('age')} className="w-full p-1 border text-[8px]" />
          </div>
          <div className="flex-grow">
            <label className="block">Date:</label>
            <input type="date" {...register('date')} className="w-full p-1 border text-[8px]" />
          </div>
          <div className="flex-grow">
            <label className="block">Note:</label>
            <input type="text" {...register('note')} className="w-full p-1 border text-[8px]" />
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
              <input type="number" value={totalMarks} readOnly className="w-full p-1 border text-[8px] bg-gray-100" />
            </div>
            <div className="flex-grow">
              <label className="block">Obtained Marks:</label>
              <input type="number" value={totalObtainedMarks} readOnly className="w-full p-1 border text-[8px] bg-gray-100" />
            </div>
            <div className="flex-grow">
              <label className="block">Percentage:</label>
              <input type="text" value={`${percentage}%`} readOnly className="w-full p-1 border text-[8px] bg-gray-100" />
            </div>
            <div className="flex-grow">
              <label className="block">Grade:</label>
              <input type="text" value={grade} readOnly className="w-full p-1 border text-[8px] bg-gray-100" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-6 py-2 w-full text-black font-semibold hover:bg-black hover:text-white border border-black transition-all duration-300 ease-in-out"
          >
            Update Result
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditResult;
