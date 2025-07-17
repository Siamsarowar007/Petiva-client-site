import React, { useEffect, useState, useCallback } from 'react';
import { FaUserCircle, FaEnvelope, FaClipboardList, FaComments, FaThumbsUp, FaStar, FaEdit, FaPlusCircle, FaBell, FaTasks, FaFileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import Loader from '../../shared/Loader/Loader';

const PRIMARY_COLOR_CLASS = "text-[#4CA3B8]";
const PRIMARY_BG_COLOR_CLASS = "bg-[#4CA3B8]";
const PRIMARY_BORDER_COLOR_CLASS = "border-[#4CA3B8]";
const PRIMARY_HOVER_BG_COLOR_CLASS = "hover:bg-[#3B8E9B]";

const DashboardHome = () => {
    const { user, loading: authLoading } = useAuth();
    const privateAxios = useAxios();
    const [dashboardData, setDashboardData] = useState(null);
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const fetchDashboardData = useCallback(async () => {
        if (!user?.email) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            
            const statsRes = await privateAxios.get(`${API_BASE}/user-stats?email=${user.email}`);
            const statsData = statsRes.data;

           
            const recentRes = await privateAxios.get(`${API_BASE}/recent?email=${user.email}&limit=3`); 
            setRecentActivity(recentRes.data);

           
            const userDbRes = await privateAxios.get(`${API_BASE}/users/${user.email}`);
            const dbUserData = userDbRes.data;

            setDashboardData({
                totalPosts: statsData.totalPosts || 0,
                totalComments: statsData.totalComments || 0,
                totalUpvotesReceived: statsData.totalUpvotesReceived || 0, 
                reputation: dbUserData.reputation || 0,
                role: dbUserData.role || 'Member',
                aboutMe: dbUserData.aboutMe || '',
                location: dbUserData.location || '',
               
                draftPosts: 2, 
                unreadNotifications: 5, 
                pendingTasks: 1, 
            });

        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to load dashboard data! Please ensure your backend is running.',
            });
        } finally {
            setLoading(false);
        }
    }, [user, privateAxios, API_BASE]);

    useEffect(() => {
        if (!authLoading) {
            fetchDashboardData();
        }
    }, [user, authLoading, fetchDashboardData]);

    if (authLoading || loading) {
        return <div className="min-h-screen flex items-center justify-center"><Loader /></div>;
    }

    if (!user || !dashboardData) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl text-gray-700">
                Please log in to view your dashboard.
            </div>
        );
    }

    // Data for Pie Chart 
    const pieChartData = [
        { name: 'Total Posts', value: dashboardData.totalPosts },
        { name: 'Total Comments', value: dashboardData.totalComments },
        { name: 'Total Upvotes', value: dashboardData.totalUpvotesReceived }, 
    ].filter(item => item.value > 0); 

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    
    const profileCompletion = () => {
        let completedFields = 0;
        const totalFields = 4; 

        if (user.displayName) completedFields++;
        if (user.email) completedFields++; 
        if (user.photoURL) completedFields++; 
        if (dashboardData.aboutMe && dashboardData.aboutMe.length > 0) completedFields++;
        if (dashboardData.location && dashboardData.location.length > 0) completedFields++;

        return Math.min(100, Math.max(0, Math.round((completedFields / totalFields) * 100)));
    };

    const completionPercentage = profileCompletion();

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto p-4 md:p-8 min-h-screen bg-gray-50 pt-20"
        >
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
                {/* Personalized Welcome Message */}
                <h1 className={`text-3xl md:text-4xl font-bold text-gray-800 mb-6 ${PRIMARY_COLOR_CLASS}`}>
                    Welcome back, <span className='text-[#4CA3B8]'>{user.displayName || user.email.split('@')[0]}!</span>
                </h1>
                <p className="text-gray-600 text-lg mb-8">
                    Here's a quick overview of your activity and account status.
                </p>

                {/* Dashboard Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

                    {/* Profile Status Card */}
                    <motion.div
                        className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg shadow-md border border-indigo-100 flex flex-col justify-between"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <div>
                            <h3 className={`text-xl font-semibold mb-3 ${PRIMARY_COLOR_CLASS} flex items-center gap-2`}>
                                <FaUserCircle /> Your Profile Status
                            </h3>
                            <p className="text-gray-700 text-2xl font-bold mb-2">
                                {completionPercentage}% Complete
                            </p>
                            {completionPercentage < 100 && (
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium text-red-500">Heads up!</span> Complete your profile to unlock full features.
                                </p>
                            )}
                        </div>
                        <Link to="/dashboard/my-profile" className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold ${PRIMARY_COLOR_CLASS} hover:underline`}>
                            <FaEdit /> Go to Profile
                        </Link>
                    </motion.div>

                    {/* Community Metrics Card */}
                    <motion.div
                        className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg shadow-md border border-green-100 flex flex-col justify-between"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <div>
                            <h3 className={`text-xl font-semibold mb-3 ${PRIMARY_COLOR_CLASS} flex items-center gap-2`}>
                                <FaClipboardList /> Community Contribution
                            </h3>
                            <div className="grid grid-cols-2 gap-y-2 text-gray-700">
                                <p className="flex items-center gap-2"><FaClipboardList className="text-xl text-blue-500" /> Posts:</p>
                                <span className="font-bold text-right">{dashboardData.totalPosts}</span>
                                <p className="flex items-center gap-2"><FaComments className="text-xl text-green-500" /> Comments:</p>
                                <span className="font-bold text-right">{dashboardData.totalComments}</span>
                                <p className="flex items-center gap-2"><FaThumbsUp className="text-xl text-yellow-500" /> Upvotes Rec:</p>
                                <span className="font-bold text-right">{dashboardData.totalUpvotesReceived}</span>
                                <p className="flex items-center gap-2"><FaStar className="text-xl text-purple-500" /> Reputation:</p>
                                <span className="font-bold text-right">{dashboardData.reputation}</span>
                            </div>
                        </div>
                        <Link to="/dashboard/add-post" className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold ${PRIMARY_COLOR_CLASS} hover:underline`}>
                            <FaPlusCircle /> Create New Post
                        </Link>
                    </motion.div>

                    {/* Notifications & Tasks Card */}
                    <motion.div
                        className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg shadow-md border border-yellow-100 flex flex-col justify-between"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <div>
                            <h3 className={`text-xl font-semibold mb-3 ${PRIMARY_COLOR_CLASS} flex items-center gap-2`}>
                                <FaBell /> Alerts & Actions
                            </h3>
                            <div className="space-y-2 text-gray-700">
                                <p className="flex items-center gap-2">
                                    <FaBell className="text-xl text-red-500" /> Unread Notifications:
                                    <span className="font-bold ml-auto">{dashboardData.unreadNotifications}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaTasks className="text-xl text-blue-500" /> Pending Tasks:
                                    <span className="font-bold ml-auto">{dashboardData.pendingTasks}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaFileAlt className="text-xl text-gray-500" /> Draft Posts:
                                    <span className="font-bold ml-auto">{dashboardData.draftPosts}</span>
                                </p>
                            </div>
                        </div>
                        <Link to="/dashboard/notifications" className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold ${PRIMARY_COLOR_CLASS} hover:underline`}>
                            <FaBell /> View All Alerts
                        </Link>
                    </motion.div>

                    {/* Membership/Role Card */}
                    <motion.div
                        className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-lg shadow-md border border-red-100 flex flex-col justify-between"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <div>
                            <h3 className={`text-xl font-semibold mb-3 ${PRIMARY_COLOR_CLASS} flex items-center gap-2`}>
                                <FaUserCircle /> Your Role
                            </h3>
                            <p className="text-gray-700 text-2xl font-bold mb-2">
                                {dashboardData.role}
                            </p>
                            <p className="text-sm text-gray-600">
                                Your current role in the community.
                            </p>
                        </div>
                        {dashboardData.role === 'Admin' && ( 
                            <Link to="/dashboard/admin-panel" className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold ${PRIMARY_COLOR_CLASS} hover:underline`}>
                                <FaStar /> Admin Panel
                            </Link>
                        )}
                    </motion.div>

                </div>

                {/* Pie Chart Section */}
                {pieChartData.length > 0 && (dashboardData.totalPosts > 0 || dashboardData.totalComments > 0 || dashboardData.totalUpvotesReceived > 0) && (
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className={`text-xl font-semibold mb-4 ${PRIMARY_COLOR_CLASS}`}>Your Engagement Overview</h3>
                        <div className="w-full h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                        nameKey="name" 
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                )}


                {/* Recent Activity (My Recent Posts) - Reused from MyProfile */}
                <div className="mt-10 pt-6 border-t border-gray-200">
                    <h3 className={`text-xl font-semibold mb-5 ${PRIMARY_COLOR_CLASS}`}>My Recent Posts</h3>
                    {recentActivity.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recentActivity.map(post => (
                                <motion.div
                                    key={post._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                    className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <Link to={`/post-details/${post._id}`} className="block">
                                        <h4 className={`text-lg font-semibold ${PRIMARY_COLOR_CLASS} hover:underline`}>
                                            {post.title}
                                        </h4>
                                        <p className="text-gray-600 text-sm mt-1">
                                            Posted on: {new Date(post.postTime).toLocaleDateString()}
                                        </p>
                                        <div className="flex items-center gap-4 text-gray-500 text-sm mt-2">
                                            <span>
                                                <FaComments className="inline-block mr-1" /> {post.commentCount || 0} Comments
                                            </span>
                                            <span>
                                                <FaThumbsUp className="inline-block mr-1" /> {post.upVote || 0} Upvotes
                                            </span>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                            <div className="md:col-span-2 text-center mt-4">
                                <Link to="/all-post" className={`text-lg font-semibold ${PRIMARY_COLOR_CLASS} hover:underline flex items-center justify-center gap-2`}>
                                    <FaClipboardList /> View All Posts &rarr;
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-600">No posts created yet. <Link to="/dashboard/add-post" className={`${PRIMARY_COLOR_CLASS} hover:underline`}>Create your first post!</Link></p>
                    )}
                </div>

                
            </div>
        </motion.div>
    );
};

export default DashboardHome;