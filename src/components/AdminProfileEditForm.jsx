"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = ({
  register,
  errors,
  showPassword,
  togglePasswordVisibility,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="password" className="text-xs block text-gray-700">
        Password
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          {...register("password", { required: true })}
          className={`mt-1 p-2 border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } rounded w-full pr-10`}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
      {errors.password && (
        <p className="text-red-500 text-xs mt-1">Password is required.</p>
      )}
    </div>
  );
};

const AdminProfileEditForm = () => {
  const { data: session, status } = useSession();
  const [userDetails, setUserDetails] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    password: "",
    role: "admin",
    email: "",
    phoneNumber: "",
    image: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    if (status === "authenticated") {
      setUserDetails(session);
    }
    const fetchUserDetails = async () => {
      if (userDetails && userDetails.username) {
        try {
          const response = await axios.get(
            `/api/admin/get-admin-details/${userDetails.username}`
          );
          const data = response.data.user;
          reset({
            name: data.name || "",
            role: data.role || "admin",
            email: data.email || "",
            username: data.username || "",
            password: data.password || "",
            phoneNumber: data.phoneNumber || "",
          });
          setProfile({
            name: data.name || "",
            role: data.role || "admin",
            email: data.email || "",
            username: data.username || "",
            password: data.password || "",
            phoneNumber: data.phoneNumber || "",
            image: data.image || "",
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

  const handleEditClick = async () => {
    setIsEditing(!isEditing);
  };

  const handleFormSubmit = async (data) => {
    console.log(data)
    try {
      if (userDetails && userDetails.username) {
        const response = await axios.put(`/api/admin/edit-admin-details/${userDetails._id}`, {
          ...data,
        });
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
  };

  if (status === "loading" || !userDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div> Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center mt-10 pt-10">
      <div className="bg-white p-8 w-full max-w-xl">
        <div className="flex flex-col md:flex-row items-center md:items-start max-w-4xl mx-auto">
          <div className="flex justify-center md:w-1/2 mb-6 md:mb-0">
            <div className="relative w-36 h-36 md:w-56 md:h-56 overflow-hidden rounded-md border-2 border-gray-300 hover:border-black transform hover:scale-105 transition duration-300 ease-in-out">
              <Image
                src={profile.image || "/moon.jpg"}
                alt="Profile"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          </div>
          <div className="md:w-1/2 md:pl-6 text-center md:text-left ">
            <h2 className="text-xl font-bold mb-6">Name: {profile.name}</h2>
            <p className="text-sm mb-2 ">Username: {profile.username}</p>
            <p className="text-sm mb-2">
              Password:{" "}
              <span className="inline-flex items-center">
                {showPassword
                  ? profile.password
                  : "*".repeat(profile.password.length)}
                <button
                  type="button"
                  className="ml-2 text-sm"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </span>
            </p>
            <p className="text-sm mb-2">Role: {profile.role}</p>
            <p className="inline-block text-xs mb-4">
              Phone Number: {profile.phoneNumber}
            </p>
            <button
              onClick={handleEditClick}
              className={`px-12 py-2 ml-4 text-black font-semibold hover:bg-black hover:text-white border border-black transition-all duration-300 ease-in-out 
              ${isEditing ? "block md:inline-block" : "inline-block "}`}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {isEditing && (
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="mt-8 space-y-4 max-w-md mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-xs block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: true })}
                  className={`mt-1 p-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">Name is required.</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-xs block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                  className={`mt-1 p-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    Email is required.
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="username"
                  className="text-xs block text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  {...register("username", { required: true })}
                  className={`mt-1 p-2 border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } rounded`}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">
                    Username is required.
                  </p>
                )}
              </div>

              <PasswordInput
                register={register}
                errors={errors}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
              />

              <div className="flex flex-col">
                <label htmlFor="role" className="text-xs block text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  {...register("role", { required: true })}
                  className={`mt-1 p-2 border ${
                    errors.role ? "border-red-500" : "border-gray-300"
                  } rounded`}
                >
                  <option value="admin">Admin</option>
                  <option value="teacher">Teacher</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">Role is required.</p>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="phoneNumber"
                  className="text-xs block text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  {...register("phoneNumber", { required: true })}
                  className={`mt-1 p-2 border ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  } rounded`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    Phone Number is required.
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-6 py-2 w-full text-black font-semibold hover:bg-black hover:text-white border border-black transition-all duration-300 ease-in-out"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminProfileEditForm;
