import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth'; // আপনার useAuth hook এর সঠিক পথ নিশ্চিত করুন
import useAxios from '../../../hooks/useAxios'; // আপনার useAxios hook এর সঠিক পথ নিশ্চিত করুন
import { FaUsers, FaChartPie, FaChartLine, FaBell, FaSpinner, FaInfoCircle, FaClipboardList } from 'react-icons/fa';
import moment from 'moment'; // For date formatting (npm install moment)

// For charts (npm install recharts)
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, Sector, BarChart, Bar
} from 'recharts';
import Swal from 'sweetalert2'; // For elegant alerts (npm install sweetalert2)

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF00FF', '#00FFFF']; // Chart colors

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
        userPieData: [], 
        reportPieData: [], // For Pending Reports Pie Chart
        totalPostsLineData: [], // For Total Posts Line Chart
        userRegistrationsTrend: [], // Demo Data for User Registrations Trend Line Chart
        monthlyPostUploadsTrend: [], // Demo Data for Monthly Post Uploads Trend Bar Chart
    });
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState(null);
    const [activeUserPieIndex, setActiveUserPieIndex] = useState(0);
    const [activeReportPieIndex, setActiveReportPieIndex] = useState(0);

    // Event handlers for Pie Chart interactivity
    const onUserPieEnter = (_, index) => setActiveUserPieIndex(index);
    const onReportPieEnter = (_, index) => setActiveReportPieIndex(index);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (authLoading) return;

            setLoadingData(true);
            setError(null);

            try {
                // Fetch Total Users and prepare data for Pie Chart
                const usersRes = await axiosInstance.get('/users');
                let totalUsersCount = 0;
                let adminUsersCount = 0;
                let regularUsersCount = 0;

                if (usersRes.data) {
                    if (typeof usersRes.data.total === 'number') {
                        totalUsersCount = usersRes.data.total;
                        // For pie chart, if actual roles are not returned, try to infer or use placeholders
                        adminUsersCount = usersRes.data.users ? usersRes.data.users.filter(u => u.role === 'admin').length : Math.floor(totalUsersCount * 0.1); // Demo split
                        regularUsersCount = totalUsersCount - adminUsersCount;
                    } else if (Array.isArray(usersRes.data.users)) {
                        totalUsersCount = usersRes.data.users.length;
                        adminUsersCount = usersRes.data.users.filter(u => u.role === 'admin').length;
                        regularUsersCount = usersRes.data.users.filter(u => u.role === 'user').length;
                    } else if (Array.isArray(usersRes.data)) { // If API returns just an array of users
                        totalUsersCount = usersRes.data.length;
                        adminUsersCount = usersRes.data.filter(u => u.role === 'admin').length;
                        regularUsersCount = usersRes.data.filter(u => u.role === 'user').length;
                    }
                }
                const userPieData = [
                    { name: 'Admin Users', value: adminUsersCount },
                    { name: 'Regular Users', value: regularUsersCount }
                ].filter(item => item.value > 0); // Only show if count is greater than 0


                // Fetch Total Posts and prepare data for Line Chart
                let totalPostsCount = 0;
                let postsOverTime = []; // To store data for the line chart
                try {
                    const allPostsRes = await axiosInstance.get('/all-posts');
                    totalPostsCount = allPostsRes.data ? allPostsRes.data.length : 0;

                    // Prepare data for Total Posts Line Chart (e.g., cumulative posts over time)
                    if (allPostsRes.data) {
                        const sortedPosts = allPostsRes.data.sort((a, b) => new Date(a.postTime) - new Date(b.postTime));
                        let cumulativeCount = 0;
                        const dailyPosts = {}; // Group by date
                        sortedPosts.forEach(post => {
                            const date = moment(post.postTime).format('MMM D');
                            dailyPosts[date] = (dailyPosts[date] || 0) + 1;
                        });

                        // Convert to cumulative data
                        Object.keys(dailyPosts).sort((a,b) => new Date(a) - new Date(b)).forEach(date => {
                            cumulativeCount += dailyPosts[date];
                            postsOverTime.push({ date, 'Total Posts': cumulativeCount });
                        });
                    }

                } catch (e) {
                    console.warn("'/all-posts' API failed for Total Posts Line Chart. Using total count only.");
                }


                // Fetch Pending Reports and prepare data for Pie Chart
                const reportsRes = await axiosInstance.get('/reports');
                const pendingReportsCount = reportsRes.data ? reportsRes.data.filter(report => report.status === 'Pending').length : 0;
                const resolvedReportsCount = reportsRes.data ? reportsRes.data.filter(report => report.status === 'Resolved').length : 0;
                const totalReportsCount = pendingReportsCount + resolvedReportsCount; // Calculate total for display
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

                // --- Demo Data for Trends ---
                const demoUserRegistrationsTrend = [
                    { date: 'Jul 1', registrations: 5 },
                    { date: 'Jul 2', registrations: 8 },
                    { date: 'Jul 3', registrations: 12 },
                    { date: 'Jul 4', registrations: 15 },
                    { date: 'Jul 5', registrations: 10 },
                    { date: 'Jul 6', registrations: 20 },
                    { date: 'Jul 7', registrations: 18 },
                ];

                const demoMonthlyPostUploadsTrend = [
                    { month: 'Jan', posts: 30 },
                    { month: 'Feb', posts: 45 },
                    { month: 'Mar', posts: 60 },
                    { month: 'Apr', posts: 55 },
                    { month: 'May', posts: 70 },
                    { month: 'Jun', posts: 85 },
                    { month: 'Jul', posts: 75 },
                    { month: 'Aug', posts: 90 },
                    { month: 'Sep', posts: 80 },
                    { month: 'Oct', posts: 95 },
                    { month: 'Nov', posts: 100 },
                    { month: 'Dec', posts: 110 },
                ];
                // --- End Demo Data ---


                setDashboardData({
                    totalUsers: totalUsersCount,
                    totalPosts: totalPostsCount,
                    pendingReports: totalReportsCount, // Display total reports count on card
                    recentActivities: recentActivities,
                    userPieData: userPieData,
                    reportPieData: reportPieData,
                    totalPostsLineData: postsOverTime, // Assign line chart data
                    userRegistrationsTrend: demoUserRegistrationsTrend,
                    monthlyPostUploadsTrend: demoMonthlyPostUploadsTrend,
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

            {/* --- Key Metrics Display --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
                        <p className="text-4xl font-bold text-[#4CA3B8]">{dashboardData.totalUsers}</p>
                    </div>
                    <FaUsers className="text-6xl text-gray-400" />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700">Total Posts</h3>
                        <p className="text-4xl font-bold text-green-600">{dashboardData.totalPosts}</p>
                    </div>
                    <FaClipboardList className="text-6xl text-gray-400" />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700">Total Reports</h3>
                        <p className="text-4xl font-bold text-red-600">{dashboardData.pendingReports}</p>
                    </div>
                    <FaBell className="text-6xl text-gray-400" />
                </div>
            </div>

            {/* --- Charts Section --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                {/* Total Users Pie Chart */}
                <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 flex flex-col items-center">
                    <h3 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-3 flex items-center gap-2">
                        <FaChartPie className="text-[#4CA3B8]" /> User Distribution
                    </h3>
                    {dashboardData.userPieData && dashboardData.userPieData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    activeIndex={activeUserPieIndex}
                                    activeShape={renderActiveShape}
                                    data={dashboardData.userPieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    onMouseEnter={onUserPieEnter}
                                >
                                    {dashboardData.userPieData.map((entry, index) => (
                                        <Cell key={`cell-user-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value, name) => [`${value} users`, name]} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="text-center py-8 text-gray-500 w-full h-full flex flex-col justify-center items-center">
                            <p className="mb-2">No user role data available for the chart.</p>
                            <p className="text-sm">Ensure your `/users` API provides user role breakdown.</p>
                        </div>
                    )}
                </div>

                {/* Pending Reports Pie Chart */}
                <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 flex flex-col items-center">
                    <h3 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-3 flex items-center gap-2">
                        <FaChartPie className="text-red-500" /> Report Status Breakdown
                    </h3>
                    {dashboardData.reportPieData && dashboardData.reportPieData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    activeIndex={activeReportPieIndex}
                                    activeShape={renderActiveShape}
                                    data={dashboardData.reportPieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#ffc658"
                                    dataKey="value"
                                    onMouseEnter={onReportPieEnter}
                                >
                                    {dashboardData.reportPieData.map((entry, index) => (
                                        <Cell key={`cell-report-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value, name) => [`${value} reports`, name]} />
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

            {/* Total Posts Line Chart */}
            <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 mb-10">
                <h3 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-3 flex items-center gap-2">
                    <FaChartLine className="text-green-600" /> Total Posts Over Time
                </h3>
                {dashboardData.totalPostsLineData && dashboardData.totalPostsLineData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={dashboardData.totalPostsLineData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Total Posts" stroke="#82ca9d" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        <p className="mb-4">No post data over time to display.</p>
                        <p className="text-sm">Ensure your `/all-posts` API returns `postTime` for each post.</p>
                    </div>
                )}
            </div>

            {/* --- Trend Graphs --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* User Registrations Trend (Demo Data) */}
                <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-3 flex items-center gap-2">
                        <FaChartLine className="text-[#4CA3B8]" /> User Registrations Trend (Demo)
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={dashboardData.userRegistrationsTrend}
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
                    <p className="text-center text-gray-500 text-sm mt-4">
                        *This chart uses demo data. For live data, integrate a backend API that provides daily user registrations.
                    </p>
                </div>

                {/* Monthly Post Uploads Trend (Demo Data) */}
                <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-3 flex items-center gap-2">
                        <FaClipboardList className="text-[#82ca9d]" /> Monthly Post Uploads Trend (Demo)
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={dashboardData.monthlyPostUploadsTrend}
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
                    <p className="text-center text-gray-500 text-sm mt-4">
                        *This chart uses demo data. For live data, integrate a backend API that aggregates monthly post uploads.
                    </p>
                </div>
            </div>

            {/* --- Recent Activity Feed --- */}
            <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 mt-8">
                <h3 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-3 flex items-center gap-2">
                    <FaInfoCircle className="text-[#4CA3B8]" /> Recent Activities
                </h3>
                {dashboardData.recentActivities.length > 0 ? (
                    <ul className="space-y-4">
                        {dashboardData.recentActivities.map((activity, index) => (
                            <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md border border-gray-100 shadow-sm">
                                <FaChartLine className="text-[#4CA3B8] text-xl mt-1 flex-shrink-0" /> {/* Changed icon to FaChartLine, feel free to use FaClock */}
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
        </div>
    );
};

export default AdminDashboard;