// import React from 'react';

// const AdminProfile = () => {
//     return (
//         <div>
//             admin profile
//         </div>
//     );
// };

// export default AdminProfile;

// import React, { useEffect, useState } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
// import Swal from "sweetalert2";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

// const AdminProfile = () => {
//   const axiosSecure = useAxiosSecure();
//   const [admin, setAdmin] = useState({});
//   const [counts, setCounts] = useState({ posts: 0, comments: 0, users: 0 });
//   const [tagInput, setTagInput] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchInfo = async () => {
//       try {
//         const [userRes, postRes, commentRes, userCountRes] = await Promise.all([
//           axiosSecure.get("/auth/me"), 
//           axiosSecure.get("/posts/count"),
//           axiosSecure.get("/comments/count"),
//           axiosSecure.get("/users/count"),
//         ]);

//         setAdmin(userRes.data);
//         setCounts({
//           posts: postRes.data.count || 0,
//           comments: commentRes.data.count || 0,
//           users: userCountRes.data.count || 0,
//         });
//       } catch (err) {
//         console.error("Error loading admin profile", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchInfo();
//   }, [axiosSecure]);

//   const pieData = [
//     { name: "Posts", value: counts.posts },
//     { name: "Comments", value: counts.comments },
//     { name: "Users", value: counts.users },
//   ];

//   const handleAddTag = async (e) => {
//     e.preventDefault();
//     if (!tagInput.trim()) return;

//     try {
//       await axiosSecure.post("/tags", { name: tagInput.trim() });
//       Swal.fire("Success", "Tag added successfully", "success");
//       setTagInput("");
//     } catch (err) {
//       console.error("Failed to add tag", err);
//       Swal.fire("Error", "Could not add tag", "error");
//     }
//   };

//   if (loading) return <p className="text-center py-10">Loading profile...</p>;

//   return (
//     <div className="max-w-5xl mx-auto mt-10 px-4">
//       <div className="bg-white shadow p-6 rounded-lg mb-8">
//         <div className="flex items-center gap-4">
//           <img
//             src={admin.image || "/default-profile.png"}
//             alt="Admin"
//             className="w-20 h-20 rounded-full object-cover"
//           />
//           <div>
//             <h2 className="text-2xl font-semibold">{admin.name}</h2>
//             <p className="text-gray-500">{admin.email}</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-4 mt-6 text-center">
//           <div>
//             <h4 className="text-lg font-bold">{counts.posts}</h4>
//             <p className="text-sm text-gray-600">Total Posts</p>
//           </div>
//           <div>
//             <h4 className="text-lg font-bold">{counts.comments}</h4>
//             <p className="text-sm text-gray-600">Total Comments</p>
//           </div>
//           <div>
//             <h4 className="text-lg font-bold">{counts.users}</h4>
//             <p className="text-sm text-gray-600">Total Users</p>
//           </div>
//         </div>
//       </div>

//       {/* Pie Chart */}
//       <div className="bg-white shadow p-6 rounded-lg mb-8">
//         <h3 className="text-lg font-semibold mb-4">Overview Chart</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={pieData}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               fill="#8884d8"
//               label
//             >
//               {pieData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Add Tag Form */}
//       <div className="bg-white shadow p-6 rounded-lg">
//         <h3 className="text-lg font-semibold mb-4">Add New Tag</h3>
//         <form onSubmit={handleAddTag} className="flex flex-col sm:flex-row gap-4">
//           <input
//             type="text"
//             value={tagInput}
//             onChange={(e) => setTagInput(e.target.value)}
//             placeholder="Enter tag (e.g. food, rescue)"
//             className="flex-1 border px-3 py-2 rounded"
//           />
//           <button className="btn btn-primary px-5 py-2 rounded">Add Tag</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;

// import React, { useEffect, useState } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
// import Swal from "sweetalert2";
// import useAuth from "../../../hooks/useAuth";


// const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

// const AdminProfile = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth(); // ✅ Get name, email, image from auth context
//    const [admin, setAdmin] = useState({});
//   const [counts, setCounts] = useState({ posts: 0, comments: 0, users: 0 });
//   const [tagInput, setTagInput] = useState("");
//   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchCounts = async () => {
// //       try {
// //         const [postRes, commentRes, userRes] = await Promise.all([
// //           axiosSecure.get("/posts/count"),
// //           axiosSecure.get("/comments/count"),
// //           axiosSecure.get("/users/count"),
// //         ]);

