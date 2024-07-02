'use client';

import AdminDashboard from '@/app/components/AdminDashboard';
import TeacherDashboard from '@/app/components/TeacherDashboard';
import StudentDashboard from '@/app/components/StudentDashboard';
import { useSession } from 'next-auth/react';
import React from 'react';
import ImageUpload from '@/app/components/ImageUpload';

const DashboardPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    if (session.role === 'admin') {
      return (
        <div>
          <AdminDashboard />
        </div>
      );
    } else if (session.role === 'teacher') {
      return (
        <div className=' mt-28'>
          <TeacherDashboard />
        </div>
      );
    } else if (session.role === 'student') {
      return (
        <div className=' mt-28'>
          <StudentDashboard />
        </div>
      );
    } else {
      return <div>Unauthorized</div>;
    }
  }

  return <div>Not authenticated</div>;
};

export default DashboardPage;
