// // import React from 'react';

// // const AdminProfile = () => {
// //     return (
// //         <div>
// //             admin profile
// //         </div>
// //     );
// // };

// // export default AdminProfile;

// // import React, { useEffect, useState } from "react";
// // import useAxiosSecure from "../../../hooks/useAxiosSecure";
// // import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
// // import Swal from "sweetalert2";

// // const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

// // const AdminProfile = () => {
// //   const axiosSecure = useAxiosSecure();
// //   const [admin, setAdmin] = useState({});
// //   const [counts, setCounts] = useState({ posts: 0, comments: 0, users: 0 });
// //   const [tagInput, setTagInput] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchInfo = async () => {
// //       try {
// //         const [userRes, postRes, commentRes, userCountRes] = await Promise.all([
// //           axiosSecure.get("/auth/me"), 
// //           axiosSecure.get("/posts/count"),
// //           axiosSecure.get("/comments/count"),
// //           axiosSecure.get("/users/count"),
// //         ]);

// //         setAdmin(userRes.data);
// //         setCounts({
// //           posts: postRes.data.count || 0,
// //           comments: commentRes.data.count || 0,
// //           users: userCountRes.data.count || 0,
// //         });
// //       } catch (err) {
// //         console.error("Error loading admin profile", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchInfo();
// //   }, [axiosSecure]);

// //   const pieData = [
// //     { name: "Posts", value: counts.posts },
// //     { name: "Comments", value: counts.comments },
// //     { name: "Users", value: counts.users },
// //   ];

// //   const handleAddTag = async (e) => {
// //     e.preventDefault();
// //     if (!tagInput.trim()) return;

// //     try {
// //       await axiosSecure.post("/tags", { name: tagInput.trim() });
// //       Swal.fire("Success", "Tag added successfully", "success");
// //       setTagInput("");
// //     } catch (err) {
// //       console.error("Failed to add tag", err);
// //       Swal.fire("Error", "Could not add tag", "error");
// //     }
// //   };

// //   if (loading) return <p className="text-center py-10">Loading profile...</p>;

// //   return (
// //     <div className="max-w-5xl mx-auto mt-10 px-4">
// //       <div className="bg-white shadow p-6 rounded-lg mb-8">
// //         <div className="flex items-center gap-4">
// //           <img
// //             src={admin.image || "/default-profile.png"}
// //             alt="Admin"
// //             className="w-20 h-20 rounded-full object-cover"
// //           />
// //           <div>
// //             <h2 className="text-2xl font-semibold">{admin.name}</h2>
// //             <p className="text-gray-500">{admin.email}</p>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-3 gap-4 mt-6 text-center">
// //           <div>
// //             <h4 className="text-lg font-bold">{counts.posts}</h4>
// //             <p className="text-sm text-gray-600">Total Posts</p>
// //           </div>
// //           <div>
// //             <h4 className="text-lg font-bold">{counts.comments}</h4>
// //             <p className="text-sm text-gray-600">Total Comments</p>
// //           </div>
// //           <div>
// //             <h4 className="text-lg font-bold">{counts.users}</h4>
// //             <p className="text-sm text-gray-600">Total Users</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Pie Chart */}
// //       <div className="bg-white shadow p-6 rounded-lg mb-8">
// //         <h3 className="text-lg font-semibold mb-4">Overview Chart</h3>
// //         <ResponsiveContainer width="100%" height={300}>
// //           <PieChart>
// //             <Pie
// //               data={pieData}
// //               dataKey="value"
// //               nameKey="name"
// //               cx="50%"
// //               cy="50%"
// //               outerRadius={100}
// //               fill="#8884d8"
// //               label
// //             >
// //               {pieData.map((entry, index) => (
// //                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //               ))}
// //             </Pie>
// //             <Tooltip />
// //             <Legend />
// //           </PieChart>
// //         </ResponsiveContainer>
// //       </div>

// //       {/* Add Tag Form */}
// //       <div className="bg-white shadow p-6 rounded-lg">
// //         <h3 className="text-lg font-semibold mb-4">Add New Tag</h3>
// //         <form onSubmit={handleAddTag} className="flex flex-col sm:flex-row gap-4">
// //           <input
// //             type="text"
// //             value={tagInput}
// //             onChange={(e) => setTagInput(e.target.value)}
// //             placeholder="Enter tag (e.g. food, rescue)"
// //             className="flex-1 border px-3 py-2 rounded"
// //           />
// //           <button className="btn btn-primary px-5 py-2 rounded">Add Tag</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminProfile;