// //         setCounts({
// //           posts: postRes.data?.count || 0,
// //           comments: commentRes.data?.count || 0,
// //           users: userRes.data?.count || 0,
// //         });
// //       } catch (err) {
// //         console.error("Error fetching counts", err);
// //         Swal.fire("Error", "Failed to load stats", "error");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCounts();
// //   }, [axiosSecure]);

//   useEffect(() => {
//     const fetchInfo = async () => {
//       try {
//         const [userRes, postRes, commentRes, userCountRes] = await Promise.all([
//           axiosSecure.get("/auth/me"),
//           axiosSecure.get("/posts/count"),
//           axiosSecure.get("/comments/count"),
//           axiosSecure.get("/users/count"),
//         ]);

//         const userData = userRes.data?.user || userRes.data;

//         console.log("Admin Info:", userData);

//         setAdmin({
//           name: userData.name || userData.displayName || "Admin",
//           email: userData.email || "admin@example.com",
//           image: userData.image || userData.photoURL || "/default-profile.png",
//         });

//         setCounts({
//           posts: postRes.data.count || 0,
//           comments: commentRes.data.count || 0,
//           users: userCountRes.data.count || 0,
//         });
//       } catch (err) {
//         console.error("Error loading admin profile", err);
//         Swal.fire("Error", "Failed to load admin data", "error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInfo();
//   }, [axiosSecure]);

//   const pieData = [
//     { name: "Posts", value: counts.posts },
//     { name: "Comments", value: counts.comments },
//     { name: "Users", value: counts.users },
//   ];

//   const handleAddTag = async (e) => {
//     e.preventDefault();
//     const tagName = tagInput.trim();
//     if (!tagName) return;

//     try {
//       const res = await axiosSecure.post("/tags", { name: tagName });
//       if (res.status === 201 || res.data.insertedId) {
//         Swal.fire("Success", "Tag added successfully", "success");
//         setTagInput("");
//       }
//     } catch (err) {
//       console.error("Failed to add tag", err);
//       Swal.fire("Error", "Tag already exists or failed to save", "error");
//     }
//   };

//   if (loading) return <p className="text-center py-10">Loading profile...</p>;

//   return (
//     <div className="max-w-5xl mx-auto mt-10 px-4">
//       <div className="bg-white shadow p-6 rounded-lg mb-8">
//         <div className="flex items-center gap-4">
//           <img
//             src={user?.photoURL || "/default-profile.png"}
//             alt="Admin"
//             className="w-20 h-20 rounded-full object-cover"
//           />
//           <div>
//             <h2 className="text-2xl font-semibold">{user?.displayName || "Admin"}</h2>
//             <p className="text-gray-500">{user?.email}</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-4 mt-6 text-center">
//           <div>
//             <h4 className="text-lg font-bold">{counts.posts}</h4>
//             <p className="text-sm text-gray-600">Total Posts</p>
//           </div>
//           <div>
//             <h4 className="text-lg font-bold">{counts.comments}</h4>
//             <p className="text-sm text-gray-600">Total Comments</p>
//           </div>
//           <div>
//             <h4 className="text-lg font-bold">{counts.users}</h4>
//             <p className="text-sm text-gray-600">Total Users</p>
//           </div>
//         </div>
//       </div>

//       {/* Pie Chart */}
//       <div className="bg-white shadow p-6 rounded-lg mb-8">
//         <h3 className="text-lg font-semibold mb-4">Overview Chart</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={pieData}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               fill="#8884d8"
//               label
//             >
//               {pieData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Add Tag Form */}
//       <div className="bg-white shadow p-6 rounded-lg">
//         <h3 className="text-lg font-semibold mb-4">Add New Tag</h3>
//         <form onSubmit={handleAddTag} className="flex flex-col sm:flex-row gap-4">
//           <input
//             type="text"
//             value={tagInput}
//             onChange={(e) => setTagInput(e.target.value)}
//             placeholder="Enter tag (e.g. food, rescue)"
//             className="flex-1 border px-3 py-2 rounded"
//           />
//           <button className="btn btn-primary px-5 py-2 rounded">Add Tag</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;



