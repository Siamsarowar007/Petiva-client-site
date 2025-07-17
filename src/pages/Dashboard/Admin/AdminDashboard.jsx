import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth'; // আপনার useAuth hook এর সঠিক পথ নিশ্চিত করুন
import useAxios from '../../../hooks/useAxios'; // আপনার useAxios hook এর সঠিক পথ নিশ্চিত করুন
import { FaUsers, FaClipboardList, FaChartPie, FaChartLine, FaBell, FaSpinner, FaInfoCircle, FaClock } from 'react-icons/fa';
import moment from 'moment'; // For date formatting (npm install moment)

// For charts (npm install recharts)
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, Sector
} from 'recharts';
import Swal from 'sweetalert2'; // For elegant alerts (npm install sweetalert2)

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']; // Chart colors

// Custom active shape for Pie Chart (optional, for better visualization on hover)
const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="font-bold text-lg">
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={3} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
                {`Count: ${value}`}
            </text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate: ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const AdminDashboard = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosInstance = useAxios();

    const [dashboardData, setDashboardData] = useState({
        totalUsers: 'Loading...',
        totalPosts: 0,
        pendingReports: 0,
        recentActivities: [],
        userGrowthData: [], // Placeholder
        postUploadsMonthly: [], // Placeholder
    });
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState(null);
    const [activeUserPieIndex, setActiveUserPieIndex] = useState(0);
    const [activePostPieIndex, setActivePostPieIndex] = useState(0);
    const [activeReportPieIndex, setActiveReportPieIndex] = useState(0);

    // Event handlers for Pie Chart interactivity
    const onUserPieEnter = (_, index) => setActiveUserPieIndex(index);
    const onPostPieEnter = (_, index) => setActivePostPieIndex(index);
    const onReportPieEnter = (_, index) => setActiveReportPieIndex(index);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (authLoading) return;

            setLoadingData(true);
            setError(null);

            try {
                // Fetch Total Users - /users API থেকে প্রাপ্ত ডেটা দিয়ে count করা হচ্ছে
                const usersRes = await axiosInstance.get('/users');
                let totalUsersCount = 0;
                let adminUsersCount = 0;
                let regularUsersCount = 0;

                if (usersRes.data) {
                    if (typeof usersRes.data.total === 'number') {
                        totalUsersCount = usersRes.data.total;
                        // Assume roles for pie chart if total users is available but not breakdown
                        // This part needs real backend data if you want accurate admin/regular counts
                        // For now, it's a rough split or placeholder
                        adminUsersCount = usersRes.data.users ? usersRes.data.users.filter(u => u.role === 'admin').length : 0;
                        regularUsersCount = usersRes.data.users ? usersRes.data.users.filter(u => u.role === 'user').length : totalUsersCount - adminUsersCount; // simplified
                    } else if (Array.isArray(usersRes.data.users)) {
                        totalUsersCount = usersRes.data.users.length;
                        adminUsersCount = usersRes.data.users.filter(u => u.role === 'admin').length;
                        regularUsersCount = usersRes.data.users.filter(u => u.role === 'user').length;
                    } else if (Array.isArray(usersRes.data)) {
                        totalUsersCount = usersRes.data.length;
                        adminUsersCount = usersRes.data.filter(u => u.role === 'admin').length;
                        regularUsersCount = usersRes.data.filter(u => u.role === 'user').length;
                    }
                }
                const userPieData = [
                    { name: 'Admin Users', value: adminUsersCount },
                    { name: 'Regular Users', value: regularUsersCount }
                ].filter(item => item.value > 0); // Only show if count is greater than 0

                // Fetch Total Posts
                let totalPostsCount = 0;
                let approvedPostsCount = 0; // Assuming posts have a status like 'approved'
                let pendingPostsCount = 0; // Assuming posts have a status like 'pending'
                try {
                    const postsCountRes = await axiosInstance.get('/posts/count');
                    totalPostsCount = postsCountRes.data.count || 0;
                    // If you have status in posts, fetch all posts to count statuses for pie chart
                    const allPostsResForStatus = await axiosInstance.get('/all-posts');
                    if (allPostsResForStatus.data) {
                        approvedPostsCount = allPostsResForStatus.data.filter(p => p.status === 'approved').length;
                        pendingPostsCount = allPostsResForStatus.data.filter(p => p.status === 'pending').length;
                        // Fallback if no specific statuses, just use total
                        if (approvedPostsCount === 0 && pendingPostsCount === 0 && totalPostsCount > 0) {
                            approvedPostsCount = totalPostsCount; // Assume all are "approved" if no status breakdown
                        }
                    }
                } catch (e) {
                    console.warn("'/posts/count' or '/all-posts' API for post status failed. Using total only.");
                    const allPostsRes = await axiosInstance.get('/all-posts');
                    totalPostsCount = allPostsRes.data ? allPostsRes.data.length : 0;
                    approvedPostsCount = totalPostsCount; // Assume all are approved if no status info
                }
                const postPieData = [
                    { name: 'Approved Posts', value: approvedPostsCount },
                    { name: 'Pending Posts', value: pendingPostsCount }
                ].filter(item => item.value > 0);


                // Fetch Pending Reports
                const reportsRes = await axiosInstance.get('/reports');
                const pendingReportsCount = reportsRes.data ? reportsRes.data.filter(report => report.status === 'Pending').length : 0;
                const resolvedReportsCount = reportsRes.data ? reportsRes.data.filter(report => report.status === 'Resolved').length : 0;
                const reportPieData = [
                    { name: 'Pending Reports', value: pendingReportsCount },
                    { name: 'Resolved Reports', value: resolvedReportsCount }
                ].filter(item => item.value > 0);


                // Fetch Recent Posts (as a proxy for Recent Activities from admin's perspective)
                const recentPostsRes = await axiosInstance.get('/all-posts');
                const recentActivities = recentPostsRes.data
                    ? recentPostsRes.data
                        .map(post => ({
                            type: 'New Post',
                            description: `"${post.title}" by ${post.authorName || post.authorEmail || 'N/A'}`,
                            timestamp: post.postTime
                        }))
                        .slice(0, 5) // Get top 5 recent posts as activities
                    : [];

                setDashboardData({
                    totalUsers: totalUsersCount,
                    totalPosts: totalPostsCount,
                    pendingReports: pendingReportsCount,
                    recentActivities: recentActivities,
                    userGrowthData: userPieData, // Re-using for User Pie Chart data
                    postUploadsMonthly: postPieData, // Re-using for Post Pie Chart data
                    reportData: reportPieData // Adding for Report Pie Chart data
                });

            } catch (err) {
                console.error("Failed to fetch dashboard data:", err);
                setError("Failed to load dashboard data. Please try again. Check console for details.");
                Swal.fire({
                    icon: 'error',
                    title: 'Error Loading Dashboard',
                    text: err.response?.data?.message || err.message || 'An unexpected error occurred. Please check your network and try again.',
                    confirmButtonColor: '#4CA3B8',
                });
            } finally {
                setLoadingData(false);
            }
        };

        if (!authLoading) {
            fetchDashboardData();
        }
    }, [user, authLoading, axiosInstance]);

    // Loading State
    if (authLoading || loadingData) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <span className="loading loading-spinner loading-lg text-[#4CA3B8]"></span>
                <p className="ml-3 text-lg text-gray-600">Loading Dashboard Data...</p>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4">
                <p className="text-red-600 text-xl font-semibold mb-4 text-center">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="btn bg-[#4CA3B8] text-white hover:bg-[#3a8da0]"
                >
                    Retry Loading
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center border-b pb-4">Admin Dashboard Overview</h2>

            {/* --- Pie Charts Section --- */}
            <h3 className="text-3xl font-semibold text-gray-700 mb-6 text-center lg:text-left flex items-center gap-2">
                <FaChartPie className="text-[#4CA3B8]" /> Key Metrics Breakdown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                {/* Total Users Pie Chart */}
                <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 flex flex-col items-center">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Total Users: {dashboardData.totalUsers}</h4>
                    {dashboardData.userGrowthData && dashboardData.userGrowthData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    activeIndex={activeUserPieIndex}
                                    activeShape={renderActiveShape}
                                    data={dashboardData.userGrowthData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    onMouseEnter={onUserPieEnter}
                                >
                                    {dashboardData.userGrowthData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value, name) => [`${value} ${name.includes('Users') ? 'users' : ''}`, name]} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="text-center py-8 text-gray-500 w-full h-full flex flex-col justify-center items-center">
                            <p className="mb-2">No user data available for the chart.</p>
                            <p className="text-sm">Ensure your `/users` API provides role breakdown.</p>
                        </div>
                    )}
                </div>

                {/* Total Posts Pie Chart */}
                <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 flex flex-col items-center">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Total Posts: {dashboardData.totalPosts}</h4>
                    {dashboardData.postUploadsMonthly && dashboardData.postUploadsMonthly.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    activeIndex={activePostPieIndex}
                                    activeShape={renderActiveShape}
                                    data={dashboardData.postUploadsMonthly}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#82ca9d"
                                    dataKey="value"
                                    onMouseEnter={onPostPieEnter}
                                >
                                    {dashboardData.postUploadsMonthly.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value, name) => [`${value} ${name.includes('Posts') ? 'posts' : ''}`, name]} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="text-center py-8 text-gray-500 w-full h-full flex flex-col justify-center items-center">
                            <p className="mb-2">No post data available for the chart.</p>
                            <p className="text-sm">Ensure your `/all-posts` API provides status breakdown.</p>
                        </div>
                    )}
                </div>

                {/* Pending Reports Pie Chart */}
                <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 flex flex-col items-center">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Total Reports: {dashboardData.pendingReports + (dashboardData.reportData ? dashboardData.reportData.find(r => r.name === 'Resolved Reports')?.value || 0 : 0)}</h4>
                    {dashboardData.reportData && dashboardData.reportData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    activeIndex={activeReportPieIndex}
                                    activeShape={renderActiveShape}
                                    data={dashboardData.reportData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#ffc658"
                                    dataKey="value"
                                    onMouseEnter={onReportPieEnter}
                                >
                                    {dashboardData.reportData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value, name) => [`${value} ${name.includes('Reports') ? 'reports' : ''}`, name]} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="text-center py-8 text-gray-500 w-full h-full flex flex-col justify-center items-center">
                            <p className="mb-2">No report data available for the chart.</p>
                            <p className="text-sm">Ensure your `/reports` API provides status breakdown.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* --- Recent Activity Feed --- */}
                <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-3 flex items-center gap-2">
                        <FaInfoCircle className="text-[#4CA3B8]" /> Recent Activities
                    </h3>
                    {dashboardData.recentActivities.length > 0 ? (
                        <ul className="space-y-4">
                            {dashboardData.recentActivities.map((activity, index) => (
                                <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md border border-gray-100 shadow-sm">
                                    <FaClock className="text-[#4CA3B8] text-xl mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-gray-800">{activity.type}: <span className="font-normal">{activity.description}</span></p>
                                        <p className="text-sm text-gray-500 mt-1">{moment(activity.timestamp).fromNow()} ({moment(activity.timestamp).format('MMM D, h:mm A')})</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No recent activities to display.</p>
                    )}
                </div>

                {/* --- User Growth Line Chart (Placeholder for now) --- */}
                <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-3 flex items-center gap-2">
                        <FaChartLine className="text-[#4CA3B8]" /> User Registrations Trend
                    </h3>
                    {/* Note: dashboardData.userGrowthData is now used for Pie Chart.
                       You need a separate backend API for actual time-series user growth data */}
                    {/* Placeholder for actual line graph data */}
                    {[] && [].length > 0 ? ( // Placeholder: Replace [] with actual line chart data
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                data={[]} // Replace with actual user growth data
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="registrations" stroke="#4CA3B8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p className="mb-4">This chart shows user registration trends over time.</p>
                            <p className="text-sm">
                                To enable this, you need a backend API that aggregates user registrations by date (e.g., last 30 days).
                            </p>
                            <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center mt-6 text-gray-400">
                                <span className="text-lg">Line Graph Placeholder</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* --- Monthly Post Uploads Bar Chart (Placeholder for now) --- */}
                <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 lg:col-span-2">
                    <h3 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-3 flex items-center gap-2">
                        <FaClipboardList className="text-[#4CA3B8]" /> Monthly Post Uploads Trend
                    </h3>
                    {/* Note: dashboardData.postUploadsMonthly is now used for Pie Chart.
                       You need a separate backend API for actual time-series post uploads data */}
                    {/* Placeholder for actual bar graph data */}
                    {[] && [].length > 0 ? ( // Placeholder: Replace [] with actual bar chart data
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={[]} // Replace with actual monthly post uploads data
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="posts" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p className="mb-4">This chart shows the number of posts uploaded monthly.</p>
                            <p className="text-sm">
                                To enable this, you need a backend API that aggregates post uploads by month (e.g., last 12 months).
                            </p>
                            <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center mt-6 text-gray-400">
                                <span className="text-lg">Bar Graph Placeholder</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;