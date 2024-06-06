import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
    return (
        <div className="bg-gray-800 text-white h-screen fixed top-0 left-0 w-[20%] flex-shrink-0">
            <div className="p-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <ul className="mt-4">
                    <Link className="mb-2" href="/admin-dashboard/admin-profile">
                        <p  className="block py-2 px-4 hover:bg-gray-700">Edit Admin</p>
                    </Link>
                    <Link className="mb-2" href="/admin-dashboard/student-details" >
                        <p className="block py-2 px-4 hover:bg-gray-700">Add Students</p>
                    </Link>
                    <Link className="mb-2" href="/admin-dashboard/add-teachers" >
                        <p className="block py-2 px-4 hover:bg-gray-700">Add Teacher</p>
                    </Link>
                    <Link className="mb-2" href="/admin-dashboard/all-teachers" >
                        <p className="block py-2 px-4 hover:bg-gray-700">All Teachers List</p>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
