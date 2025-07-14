import React, { use ,useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaCalendarAlt, FaFileAlt, FaComments, FaCheckCircle } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const DashboardHome = () => {
  const { user } = use(AuthContext);
  const [userStats, setUserStats] = useState({ totalPosts: 0, totalComments: 0 });
  const [joinedDate, setJoinedDate] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios.get(`/user-stats?email=${user.email}`)
        .then(res => setUserStats(res.data))
        .catch(err => console.error("Stats fetch error", err));

      axios.get(`/users/${user.email}`)
        .then(res => setJoinedDate(res.data?.joinedAt))
        .catch(() => setJoinedDate(user?.metadata?.creationTime));
    }
  }, [user]);

  if (!user) {
    return <div className="text-center py-10 text-gray-500">Loading user info...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-2xl font-bold text-orange-600 flex items-center gap-2">
          <FaUser className="text-orange-500" /> Welcome, {user.displayName || "User"}!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
            <FaCalendarAlt className="text-xl text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Joined On</p>
              <p className="font-semibold">
                {joinedDate ? new Date(joinedDate).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
            <FaFileAlt className="text-xl text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Total Posts</p>
              <p className="font-semibold">{userStats.totalPosts || 0}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
            <FaComments className="text-xl text-purple-500" />
            <div>
              <p className="text-sm text-gray-600">Total Comments</p>
              <p className="font-semibold">{userStats.totalComments || 0}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
            <FaCheckCircle className="text-xl text-teal-500" />
            <div>
              <p className="text-sm text-gray-600">Account Status</p>
              <p className="font-semibold text-green-600">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;