import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PRIMARY = "#4CA3B8";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const qc = useQueryClient();

  const [counts, setCounts] = useState({ posts: 0, comments: 0, users: 0 });
  const [tagInput, setTagInput] = useState("");
  const [loadingStats, setLoadingStats] = useState(true);

  /* --------------------
   * Load summary counts
   * -------------------- */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [postRes, commentRes, userRes] = await Promise.all([
          axiosSecure.get("/posts/count"),
          axiosSecure.get("/comments/count"),
          axiosSecure.get("/users/count"),
        ]);
        setCounts({
          posts: postRes.data?.count || 0,
          comments: commentRes.data?.count || 0,
          users: userRes.data?.count || 0,
        });
      } catch (err) {
        console.error("Admin stats load error:", err);
        Swal.fire("Error", "Failed to load admin stats", "error");
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, [axiosSecure]);

  /* --------------------
   * Load tags (React Query)
   * -------------------- */
  const {
    data: tags = [],
    isLoading: tagsLoading,
    isError: tagsError,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      return res.data || [];
    },
  });

  /* --------------------
   * Add tag
   * -------------------- */
  const handleAddTag = async (e) => {
    e.preventDefault();
    const tagName = tagInput.trim();
    if (!tagName) return;

    try {
      const res = await axiosSecure.post("/tags", { name: tagName });
      if (res.status === 201) {
        Swal.fire("Success", "Tag added successfully", "success");
        setTagInput("");
        qc.invalidateQueries({ queryKey: ["tags"] });
      }
    } catch (err) {
      console.error("Add tag failed:", err);
      Swal.fire("Error", err.response?.data?.message || "Could not add tag", "error");
    }
  };

  /* --------------------
   * Delete tag
   * -------------------- */
  const handleDeleteTag = async (tag) => {
    const confirm = await Swal.fire({
      title: `Delete tag "${tag.name}"?`,
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: PRIMARY,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/tags/${tag._id}`);
      Swal.fire("Deleted!", "Tag removed.", "success");
      qc.invalidateQueries({ queryKey: ["tags"] });
    } catch (err) {
      console.error("Delete tag failed:", err);
      Swal.fire("Error", "Could not delete tag", "error");
    }
  };

  const pieData = [
    { name: "Posts", value: counts.posts },
    { name: "Comments", value: counts.comments },
    { name: "Users", value: counts.users },
  ];

  if (loadingStats) {
    return <p className="text-center py-10">Loading profile...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      {/* Admin Card */}
      <div className="bg-white shadow p-6 rounded-lg mb-8">
        <div className="flex items-center gap-4">
          <img
            src={user?.photoURL || "/default-profile.png"}
            alt="Admin"
            className="w-20 h-20 rounded-full object-cover ring-2"
            style={{ borderColor: PRIMARY }}
          />
          <div>
            <h2 className="text-2xl font-semibold">{user?.displayName || "Admin"}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 text-center">
          <div>
            <h4 className="text-lg font-bold">{counts.posts}</h4>
            <p className="text-sm text-gray-600">Total Posts</p>
          </div>
          <div>
            <h4 className="text-lg font-bold">{counts.comments}</h4>
            <p className="text-sm text-gray-600">Total Comments</p>
          </div>
          <div>
            <h4 className="text-lg font-bold">{counts.users}</h4>
            <p className="text-sm text-gray-600">Total Users</p>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white shadow p-6 rounded-lg mb-8">
        <h3 className="text-lg font-semibold mb-4">Overview Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Tag Manager */}
      <div className="bg-white shadow p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Manage Tags</h3>

        {/* Add tag form */}
        <form onSubmit={handleAddTag} className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Enter tag (e.g. food, rescue)"
            className="flex-1 border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="btn text-white px-5 py-2 rounded"
            style={{ backgroundColor: PRIMARY }}
          >
            Add Tag
          </button>
        </form>

        {/* Tag list */}
        {tagsLoading ? (
          <p>Loading tags...</p>
        ) : tagsError ? (
          <p className="text-red-500 text-sm">Failed to load tags.</p>
        ) : tags.length === 0 ? (
          <p className="text-gray-500 text-sm">No tags yet.</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <li
                key={t._id}
                className="flex items-center gap-2 px-3 py-1 rounded-full border text-sm bg-[#F0FAFC]"
                style={{ borderColor: PRIMARY, color: PRIMARY }}
              >
                #{t.name}
                <button
                  type="button"
                  onClick={() => handleDeleteTag(t)}
                  className="p-1 rounded-full hover:bg-red-100 hover:text-red-600 transition"
                  title="Delete tag"
                >
                  <FaTrashAlt className="text-xs" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
