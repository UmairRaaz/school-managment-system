'use client';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

const classesOptions = Array.from({ length: 10 }, (_, i) => (i + 1).toString());
const subjectsOptions = [
    "Mathematics",
    "English",
    "Science",
    "Urdu",
    "Sindhi",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer",
    "Drawing"
];
const sections = [
    "A",
    "B",
    "C",
];

const TeacherForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        data.classes = data.classes || [];
        data.subjects = data.subjects || [];
        data.section = data.section || [];
        try {
            const response = await axios.post("/api/admin/add-teacher", data);
            console.log(response);
            if (response.data.success) {
                alert("Teacher Added Successfully");
                reset();
            } else {
                alert("Username is taken");
            }
        } catch (error) {
            console.error("Error adding teacher:", error);
            alert("Username is taken");
        }
    };

    return (
        <div className=" p-11 mt-20 bg-white  ">
             <h1 className="text-sm flex justify-start items-start text-blue-500 mb-10 text-center">Add Teacher</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-black">Username</label>
                    <input
                        type="text"
                        {...register('username', { required: true })}
                        className={`mt-1 block w-full p-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    />
                    {errors.username && <span className="text-red-500 text-sm">Username is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-black">Password</label>
                    <input
                        type="password"
                        {...register('password', { required: true })}
                        className={`mt-1 block w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    />
                    {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-black">Name</label>
                    <input
                        type="text"
                        {...register('name', { required: true })}
                        className={`mt-1 block w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    />
                    {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-black">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: true })}
                        className={`mt-1 block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    />
                    {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-black">Phone Number</label>
                    <input
                        type="text"
                        {...register('phoneNumber', { required: true })}
                        className={`mt-1 block w-full p-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    />
                    {errors.phoneNumber && <span className="text-red-500 text-sm">Phone Number is required</span>}
                </div>

                <div className="col-span-1 md:col-span-3">
                    <label className="block text-sm font-medium text-black">Classes</label>
                    <div className="mt-1 flex flex-wrap gap-2">
                        {classesOptions.map(classOption => (
                            <div key={classOption} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={classOption}
                                    {...register('classes')}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-black">{classOption}</label>
                            </div>
                        ))}
                    </div>
                    {errors.classes && <span className="text-red-500 text-sm">At least one class is required</span>}
                </div>
                <div className="col-span-1 md:col-span-3">
                    <label className="block text-sm font-medium text-black">Sections</label>
                    <div className="mt-1 flex flex-wrap gap-2">
                        {sections.map((sectionOption, index) => (
                            <div key={index} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={sectionOption}
                                    {...register('section')}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-black">{sectionOption}</label>
                            </div>
                        ))}
                    </div>
                    {errors.section && <span className="text-red-500 text-sm">At least one section is required</span>}
                </div>

                <div className="col-span-1 md:col-span-3">
                    <label className="block text-sm font-medium text-black">Subjects</label>
                    <div className="mt-1 flex flex-wrap gap-2">
                        {subjectsOptions.map(subjectOption => (
                            <div key={subjectOption} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={subjectOption}
                                    {...register('subjects')}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-black">{subjectOption}</label>
                            </div>
                        ))}
                    </div>
                    {errors.subjects && <span className="text-red-500 text-sm">At least one subject is required</span>}
                </div>

                <div className="col-span-1 md:col-span-3 flex items-end justify-end">
                    <button type="submit" className="border bg-black text-white p-3 rounded-md hover:bg-blue-500 hover:text-white transition duration-300">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default TeacherForm;
