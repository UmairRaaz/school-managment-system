

import { uploads } from '@/libs/cloudinary';
import dbConnect from '@/libs/dbConnect';
import { TeacherModel } from '@/models/teacherModel';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const teacher = await TeacherModel.findOneAndDelete({ _id: id });

        return NextResponse.json({ message: 'User  Deleted', success: true }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user details:', error);
        return NextResponse.json({ message: 'Deleting user failed', success: false }, { status: 500 });
    }
}

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const teacher = await TeacherModel.findOne({ _id: id });
        console.log("GET TEACHER DETAILS : ", teacher)
        return NextResponse.json({ message: 'Teacher Fetched Successfully', teacher: teacher, success: true }, { status: 200 });
    } catch (error) {
        console.error('Error fetching teacher details:', error);
        return NextResponse.json({ message: 'Teacher fetching failed', success: false }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
      await dbConnect();
      const { id } = params;
      const formData = await req.formData();
  
      const formDataObject = {};
  
      formData.forEach((value, key) => {
        if (key === 'image' && typeof value === 'object' && value.name && value.type) {
          formDataObject[key] = value;
        } else {
          formDataObject[key] = value.includes(',') ? value.split(',') : value;
        }
      });
  
      const currentTeacher = await TeacherModel.findById(id);
      if (!currentTeacher) {
        return NextResponse.json({ message: 'Teacher not found', success: false }, { status: 404 });
      }
  
      if (formDataObject.username && formDataObject.username !== currentTeacher.username) {
        const usernameTaken = await TeacherModel.findOne({ username: formDataObject.username });
        if (usernameTaken) {
          return NextResponse.json({ message: 'Username is already taken', success: false }, { status: 400 });
        }
      }
  
      let imageLink = currentTeacher.image;
  
    
      if (formDataObject.image && typeof formDataObject.image === 'object') {
        const uploadedImage = await uploads(formDataObject.image, "image");
        imageLink = uploadedImage.secure_url;
      }
  
      const updatedTeacher = await TeacherModel.findByIdAndUpdate(
        id,
        { ...formDataObject, image: imageLink },
        { new: true }
      );
  
      // Return a success response with JSON
      return NextResponse.json({ message: 'Teacher Edited Successfully', success: true }, { status: 200 });
    } catch (error) {
      // Handle errors and return an error response with JSON
      console.error('Error Editing teacher details:', error);
      return NextResponse.json({ message: 'Teacher Editing failed', success: false }, { status: 500 });
    }
  }