// // import React, { useEffect, useState } from "react";
// // import useAxiosSecure from "../../../hooks/useAxiosSecure";
// // import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
// // import Swal from "sweetalert2";
// // import useAuth from "../../../hooks/useAuth";


// // const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

// // const AdminProfile = () => {
// //   const axiosSecure = useAxiosSecure();
// //   const { user } = useAuth(); // ✅ Get name, email, image from auth context
// //    const [admin, setAdmin] = useState({});
// //   const [counts, setCounts] = useState({ posts: 0, comments: 0, users: 0 });
// //   const [tagInput, setTagInput] = useState("");
// //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchCounts = async () => {
// // //       try {
// // //         const [postRes, commentRes, userRes] = await Promise.all([
// // //           axiosSecure.get("/posts/count"),
// // //           axiosSecure.get("/comments/count"),
// // //           axiosSecure.get("/users/count"),
// // //         ]);

// // //         setCounts({
// // //           posts: postRes.data?.count || 0,
// // //           comments: commentRes.data?.count || 0,
// // //           users: userRes.data?.count || 0,
// // //         });
// // //       } catch (err) {
// // //         console.error("Error fetching counts", err);
// // //         Swal.fire("Error", "Failed to load stats", "error");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchCounts();
// // //   }, [axiosSecure]);

// //   useEffect(() => {
// //     const fetchInfo = async () => {
// //       try {
// //         const [userRes, postRes, commentRes, userCountRes] = await Promise.all([
// //           axiosSecure.get("/auth/me"),
// //           axiosSecure.get("/posts/count"),
// //           axiosSecure.get("/comments/count"),
// //           axiosSecure.get("/users/count"),
// //         ]);

// //         const userData = userRes.data?.user || userRes.data;

// //         console.log("Admin Info:", userData);

// //         setAdmin({
// //           name: userData.name || userData.displayName || "Admin",
// //           email: userData.email || "admin@example.com",
// //           image: userData.image || userData.photoURL || "/default-profile.png",
// //         });

// //         setCounts({
// //           posts: postRes.data.count || 0,
// //           comments: commentRes.data.count || 0,
// //           users: userCountRes.data.count || 0,
// //         });
// //       } catch (err) {
// //         console.error("Error loading admin profile", err);
// //         Swal.fire("Error", "Failed to load admin data", "error");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchInfo();
// //   }, [axiosSecure]);

// //   const pieData = [
// //     { name: "Posts", value: counts.posts },
// //     { name: "Comments", value: counts.comments },
// //     { name: "Users", value: counts.users },
// //   ];

// //   const handleAddTag = async (e) => {
// //     e.preventDefault();
// //     const tagName = tagInput.trim();
// //     if (!tagName) return;

// //     try {
// //       const res = await axiosSecure.post("/tags", { name: tagName });
// //       if (res.status === 201 || res.data.insertedId) {
// //         Swal.fire("Success", "Tag added successfully", "success");
// //         setTagInput("");
// //       }
// //     } catch (err) {
// //       console.error("Failed to add tag", err);
// //       Swal.fire("Error", "Tag already exists or failed to save", "error");
// //     }
// //   };

// //   if (loading) return <p className="text-center py-10">Loading profile...</p>;

// //   return (
// //     <div className="max-w-5xl mx-auto mt-10 px-4">
// //       <div className="bg-white shadow p-6 rounded-lg mb-8">
// //         <div className="flex items-center gap-4">
// //           <img
// //             src={user?.photoURL || "/default-profile.png"}
// //             alt="Admin"
// //             className="w-20 h-20 rounded-full object-cover"
// //           />
// //           <div>
// //             <h2 className="text-2xl font-semibold">{user?.displayName || "Admin"}</h2>
// //             <p className="text-gray-500">{user?.email}</p>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-3 gap-4 mt-6 text-center">
// //           <div>
// //             <h4 className="text-lg font-bold">{counts.posts}</h4>
// //             <p className="text-sm text-gray-600">Total Posts</p>
// //           </div>
// //           <div>
// //             <h4 className="text-lg font-bold">{counts.comments}</h4>
// //             <p className="text-sm text-gray-600">Total Comments</p>
// //           </div>
// //           <div>
// //             <h4 className="text-lg font-bold">{counts.users}</h4>
// //             <p className="text-sm text-gray-600">Total Users</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Pie Chart */}
// //       <div className="bg-white shadow p-6 rounded-lg mb-8">
// //         <h3 className="text-lg font-semibold mb-4">Overview Chart</h3>
// //         <ResponsiveContainer width="100%" height={300}>
// //           <PieChart>
// //             <Pie
// //               data={pieData}
// //               dataKey="value"
// //               nameKey="name"
// //               cx="50%"
// //               cy="50%"
// //               outerRadius={100}
// //               fill="#8884d8"
// //               label
// //             >
// //               {pieData.map((entry, index) => (
// //                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //               ))}
// //             </Pie>
// //             <Tooltip />
// //             <Legend />
// //           </PieChart>
// //         </ResponsiveContainer>
// //       </div>

