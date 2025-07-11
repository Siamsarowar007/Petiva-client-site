import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxios();

  const isMember = user?.isMember || false;

  // ✅ Fetch recent 3 posts
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["recentPosts", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/recent?email=${user.email}&limit=3`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* ✅ User Info Section */}
      <div className="flex flex-col items-center gap-3 mb-10 relative">
        {/* Profile Image */}
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          src={user?.photoURL}
          alt="Profile"
          className="w-28 h-28 rounded-full border-2 border-primary object-cover shadow-md"
        />

        {/* Name + Email */}
        <h2 className="text-2xl font-semibold text-gray-800">
          {user?.displayName}
        </h2>
        <p className="text-gray-500">{user?.email}</p>

        {/* ✅ Badges */}
        <div className="flex gap-4 mt-3">
          {!isMember && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              data-tooltip-id="bronze"
              className="flex items-center gap-2 px-3 py-1 bg-amber-400 text-white rounded-full shadow cursor-pointer"
            >
              🥉 <span className="text-sm font-medium">Bronze Badge</span>
            </motion.div>
          )}
          {isMember && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              data-tooltip-id="gold"
              className="flex items-center gap-2 px-3 py-1 bg-yellow-500 text-white rounded-full shadow cursor-pointer"
            >
              🥇 <span className="text-sm font-medium">Gold Badge</span>
            </motion.div>
          )}
        </div>

        {/* Tooltips */}
        <Tooltip id="bronze" content="You are a registered user. 🟤 Bronze Level." />
        <Tooltip id="gold" content="You are a member! 🟡 Gold Level." />
      </div>

      {/* ✅ My Recent Posts */}
      <div>
        <h3 className="text-xl font-semibold mb-5 text-center text-gray-700">
          My 3 Recent Posts
        </h3>

        {isLoading ? (
          <p className="text-center text-sm text-gray-500">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-400">You have no posts yet.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h4 className="text-lg font-bold text-gray-800">{post.title}</h4>
                <p className="text-gray-600 text-sm mb-1">
                  {post.description?.slice(0, 100)}...
                </p>
                <div className="text-xs text-gray-400">
                  Tag: <span className="capitalize">{post.tag}</span>
                </div>
                <div className="text-xs text-gray-400">
                  Posted on:{" "}
                  {post.postTime
                    ? new Date(post.postTime).toLocaleString("en-BD", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "Unknown"}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
