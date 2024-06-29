import { uploads } from "@/libs/cloudinary";
import dbConnect from "@/libs/dbConnect";
import { TeacherModel } from "@/models/teacherModel";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      await dbConnect(); // Connect to MongoDB
  
      // Parse FormData from request
      const formData = await req.formData();
      const formDataObject = {};
  
      // Process formData to populate formDataObject
      formData.forEach((value, key) => {
        if (key === 'image' && value instanceof Object) {
          formDataObject[key] = value;
        } else {
          formDataObject[key] = value.includes(',') ? value.split(',') : value;
        }
      });
  
      let uploadedImage;
      if (formDataObject.image && formDataObject.image instanceof Object) {
        uploadedImage = await uploads(formDataObject.image, "image"); // Example function uploads(imageFile, "image")
      }
  
      // Extract necessary fields from formDataObject
      const { username, password, name, email, phoneNumber, classes, section, subjects } = formDataObject;
  
      // Check if username already exists
      const existingUser = await TeacherModel.findOne({ username });
      if (existingUser) {
        return NextResponse.json({ message: "Username is already taken", success: false }, { status: 400 });
      }
  
      // Hash the password
      const hashedPassword = await hash(password, 10);
  
      // Create new teacher data
      const newTeacherData = {
        username,
        password: hashedPassword,
        name,
        email,
        phoneNumber,
        classes,
        section,
        subjects,
        image: uploadedImage ? uploadedImage.secure_url : "", 
      };
  
      // Save new teacher data to database
      const newTeacher = await TeacherModel.create(newTeacherData);
  
      return NextResponse.json({ message: "Teacher added successfully", success: true }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Adding teacher failed", success: false }, { status: 400 });
    }
  }
