'use client';

import AdminDashboard from '@/components/AdminDashboard';
import TeacherDashboard from '@/components/TeacherDashboard';
import StudentDashboard from '@/components/StudentDashboard';
import { useSession } from 'next-auth/react';
import React from 'react';
import ImageUpload from '@/components/ImageUpload';

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
