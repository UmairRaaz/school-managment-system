'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const ProfileEditForm = () => {
    const { data: session, status } = useSession();
    const [userDetails, setUserDetails] = useState(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        if (status === 'authenticated') {
            setUserDetails(session);
        }
        const fetchUserDetails = async () => {
            if (userDetails && userDetails.username) {
                try {
                    const response = await axios.get(`/api/admin/get-admin-details/${userDetails.username}`);
                    const data = response.data.user;
                    reset({
                        name: data.name || '',
                        role: data.role || 'admin',
                        email: data.email || '',
                        phoneNumber: data.phoneNumber || '',
                    });
                    setProfile({
                        name: data.name || '',
                        role: data.role || 'admin',
                        email: data.email || '',
                        phoneNumber: data.phoneNumber || '',
                        image: data.image || ''
                    });
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
        };

        if (userDetails) {
            fetchUserDetails();
        }
    }, [session, status, userDetails, reset]);


    useEffect(() => {
        if (userDetails) {
            const { username, role, user } = userDetails;
            reset({
                name: username || '',
                role: role || 'admin', // Default to 'admin' if role is not available
                email: user?.email || '',
                phoneNumber: user?.phoneNumber || '',
            });
            setProfile({
                name: username || '',
                role: role || 'admin',
                email: user?.email || '',
                phoneNumber: user?.phoneNumber || '',
                image: user?.image || ''
            });
        }
    }, [userDetails, reset]);

    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: '',
        role: 'admin',
        email: '',
        phoneNumber: '',
        image: ''
    });

    const handleEditClick = async () => {
        setIsEditing(!isEditing);
    };

    const handleFormSubmit = async (data) => {
        try {
            if (userDetails && userDetails.username) {
                const response = await axios.post("/api/admin/edit-admin-details", { ...data, username: userDetails.username });
                if (response.data.success) {
                    alert("Information updated successfully");
                    setProfile(data);
                    setIsEditing(false);
                } else {
                    alert("Failed to update information");
                }
            } else {
                alert("User details are not available");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred while updating the profile");
        }
        console.log({ ...data, username: userDetails.username });
    };


    if (status === 'loading' || !userDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex items-center justify-center mt-20'>
            <div className="bg-white my-12 shadow-md rounded p-4 w-full max-w-md">
                <div className="flex flex-col items-center justify-center">
                    <Image src={profile.image || "/profile.png"} alt="Profile" width={32} height={32} className="w-8 h-8 rounded-full mb-4" />
                    <h2 className="text-xl font-bold mb-2">{profile.name}</h2>
                    <p className="text-gray-600">{profile.role}</p>
                    <button
                        onClick={handleEditClick}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>
                {isEditing && (
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-4">
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                {...register('name', { required: true })}
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">Name is required.</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Role</label>
                            <select
                                {...register('role', { required: true })}
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                            >
                                <option value="admin">Admin</option>
                                <option value="teacher">Teacher</option>
                            </select>
                            {errors.role && <p className="text-red-500 text-xs mt-1">Role is required.</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">Email is required.</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Phone Number</label>
                            <input
                                type="text"
                                {...register('phoneNumber', { required: true })}
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">Phone Number is required.</p>}
                        </div>

                        <button
                            type="submit"
                            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                        >
                            Save
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ProfileEditForm;