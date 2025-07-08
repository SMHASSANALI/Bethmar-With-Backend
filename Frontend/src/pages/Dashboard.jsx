// src/pages/admin/Dashboard.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);
    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/admin/post-blog" className="p-6 bg-white shadow rounded hover:bg-gray-100">
                    ✍️ Post New Blog
                </Link>
                <Link to="/admin/post-job" className="p-6 bg-white shadow rounded hover:bg-gray-100">
                    💼 Post New Job
                </Link>
                {/* Edit blog and delete blog */}
                <Link to="/admin/edit-blog" className="p-6 bg-white shadow rounded hover:bg-gray-100">
                    📝 Edit & Delete Blog
                </Link>
                {/* Edit job and delete job */}
                <Link to="/admin/edit-job" className="p-6 bg-white shadow rounded hover:bg-gray-100">
                    🛠️ Edit & Delete Job
                </Link>
                <Link to="/admin/edit-home-page" className="p-6 bg-white shadow rounded hover:bg-gray-100">
                    🛠️ Edit Home Page
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