// //       {/* Add Tag Form */}
// //       <div className="bg-white shadow p-6 rounded-lg">
// //         <h3 className="text-lg font-semibold mb-4">Add New Tag</h3>
// //         <form onSubmit={handleAddTag} className="flex flex-col sm:flex-row gap-4">
// //           <input
// //             type="text"
// //             value={tagInput}
// //             onChange={(e) => setTagInput(e.target.value)}
// //             placeholder="Enter tag (e.g. food, rescue)"
// //             className="flex-1 border px-3 py-2 rounded"
// //           />
// //           <button className="btn btn-primary px-5 py-2 rounded">Add Tag</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminProfile;



// import React, { useEffect, useState } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
// import { FaTrashAlt } from "react-icons/fa";
// import Swal from "sweetalert2";

// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useAuth from "../../../hooks/useAuth";

// const PRIMARY = "#4CA3B8";
// const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

// const AdminProfile = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const qc = useQueryClient();

//   const [counts, setCounts] = useState({ posts: 0, comments: 0, users: 0 });
//   const [tagInput, setTagInput] = useState("");
//   const [loadingStats, setLoadingStats] = useState(true);

//   /* --------------------
//    * Load summary counts
//    * -------------------- */
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [postRes, commentRes, userRes] = await Promise.all([
//           axiosSecure.get("/posts/count"),
//           axiosSecure.get("/comments/count"),
//           axiosSecure.get("/users/count"),
//         ]);
//         setCounts({
//           posts: postRes.data?.count || 0,
//           comments: commentRes.data?.count || 0,
//           users: userRes.data?.count || 0,
//         });
//       } catch (err) {
//         console.error("Admin stats load error:", err);
//         Swal.fire("Error", "Failed to load admin stats", "error");
//       } finally {
//         setLoadingStats(false);
//       }
//     };
//     fetchStats();
//   }, [axiosSecure]);

//   /* --------------------
//    * Load tags (React Query)
//    * -------------------- */
//   const {
//     data: tags = [],
//     isLoading: tagsLoading,
//     isError: tagsError,
//   } = useQuery({
//     queryKey: ["tags"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/tags");
//       return res.data || [];
//     },
//   });

//   /* --------------------
//    * Add tag
//    * -------------------- */
//   const handleAddTag = async (e) => {
//     e.preventDefault();
//     const tagName = tagInput.trim();
//     if (!tagName) return;

//     try {
//       const res = await axiosSecure.post("/tags", { name: tagName });
//       if (res.status === 201) {
//         Swal.fire("Success", "Tag added successfully", "success");
//         setTagInput("");
//         qc.invalidateQueries({ queryKey: ["tags"] });
//       }
//     } catch (err) {
//       console.error("Add tag failed:", err);
//       Swal.fire("Error", err.response?.data?.message || "Could not add tag", "error");
//     }
//   };

//   /* --------------------
//    * Delete tag
//    * -------------------- */
//   const handleDeleteTag = async (tag) => {
//     const confirm = await Swal.fire({
//       title: `Delete tag "${tag.name}"?`,
//       text: "This cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: PRIMARY,
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete",
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       await axiosSecure.delete(`/tags/${tag._id}`);
//       Swal.fire("Deleted!", "Tag removed.", "success");
//       qc.invalidateQueries({ queryKey: ["tags"] });
//     } catch (err) {
//       console.error("Delete tag failed:", err);
//       Swal.fire("Error", "Could not delete tag", "error");
//     }
//   };

//   const pieData = [
//     { name: "Posts", value: counts.posts },
//     { name: "Comments", value: counts.comments },
//     { name: "Users", value: counts.users },
//   ];

//   if (loadingStats) {
//     return <p className="text-center py-10">Loading profile...</p>;
//   }

//   return (
//     <div className="max-w-5xl mx-auto mt-10 px-4">
//       {/* Admin Card */}
//       <div className="bg-white shadow p-6 rounded-lg mb-8">
//         <div className="flex items-center gap-4">
//           <img
//             src={user?.photoURL || "/default-profile.png"}
//             alt="Admin"
//             className="w-20 h-20 rounded-full object-cover ring-2"
//             style={{ borderColor: PRIMARY }}
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

//       {/* Tag Manager */}
//       <div className="bg-white shadow p-6 rounded-lg">
//         <h3 className="text-lg font-semibold mb-4">Manage Tags</h3>

//         {/* Add tag form */}
//         <form onSubmit={handleAddTag} className="flex flex-col sm:flex-row gap-4 mb-6">
//           <input
//             type="text"
//             value={tagInput}
//             onChange={(e) => setTagInput(e.target.value)}
//             placeholder="Enter tag (e.g. food, rescue)"
//             className="flex-1 border px-3 py-2 rounded"
//           />
//           <button
//             type="submit"
//             className="btn text-white px-5 py-2 rounded"
//             style={{ backgroundColor: PRIMARY }}
//           >
//             Add Tag
//           </button>
//         </form>

//         {/* Tag list */}
//         {tagsLoading ? (
//           <p>Loading tags...</p>
//         ) : tagsError ? (
//           <p className="text-red-500 text-sm">Failed to load tags.</p>
//         ) : tags.length === 0 ? (
//           <p className="text-gray-500 text-sm">No tags yet.</p>
//         ) : (
//           <ul className="flex flex-wrap gap-2">
//             {tags.map((t) => (
//               <li
//                 key={t._id}
//                 className="flex items-center gap-2 px-3 py-1 rounded-full border text-sm bg-[#F0FAFC]"
//                 style={{ borderColor: PRIMARY, color: PRIMARY }}
//               >
//                 #{t.name}
//                 <button
//                   type="button"
//                   onClick={() => handleDeleteTag(t)}
//                   className="p-1 rounded-full hover:bg-red-100 hover:text-red-600 transition"
//                   title="Delete tag"
//                 >
//                   <FaTrashAlt className="text-xs" />
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { FaUserCircle, FaEnvelope, FaTag, FaAward, FaCalendarAlt, FaLock, FaImage, FaEdit, FaCheckCircle, FaTimesCircle, FaSpinner, FaSignOutAlt, FaInfoCircle, FaCog } from 'react-icons/fa'; // Added FaInfoCircle, FaCog for default view
import moment from 'moment';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';

const AdminProfile = () => {
    const { user, auth, signOutUser } = useAuth();
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors }, getValues, reset } = useForm(); 

    const [adminInfo, setAdminInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;

    useEffect(() => {
        const fetchAdminProfile = async () => {
            if (user?.email) {
                try {
                    const res = await axiosInstance.get(`/users/${user.email}`);
                    const fetchedAdminInfo = res.data;

                    // ✅ Check if the fetched user has 'admin' role
                    if (fetchedAdminInfo.role === 'admin') {
                        setAdminInfo(fetchedAdminInfo);
                        setValue('name', fetchedAdminInfo.name || user.displayName);
                        setValue('email', fetchedAdminInfo.email || user.email);
                    } else {
                        // If not admin, do not set adminInfo and redirect or show error
                        Swal.fire({
                            icon: 'error',
                            title: 'Access Denied',
                            text: 'You do not have administrative privileges to view this page.',
                            confirmButtonText: 'Go to Home'
                        }).then(() => {
                            navigate('/'); // Redirect non-admin users to home page
                        });
                        setAdminInfo(null); // Ensure adminInfo is null for non-admins
                    }
                } catch (error) {
                    console.error("Failed to fetch admin profile:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to load profile data. Please try again later.',
                    });
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
                // If no user is logged in, redirect to login/home
                Swal.fire({
                    icon: 'warning',
                    title: 'Authentication Required',
                    text: 'Please log in to view this page.',
                    confirmButtonText: 'Go to Login'
                }).then(() => {
                    navigate('/join-us?type=login');
                });
            }
        };

        fetchAdminProfile();
    }, [user, axiosInstance, setValue, navigate]);

    // --- প্রোফাইল আপডেট হ্যান্ডলিং ---
    const handleProfileUpdate = async (data) => {
        setUploadingImage(true);
        let photoURL = adminInfo?.photo || user?.photoURL; // Default to current photo or user's Firebase photo

        try {
            if (data.image && data.image[0]) {
                const formData = new FormData();
                formData.append('image', data.image[0]);
                const imageRes = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
                    formData
                );
                photoURL = imageRes.data.data.url;
            }

            // Update Firebase profile
            await updateProfile(auth.currentUser, {
                displayName: data.name,
                photoURL: photoURL,
            });

            // Update user data in your backend database
            await axiosInstance.put(`/users/${user.email}`, {
                name: data.name,
                photo: photoURL,
            });

            setAdminInfo(prev => ({ ...prev, name: data.name, photo: photoURL }));

            Swal.fire({
                icon: 'success',
                title: 'Profile Updated!',
                text: 'Your profile has been successfully updated.',
            });
            setIsEditingProfile(false);
            reset({ name: data.name, email: user.email, image: null }); // ✅ Reset image field after successful update
        } catch (error) {
            console.error("Failed to update profile:", error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed!',
                text: error.message || 'There was an error updating your profile.',
            });
        } finally {
            setUploadingImage(false);
        }
    };

    // --- পাসওয়ার্ড পরিবর্তন হ্যান্ডলিং ---
    const handleChangePassword = async (data) => {
        const { currentPassword, newPassword } = data;

        const credential = EmailAuthProvider.credential(user.email, currentPassword);

        try {
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updatePassword(auth.currentUser, newPassword);

            Swal.fire({
                icon: 'success',
                title: 'Password Changed!',
                text: 'Your password has been successfully updated.',
            });
            setIsChangingPassword(false);
            reset({ currentPassword: '', newPassword: '', confirmPassword: '' }); 
        } catch (error) {
            console.error("Password change failed:", error);
            let errorMessage = error.message;
            if (error.code === 'auth/wrong-password') {
                errorMessage = 'The current password you entered is incorrect.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'The new password is too weak. Please use a stronger password.';
            } else if (error.code === 'auth/requires-recent-login') {
                errorMessage = 'Please log out and log in again to change your password.';
            }
            Swal.fire({
                icon: 'error',
                title: 'Password Change Failed!',
                text: errorMessage,
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-[#4CA3B8]"></span>
            </div>
        );
    }

    if (!adminInfo) {
        return null; 
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <title>Admin Profile || Petiva</title>
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Admin Profile</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-xl border border-gray-200">
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src={adminInfo.photo || user.photoURL || "/default-avatar.png"}
                            alt="Admin Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-[#4CA3B8] shadow-md"
                        />
                        <h3 className="text-2xl font-bold mt-4 text-gray-800">{adminInfo.name || user.displayName || "Admin User"}</h3>
                        <p className={`badge ${adminInfo.role === 'admin' ? 'badge-primary' : 'badge-info'} text-white mt-2 px-3 py-1 text-sm`}>
                            <FaTag className="inline-block mr-1" /> {adminInfo.role ? adminInfo.role.toUpperCase() : "USER"}
                        </p>
                        <p className={`badge ${adminInfo.badge === 'Bronze' ? 'bg-amber-700' : adminInfo.badge === 'Silver' ? 'bg-slate-400' : adminInfo.badge === 'Gold' ? 'bg-yellow-500' : 'bg-gray-500'} text-white mt-2 px-3 py-1 text-sm`}> {/* ✅ Added Gold badge and default gray */}
                           <FaAward className="inline-block mr-1" /> {adminInfo.badge || "No Badge"}
                        </p>
                    </div>

                    <div className="space-y-4 text-gray-700">
                        <p className="flex items-center gap-2"><FaEnvelope className="text-[#4CA3B8]" /> <strong>Email:</strong> {adminInfo.email || user.email}</p>
                        <p className="flex items-center gap-2"><FaCalendarAlt className="text-[#4CA3B8]" /> <strong>Joined:</strong> {moment(adminInfo.created_at).format('MMMM D, YYYY')}</p>
                    </div>

                    <div className="mt-8 flex flex-col space-y-4">
                        <button
                            onClick={() => { setIsEditingProfile(!isEditingProfile); setIsChangingPassword(false); }} // ✅ Close other form
                            className="btn bg-[#4CA3B8] text-white hover:bg-[#3b889e] w-full"
                        >
                            <FaEdit /> {isEditingProfile ? 'Cancel Edit' : 'Edit Profile'}
                        </button>
                        <button
                            onClick={() => { setIsChangingPassword(!isChangingPassword); setIsEditingProfile(false); reset(); }} // ✅ Close other form, reset password form
                            className="btn btn-outline btn-info hover:bg-[#4CA3B8] hover:text-white w-full"
                        >
                            <FaLock /> {isChangingPassword ? 'Cancel Password Change' : 'Change Password'}
                        </button>
                        <button
                            onClick={signOutUser}
                            className="btn btn-error text-white hover:bg-red-700 w-full"
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>

                {/* Main Content: Edit Profile / Change Password / Default View */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-xl border border-gray-200">
                    {isEditingProfile && (
                        <div className="mb-8">
                            <h3 className="text-3xl font-bold text-gray-700 mb-6 border-b pb-3">Edit Profile</h3>
                            <form onSubmit={handleSubmit(handleProfileUpdate)} className="space-y-4">
                                <div>
                                    <label className="label block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        {...register('name', { required: "Name is required" })}
                                        className="input input-bordered w-full"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <label className="label block text-gray-700 text-sm font-bold mb-2">Profile Image</label>
                                    <input
                                        type="file"
                                        {...register('image')}
                                        className="file-input file-input-bordered w-full"
                                    />
                                    {uploadingImage && <p className="text-blue-500 text-xs mt-1"><FaSpinner className="animate-spin inline-block mr-1" /> Uploading image...</p>}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => { setIsEditingProfile(false); reset({ name: adminInfo.name, email: user.email, image: null }); }} // ✅ Reset form fields on cancel
                                        className="btn btn-ghost"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn bg-[#4CA3B8] text-white hover:bg-[#3b889e]"
                                        disabled={uploadingImage}
                                    >
                                        <FaCheckCircle /> Update Profile
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {isChangingPassword && (
                        <div>
                            <h3 className="text-3xl font-bold text-gray-700 mb-6 border-b pb-3">Change Password</h3>
                            <form onSubmit={handleSubmit(handleChangePassword)} className="space-y-4">
                                <div>
                                    <label className="label block text-gray-700 text-sm font-bold mb-2">Current Password</label>
                                    <input
                                        type="password"
                                        {...register('currentPassword', { required: "Current password is required" })}
                                        className="input input-bordered w-full"
                                    />
                                    {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword.message}</p>}
                                </div>
                                <div>
                                    <label className="label block text-gray-700 text-sm font-bold mb-2">New Password</label>
                                    <input
                                        type="password"
                                        {...register('newPassword', {
                                            required: "New password is required",
                                            minLength: { value: 6, message: "Password must be at least 6 characters" },
                                            pattern: {
                                                value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                                message: "Password must have uppercase, lowercase, number and special character."
                                            }
                                        })}
                                        className="input input-bordered w-full"
                                    />
                                    {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}
                                </div>
                                <div>
                                    <label className="label block text-gray-700 text-sm font-bold mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        {...register('confirmPassword', {
                                            required: "Confirm password is required",
                                            validate: value => value === getValues('newPassword') || "Passwords do not match" // ✅ Corrected validation with getValues()
                                        })}
                                        className="input input-bordered w-full"
                                    />
                                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => { setIsChangingPassword(false); reset(); }} // ✅ Reset form fields on cancel
                                        className="btn btn-ghost"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn bg-[#4CA3B8] text-white hover:bg-[#3b889e]"
                                    >
                                        <FaCheckCircle /> Change Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Default View if no edit/password change is active */}
                    {!isEditingProfile && !isChangingPassword && (
                        <div className="text-center py-12">
                            <FaCog className="text-6xl text-gray-400 mb-4 mx-auto" /> {/* ✅ Added an icon for the default view */}
                            <h3 className="text-xl font-semibold text-gray-600 mb-4">
                                <FaInfoCircle className="inline-block mr-2 text-[#4CA3B8]" /> Manage Your Administrative Profile Settings
                            </h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                Here you can **update your personal information**, **change your profile picture**, or **securely modify your password**. Utilize the options on the left to ensure your administrator account details are always current and protected.
                            </p>
                            <p className="text-gray-500 max-w-md mx-auto mt-2">
                                For security, remember to use a strong, unique password and consider updating it regularly.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;