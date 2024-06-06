import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

const classesOptions = Array.from({ length: 10 }, (_, i) => (i + 1).toString());
const subjectsOptions = [
    "Mathematics",
    "English",
    "Science",
    "History",
    "Geography",
    "Physical Education",
    "Art",
    "Music",
    "Computer Science",
    "Biology"
];

const TeacherEditForm = ({ teacherDetails }) => {
    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: {
                username: teacherDetails?.username || "",
                name: teacherDetails?.name || "",
                email: teacherDetails?.email || "",
                phoneNumber: teacherDetails?.phoneNumber || "",
                classes: teacherDetails?.classes || [],
                subjects: teacherDetails?.subjects || []
            }
        }
    );
    const router = useRouter()
    const onSubmit = async (data) => {
        data.classes = data.classes || [];
        data.subjects = data.subjects || [];
        try {
            const response = await axios.put(`/api/admin/delete-get-edit-teacher/${teacherDetails._id}`, data);
            console.log(response);
            if (response.data.success) {
                alert("Teacher Edited Successfully");
                router.push("/admin-dashboard/all-teachers")
            } else {
                alert("Username is taken");
            }
        } catch (error) {
            console.error("Error editing teacher:", error);
            alert("Username is taken");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 mt-20">
            <h1 className='text-2xl my-4'>Edit Teacher</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        {...register('username', { required: true })}
                        className={`mt-1 block w-full p-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    />
                    {errors.username && <span className="text-red-500 text-sm">Username is required</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        {...register('name', { required: true })}
                        className={`mt-1 block w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    />
                    {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: true })}
                        className={`mt-1 block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    />
                    {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        {...register('phoneNumber', { required: true })}
                        className={`mt-1 block w-full p-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    />
                    {errors.phoneNumber && <span className="text-red-500 text-sm">Phone Number is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Classes</label>
                    <div className="mt-1 flex gap-4 items-center justify-center">
                        {classesOptions.map(classOption => (
                            <div key={classOption} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={classOption}
                                    {...register('classes')}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-700">{classOption}</label>
                            </div>
                        ))}
                    </div>
                    {errors.classes && <span className="text-red-500 text-sm">At least one class is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Subjects</label>
                    <div className="mt-1 gap-4 flex items-center justify-center">
                        {subjectsOptions.map(subjectOption => (
                            <div key={subjectOption} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={subjectOption}
                                    {...register('subjects')}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-700">{subjectOption}</label>
                            </div>
                        ))}
                    </div>
                    {errors.subjects && <span className="text-red-500 text-sm">At least one subject is required</span>}
                </div>

                <div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default TeacherEditForm;
