import { auth } from '@/app/auth';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <>
    <div>AdminDashBoard</div>
    </>
  )
}

export default page