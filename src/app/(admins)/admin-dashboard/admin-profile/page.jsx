

import { auth } from '@/app/auth';
import ProfileEditForm from '@/app/components/AdminProfileEditForm';
import { redirect } from 'next/navigation';

const AdminProfile = () => {
    const session = auth()
    if(!session) { return redirect("/")}
    return (
        <ProfileEditForm />
    );
};

export default AdminProfile;
