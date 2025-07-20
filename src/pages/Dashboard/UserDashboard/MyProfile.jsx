// import React, { useContext } from "react";
// import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
// import useAxios from "../../../hooks/useAxios";
// import { useQuery } from "@tanstack/react-query";
// import { motion } from "framer-motion";
// import { Tooltip } from "react-tooltip";
// import "react-tooltip/dist/react-tooltip.css";

// const MyProfile = () => {
//   const { user } = useContext(AuthContext);
//   const axios = useAxios();

//   const isMember = user?.isMember || false;

//   // ✅ Fetch recent 3 posts
//   const { data: posts = [], isLoading } = useQuery({
//     queryKey: ["recentPosts", user?.email],
//     queryFn: async () => {
//       const res = await axios.get(`/recent?email=${user.email}&limit=3`);
//       return res.data;
//     },
//     enabled: !!user?.email,
//   });

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10">
//       {/* ✅ User Info Section */}
//       <div className="flex flex-col items-center gap-3 mb-10 relative">
//         {/* Profile Image */}
//         <motion.img
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.4 }}
//           src={user?.photoURL}
//           alt="Profile"
//           className="w-28 h-28 rounded-full border-2 border-primary object-cover shadow-md"
//         />

//         {/* Name + Email */}
//         <h2 className="text-2xl font-semibold text-gray-800">
//           {user?.displayName}
//         </h2>
//         <p className="text-gray-500">{user?.email}</p>

//         {/* ✅ Badges */}
//         <div className="flex gap-4 mt-3">
//           {!isMember && (
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               data-tooltip-id="bronze"
//               className="flex items-center gap-2 px-3 py-1 bg-amber-400 text-white rounded-full shadow cursor-pointer"
//             >
//               🥉 <span className="text-sm font-medium">Bronze Badge</span>
//             </motion.div>
//           )}
//           {isMember && (
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               data-tooltip-id="gold"
//               className="flex items-center gap-2 px-3 py-1 bg-yellow-500 text-white rounded-full shadow cursor-pointer"
//             >
//               🥇 <span className="text-sm font-medium">Gold Badge</span>
//             </motion.div>
//           )}
//         </div>

//         {/* Tooltips */}
//         <Tooltip id="bronze" content="You are a registered user. 🟤 Bronze Level." />
//         <Tooltip id="gold" content="You are a member! 🟡 Gold Level." />
//       </div>

//       {/* ✅ My Recent Posts */}
//       <div>
//         <h3 className="text-xl font-semibold mb-5 text-center text-gray-700">
//           My 3 Recent Posts
//         </h3>

//         {isLoading ? (
//           <p className="text-center text-sm text-gray-500">Loading posts...</p>
//         ) : posts.length === 0 ? (
//           <p className="text-center text-gray-400">You have no posts yet.</p>
//         ) : (
//           <div className="space-y-4">
//             {posts.map((post) => (
//               <motion.div
//                 key={post._id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
//               >
//                 <h4 className="text-lg font-bold text-gray-800">{post.title}</h4>
//                 <p className="text-gray-600 text-sm mb-1">
//                   {post.description?.slice(0, 100)}...
//                 </p>
//                 <div className="text-xs text-gray-400">
//                   Tag: <span className="capitalize">{post.tag}</span>
//                 </div>
//                 <div className="text-xs text-gray-400">
//                   Posted on:{" "}
//                   {post.postTime
//                     ? new Date(post.postTime).toLocaleString("en-BD", {
//                         dateStyle: "medium",
//                         timeStyle: "short",
//                       })
//                     : "Unknown"}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyProfile;


// import React, { useEffect, useState, useCallback } from 'react';
// import { FaUserCircle, FaEnvelope, FaCalendarAlt, FaComments, FaClipboardList, FaMapMarkerAlt, FaEdit, FaLink } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import useAuth from '../../../hooks/useAuth';
// import useAxios from '../../../hooks/useAxios';
// import Loader from '../../../shared/Loader/Loader';

// // Tailwind CSS Primary Colors (আপনার AllPost.jsx থেকে নেওয়া)
// const PRIMARY_COLOR_CLASS = "text-[#4CA3B8]";
// const PRIMARY_BG_COLOR_CLASS = "bg-[#4CA3B8]";
// const PRIMARY_BORDER_COLOR_CLASS = "border-[#4CA3B8]";
// const PRIMARY_HOVER_BG_COLOR_CLASS = "hover:bg-[#3B8E9B]";


// const MyProfile = () => {
//     const { user, loading: authLoading, updateUserProfile } = useAuth(); // Firebase user data
//     const privateAxios = useAxios(); // Authenticated axios instance
//     const [profileData, setProfileData] = useState(null); // Custom profile data from your DB
//     const [userPosts, setUserPosts] = useState([]); // User's posts
//     const [recentActivity, setRecentActivity] = useState([]); // Recent posts
//     const [loading, setLoading] = useState(true); // Combined loading state
//     const [editMode, setEditMode] = useState(false); // For future profile editing

//     // State for editable fields (if you add update functionality)
//     const [aboutMe, setAboutMe] = useState('');
//     const [location, setLocation] = useState('');
//     const [fullName, setFullName] = useState('');
//     const [profileImageUrl, setProfileImageUrl] = useState(''); // For local state of image upload


//     // Base URL for your backend API
//     const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

//     // Function to fetch all user-related data
//     const fetchUserData = useCallback(async () => {
//         if (!user?.email) {
//             setLoading(false);
//             return;
//         }

//         setLoading(true);
//         try {
//             // 1. Fetch user's custom profile data from your DB
//             // Assuming /users/:email returns joinedAt, aboutMe, location, etc.
//             const userDbRes = await privateAxios.get(`${API_BASE}/users/${user.email}`);
//             setProfileData(userDbRes.data);
//             setAboutMe(userDbRes.data.aboutMe || '');
//             setLocation(userDbRes.data.location || '');
//             setFullName(userDbRes.data.fullName || user.displayName || '');
//             setProfileImageUrl(user.photoURL || 'https://i.ibb.co/VgY9pJf/avatar.png');


//             // 2. Fetch user's total posts and comments
//             const statsRes = await privateAxios.get(`${API_BASE}/user-stats?email=${user.email}`);
//             setProfileData(prev => ({ ...prev, ...statsRes.data })); // Merge stats into profileData

//             // 3. Fetch user's recent posts (e.g., last 3)
//             const recentRes = await privateAxios.get(`${API_BASE}/recent?email=${user.email}&limit=3`);
//             setRecentActivity(recentRes.data);

//             // You can add more fetches here if needed, e.g., liked posts, comments list
//             // For 'My Posts' full list, you might need a separate API like /user-all-posts?email=...
//             // For now, we'll just show recent posts as "My Posts" in a simplified way.

//         } catch (error) {
//             console.error("Failed to fetch user profile data:", error);
//             // Handle error, maybe show a message to the user
//         } finally {
//             setLoading(false);
//         }
//     }, [user, privateAxios, API_BASE]);

//     useEffect(() => {
//         if (!authLoading) { // Only fetch when Firebase auth state is resolved
//             fetchUserData();
//         }
//     }, [user, authLoading, fetchUserData]);


//     // Function to handle profile update (Future implementation)
//     const handleProfileUpdate = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             // Update Firebase profile (display name, photoURL)
//             await updateUserProfile({
//                 displayName: fullName,
//                 photoURL: profileImageUrl // If you add an option to change photoURL
//             });

//             // Update custom fields in your MongoDB users collection
//             // You'll need a PATCH endpoint like /users/:email on your backend
//             await privateAxios.patch(`${API_BASE}/users/${user.email}`, {
//                 aboutMe,
//                 location,
//                 fullName, // Update full name in DB if different from display name
//             });

//             alert('Profile updated successfully!');
//             setEditMode(false); // Exit edit mode
//             fetchUserData(); // Re-fetch to show updated data

//         } catch (error) {
//             console.error('Error updating profile:', error);
//             alert('Failed to update profile.');
//         } finally {
//             setLoading(false);
//         }
//     };


//     if (authLoading || loading) {
//         return <div className="min-h-screen flex items-center justify-center"><Loader /></div>;
//     }

//     if (!user) {
//         return (
//             <div className="min-h-screen flex items-center justify-center text-xl text-gray-700">
//                 Please log in to view your profile.
//             </div>
//         );
//     }

//     const memberSinceDate = user.metadata?.creationTime ?
//         new Date(parseInt(user.metadata.creationTime)).toLocaleDateString() :
//         profileData?.joinedAt ? new Date(profileData.joinedAt).toLocaleDateString() : 'N/A'; // Prioritize Firebase, then your DB

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="container mx-auto p-4 md:p-8 min-h-screen bg-gray-50 pt-20"
//         >
//             <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
//                 {/* Profile Header */}
//                 <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-gray-200">
//                     <div className="relative">
//                         <img
//                             src={user.photoURL || 'https://i.ibb.co/VgY9pJf/avatar.png'} // Fallback avatar
//                             alt={user.displayName || 'User Avatar'}
//                             className={`w-28 h-28 md:w-32 md:h-32 rounded-full object-cover ring-4 ring-offset-2 ${PRIMARY_BORDER_COLOR_CLASS} shadow-md`}
//                         />
//                         {/* Edit photo button can go here later */}
//                     </div>
//                     <div className="text-center sm:text-left flex-grow">
//                         <h1 className={`text-3xl font-bold text-gray-800 mb-1`}>
//                             {user.displayName || profileData?.fullName || 'N/A'}
//                         </h1>
//                         <p className={`text-md ${PRIMARY_COLOR_CLASS} mb-2`}>
//                             {profileData?.role || 'Member'}
//                         </p>
//                         <p className="text-gray-600 text-sm flex items-center justify-center sm:justify-start gap-2 mb-1">
//                             <FaEnvelope className={`${PRIMARY_COLOR_CLASS} text-lg`} /> {user.email}
//                         </p>
//                         <p className="text-gray-600 text-sm flex items-center justify-center sm:justify-start gap-2">
//                             <FaCalendarAlt className={`${PRIMARY_COLOR_CLASS} text-lg`} /> Member Since: {memberSinceDate}
//                         </p>
//                     </div>
//                     <button
//                         onClick={() => setEditMode(!editMode)}
//                         className={`text-sm px-4 py-2 rounded-lg flex items-center gap-2 ${PRIMARY_BG_COLOR_CLASS} text-white ${PRIMARY_HOVER_BG_COLOR_CLASS} transition-colors mt-4 sm:mt-0`}
//                     >
//                         <FaEdit /> {editMode ? 'Cancel Edit' : 'Edit Profile'}
//                     </button>
//                 </div>

//                 {/* Editable Profile Information */}
//                 {editMode ? (
//                     <form onSubmit={handleProfileUpdate} className="mt-8 space-y-6">
//                         <div>
//                             <label className="block text-gray-700 text-sm font-bold mb-2">Display Name:</label>
//                             <input
//                                 type="text"
//                                 value={fullName}
//                                 onChange={(e) => setFullName(e.target.value)}
//                                 className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ${PRIMARY_FOCUS_OUTLINE_CLASS}`}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 text-sm font-bold mb-2">About Me:</label>
//                             <textarea
//                                 value={aboutMe}
//                                 onChange={(e) => setAboutMe(e.target.value)}
//                                 rows="4"
//                                 className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ${PRIMARY_FOCUS_OUTLINE_CLASS}`}
//                             ></textarea>
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
//                             <input
//                                 type="text"
//                                 value={location}
//                                 onChange={(e) => setLocation(e.target.value)}
//                                 className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ${PRIMARY_FOCUS_OUTLINE_CLASS}`}
//                             />
//                         </div>
//                         {/* Add more fields here as needed: contact info, profile image upload, etc. */}
//                         <div className="flex justify-end gap-3">
//                             <button
//                                 type="submit"
//                                 className={`px-5 py-2 rounded-lg text-white font-semibold ${PRIMARY_BG_COLOR_CLASS} ${PRIMARY_HOVER_BG_COLOR_CLASS} transition-colors`}
//                             >
//                                 Save Changes
//                             </button>
//                         </div>
//                     </form>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
//                         {/* About Me */}
//                         <div>
//                             <h3 className={`text-xl font-semibold mb-3 ${PRIMARY_COLOR_CLASS}`}>About Me</h3>
//                             <p className="text-gray-700 text-sm leading-relaxed">
//                                 {profileData?.aboutMe || "No bio yet. Tell us something about yourself!"}
//                             </p>
//                             {profileData?.location && (
//                                 <p className="text-gray-600 text-sm flex items-center gap-2 mt-2">
//                                     <FaMapMarkerAlt className={`${PRIMARY_COLOR_CLASS} text-base`} /> {profileData.location}
//                                 </p>
//                             )}
//                             {profileData?.contactInfo?.website && (
//                                 <a href={profileData.contactInfo.website} target="_blank" rel="noopener noreferrer"
//                                    className={`text-sm flex items-center gap-2 mt-2 ${PRIMARY_COLOR_CLASS} hover:underline`}>
//                                     <FaLink className={`${PRIMARY_COLOR_CLASS} text-base`} /> Website
//                                 </a>
//                             )}
//                             {/* Add other contact info links here */}
//                         </div>

//                         {/* Forum Stats */}
//                         <div>
//                             <h3 className={`text-xl font-semibold mb-3 ${PRIMARY_COLOR_CLASS}`}>Forum Stats</h3>
//                             <div className="space-y-2">
//                                 <p className="text-gray-700 flex items-center gap-2">
//                                     <FaClipboardList className={`${PRIMARY_COLOR_CLASS} text-xl`} />
//                                     Total Posts: <span className="font-semibold">{profileData?.totalPosts || 0}</span>
//                                 </p>
//                                 <p className="text-gray-700 flex items-center gap-2">
//                                     <FaComments className={`${PRIMARY_COLOR_CLASS} text-xl`} />
//                                     Total Comments: <span className="font-semibold">{profileData?.totalComments || 0}</span>
//                                 </p>
//                                 {profileData?.reputation && (
//                                     <p className="text-gray-700 flex items-center gap-2">
//                                         <FaUserCircle className={`${PRIMARY_COLOR_CLASS} text-xl`} />
//                                         Reputation: <span className="font-semibold">{profileData.reputation}</span>
//                                     </p>
//                                 )}
//                                 {/* Add badges here if implemented */}
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Recent Activity */}
//                 <div className="mt-10 pt-6 border-t border-gray-200">
//                     <h3 className={`text-xl font-semibold mb-5 ${PRIMARY_COLOR_CLASS}`}>My Recent Posts</h3>
//                     {recentActivity.length > 0 ? (
//                         <div className="grid grid-cols-1 gap-4">
//                             {recentActivity.map(post => (
//                                 <motion.div
//                                     key={post._id}
//                                     initial={{ opacity: 0, x: -20 }}
//                                     animate={{ opacity: 1, x: 0 }}
//                                     transition={{ duration: 0.3, delay: 0.1 }}
//                                     className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
//                                 >
//                                     <Link to={`/post-details/${post._id}`} className="block">
//                                         <h4 className={`text-lg font-semibold ${PRIMARY_COLOR_CLASS} hover:underline`}>
//                                             {post.title}
//                                         </h4>
//                                         <p className="text-gray-600 text-sm mt-1">
//                                             Posted on: {new Date(post.postTime).toLocaleDateString()}
//                                         </p>
//                                         <div className="flex items-center gap-4 text-gray-500 text-sm mt-2">
//                                             <span>
//                                                 <FaComments className="inline-block mr-1" /> {post.commentCount || 0} Comments
//                                             </span>
//                                             <span>
//                                                 <FaThumbsUp className="inline-block mr-1" /> {post.upVote || 0} Upvotes
//                                             </span>
//                                         </div>
//                                     </Link>
//                                 </motion.div>
//                             ))}
//                             {/* Link to all posts if you have a separate "My All Posts" page */}
//                             {profileData?.totalPosts > recentActivity.length && (
//                                 <div className="text-right mt-4">
//                                     <Link to="/dashboard/my-posts" className={`text-sm font-semibold ${PRIMARY_COLOR_CLASS} hover:underline`}>
//                                         View All My Posts &rarr;
//                                     </Link>
//                                 </div>
//                             )}
//                         </div>
//                     ) : (
//                         <p className="text-gray-600">No posts created yet.</p>
//                     )}
//                 </div>

//                 {/* Future Sections: Liked Posts, Bookmarked Posts, Settings */}
//                 {/* <div className="mt-10 pt-6 border-t border-gray-200">
//                     <h3 className={`text-xl font-semibold mb-5 ${PRIMARY_COLOR_CLASS}`}>Liked Posts</h3>
//                     <p className="text-gray-600">Feature coming soon!</p>
//                 </div>
//                 <div className="mt-10 pt-6 border-t border-gray-200">
//                     <h3 className={`text-xl font-semibold mb-5 ${PRIMARY_COLOR_CLASS}`}>Settings & Privacy</h3>
//                     <p className="text-gray-600">Manage email notifications, privacy settings, and more here.</p>
//                     <button className={`mt-4 px-4 py-2 rounded-lg ${PRIMARY_BG_COLOR_CLASS} text-white ${PRIMARY_HOVER_BG_COLOR_CLASS} transition-colors`}>
//                         Change Password
//                     </button>
//                 </div> */}

//             </div>
//         </motion.div>
//     );
// };

// export default MyProfile;


  // ** ei code thik ache pass and bio chara 

// import React, { useEffect, useState, useCallback } from 'react';
// import { FaUserCircle, FaEnvelope, FaCalendarAlt, FaComments, FaClipboardList, FaMapMarkerAlt, FaEdit, FaLink, FaThumbsUp } from 'react-icons/fa'; 
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import useAuth from '../../../hooks/useAuth';
// import useAxios from '../../../hooks/useAxios';
// import Loader from '../../../shared/Loader/Loader';


// const PRIMARY_COLOR_CLASS = "text-[#4CA3B8]";
// const PRIMARY_BG_COLOR_CLASS = "bg-[#4CA3B8]";
// const PRIMARY_BORDER_COLOR_CLASS = "border-[#4CA3B8]";
// const PRIMARY_HOVER_BG_COLOR_CLASS = "hover:bg-[#3B8E9B]";
// const PRIMARY_FOCUS_OUTLINE_CLASS = "focus:ring-2 focus:ring-[#4CA3B8] focus:border-transparent";


// const MyProfile = () => {
//     const { user, loading: authLoading, updateUserProfile } = useAuth(); 
//     const privateAxios = useAxios();
//     const [profileData, setProfileData] = useState(null);
//     const [recentActivity, setRecentActivity] = useState([]); 
//     const [loading, setLoading] = useState(true); 
//     const [editMode, setEditMode] = useState(false); 


//     const [aboutMe, setAboutMe] = useState('');
//     const [location, setLocation] = useState('');
//     const [fullName, setFullName] = useState('');
 
//     const [profileImageUrl, setProfileImageUrl] = useState(''); 


//     // Base URL for your backend API
//     const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

//     // Function to fetch all user-related data
//     const fetchUserData = useCallback(async () => {
//         if (!user?.email) {
//             setLoading(false);
//             return;
//         }

//         setLoading(true);
//         try {
            
//             const userDbRes = await privateAxios.get(`${API_BASE}/users/${user.email}`);
//             const dbUserData = userDbRes.data;

            
//             const statsRes = await privateAxios.get(`${API_BASE}/user-stats?email=${user.email}`);
//             const statsData = statsRes.data;
            
        
//             const recentRes = await privateAxios.get(`${API_BASE}/recent?email=${user.email}&limit=3`);
//             setRecentActivity(recentRes.data);

   
//             setProfileData(prev => ({
//                 ...prev, 
//                 ...dbUserData, 
//                 ...statsData,  
              
//                 aboutMe: dbUserData.aboutMe || '',
//                 location: dbUserData.location || '',
//                 fullName: dbUserData.fullName || user.displayName || '', 
//                 role: dbUserData.role || 'Member', 
//                 reputation: dbUserData.reputation || 0,
//             }));

//             // Set states for editable fields
//             setAboutMe(dbUserData.aboutMe || '');
//             setLocation(dbUserData.location || '');
//             setFullName(dbUserData.fullName || user.displayName || '');
//             setProfileImageUrl(user.photoURL || 'https://i.ibb.co/VgY9pJf/avatar.png'); 

//         } catch (error) {
//             console.error("Failed to fetch user profile data:", error);
          
//         } finally {
//             setLoading(false);
//         }
//     }, [user, privateAxios, API_BASE]);

//     useEffect(() => {
//         if (!authLoading) {
//             fetchUserData();
//         }
//     }, [user, authLoading, fetchUserData]);


//     // Function to handle profile update
//     const handleProfileUpdate = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
         
//             await updateUserProfile({
//                 displayName: fullName, 
               
//             });
            
        
//             await privateAxios.patch(`${API_BASE}/users/${user.email}`, {
//                 aboutMe,
//                 location,
//                 fullName, 
//             });

//             alert('Profile updated successfully!');
//             setEditMode(false); 
//             fetchUserData(); 

//         } catch (error) {
//             console.error('Error updating profile:', error);
//             alert('Failed to update profile. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };


//     if (authLoading || loading) {
//         return <div className="min-h-screen flex items-center justify-center"><Loader /></div>;
//     }

//     if (!user) {
//         return (
//             <div className="min-h-screen flex items-center justify-center text-xl text-gray-700">
//                 Please log in to view your profile.
//             </div>
//         );
//     }

//     const memberSinceDate = user.metadata?.creationTime ?
//         new Date(parseInt(user.metadata.creationTime)).toLocaleDateString() :
//         profileData?.joinedAt ? new Date(profileData.joinedAt).toLocaleDateString() : 'N/A';

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="container mx-auto p-4 md:p-8 min-h-screen bg-gray-50 pt-20"
//         >
//             <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
//                 {/* Profile Header */}
//                 <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-gray-200">
//                     <div className="relative">
//                         <img
//                             src={user.photoURL || 'https://i.ibb.co/VgY9pJf/avatar.png'} 
//                             alt={user.displayName || 'User Avatar'}
//                             className={`w-28 h-28 md:w-32 md:h-32 rounded-full object-cover ring-4 ring-offset-2 ${PRIMARY_BORDER_COLOR_CLASS} shadow-md`}
//                         />
//                         {/* Edit photo button can go here later */}
//                     </div>
//                     <div className="text-center sm:text-left flex-grow">
//                         <h1 className={`text-3xl font-bold text-gray-800 mb-1`}>
//                             {user.displayName || profileData?.fullName || 'N/A'} 
//                         </h1>
//                         <p className={`text-md ${PRIMARY_COLOR_CLASS} mb-2`}>
//                             {profileData?.role || 'Member'} 
//                         </p>
//                         <p className="text-gray-600 text-sm flex items-center justify-center sm:justify-start gap-2 mb-1">
//                             <FaEnvelope className={`${PRIMARY_COLOR_CLASS} text-lg`} /> {user.email}
//                         </p>
//                         <p className="text-gray-600 text-sm flex items-center justify-center sm:justify-start gap-2">
//                             <FaCalendarAlt className={`${PRIMARY_COLOR_CLASS} text-lg`} /> Member Since: {memberSinceDate}
//                         </p>
//                     </div>
//                     <button
//                         onClick={() => {
//                             setEditMode(!editMode);
//                             // Reset editable fields if cancelling edit
//                             if (editMode) {
//                                 setAboutMe(profileData?.aboutMe || '');
//                                 setLocation(profileData?.location || '');
//                                 setFullName(profileData?.fullName || user.displayName || '');
//                             }
//                         }}
//                         className={`text-sm px-4 py-2 rounded-lg flex items-center gap-2 ${PRIMARY_BG_COLOR_CLASS} text-white ${PRIMARY_HOVER_BG_COLOR_CLASS} transition-colors mt-4 sm:mt-0`}
//                     >
//                         <FaEdit /> {editMode ? 'Cancel Edit' : 'Edit Profile'}
//                     </button>
//                 </div>

//                 {/* Editable Profile Information */}
//                 {editMode ? (
//                     <form onSubmit={handleProfileUpdate} className="mt-8 space-y-6">
//                         <div>
//                             <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Display Name:</label>
//                             <input
//                                 id="fullName"
//                                 type="text"
//                                 value={fullName}
//                                 onChange={(e) => setFullName(e.target.value)}
//                                 className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ${PRIMARY_FOCUS_OUTLINE_CLASS}`}
//                                 required
//                             />
//                             <p className="text-xs text-gray-500 mt-1">This will also update your display name in Firebase.</p>
//                         </div>
//                         <div>
//                             <label htmlFor="aboutMe" className="block text-gray-700 text-sm font-bold mb-2">About Me (Bio):</label>
//                             <textarea
//                                 id="aboutMe"
//                                 value={aboutMe}
//                                 onChange={(e) => setAboutMe(e.target.value)}
//                                 rows="4"
//                                 placeholder="Tell us a little about yourself..."
//                                 className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ${PRIMARY_FOCUS_OUTLINE_CLASS}`}
//                             ></textarea>
//                         </div>
//                         <div>
//                             <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
//                             <input
//                                 id="location"
//                                 type="text"
//                                 value={location}
//                                 onChange={(e) => setLocation(e.target.value)}
//                                 placeholder="e.g., Dhaka, Bangladesh"
//                                 className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ${PRIMARY_FOCUS_OUTLINE_CLASS}`}
//                             />
//                         </div>
//                         {/*  contact info, profile image upload*/}
//                         <div className="flex justify-end gap-3">
//                             <button
//                                 type="submit"
//                                 className={`px-5 py-2 rounded-lg text-white font-semibold ${PRIMARY_BG_COLOR_CLASS} ${PRIMARY_HOVER_BG_COLOR_CLASS} transition-colors`}
//                             >
//                                 Save Changes
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => {
//                                     setEditMode(false);
                                 
//                                     setAboutMe(profileData?.aboutMe || '');
//                                     setLocation(profileData?.location || '');
//                                     setFullName(profileData?.fullName || user.displayName || '');
//                                 }}
//                                 className={`px-5 py-2 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors`}
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </form>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
//                         {/* About Me */}
//                         <div>
//                             <h3 className={`text-xl font-semibold mb-3 ${PRIMARY_COLOR_CLASS}`}>About Me</h3>
//                             <p className="text-gray-700 text-sm leading-relaxed">
//                                 {profileData?.aboutMe || "No bio yet. Click 'Edit Profile' to add one!"}
//                             </p>
//                             {profileData?.location && (
//                                 <p className="text-gray-600 text-sm flex items-center gap-2 mt-2">
//                                     <FaMapMarkerAlt className={`${PRIMARY_COLOR_CLASS} text-base`} /> {profileData.location}
//                                 </p>
//                             )}
//                             {/* Assuming contactInfo comes from your DB profile data */}
//                             {profileData?.contactInfo?.website && (
//                                 <a href={profileData.contactInfo.website} target="_blank" rel="noopener noreferrer"
//                                    className={`text-sm flex items-center gap-2 mt-2 ${PRIMARY_COLOR_CLASS} hover:underline`}>
//                                     <FaLink className={`${PRIMARY_COLOR_CLASS} text-base`} /> Website
//                                 </a>
//                             )}
                          
//                         </div>

//                         {/* Forum Stats */}
//                         <div>
//                             <h3 className={`text-xl font-semibold mb-3 ${PRIMARY_COLOR_CLASS}`}>Forum Stats</h3>
//                             <div className="space-y-2">
//                                 <p className="text-gray-700 flex items-center gap-2">
//                                     <FaClipboardList className={`${PRIMARY_COLOR_CLASS} text-xl`} />
//                                     Total Posts: <span className="font-semibold">{profileData?.totalPosts || 0}</span>
//                                 </p>
//                                 <p className="text-gray-700 flex items-center gap-2">
//                                     <FaComments className={`${PRIMARY_COLOR_CLASS} text-xl`} />
//                                     Total Comments: <span className="font-semibold">{profileData?.totalComments || 0}</span>
//                                 </p>
//                                 {profileData?.reputation > 0 && ( // Display reputation if greater than 0
//                                     <p className="text-gray-700 flex items-center gap-2">
//                                         <FaUserCircle className={`${PRIMARY_COLOR_CLASS} text-xl`} />
//                                         Reputation: <span className="font-semibold">{profileData.reputation}</span>
//                                     </p>
//                                 )}
//                                 {/* Basic Badge Display - you can make this more complex with different icons/colors based on reputation value */}
//                                 {profileData?.totalPosts >= 10 && (
//                                     <p className="text-gray-700 flex items-center gap-2">
//                                         <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-yellow-200 text-yellow-800">
//                                             <FaStar className="inline-block mr-1" /> 
//                                             Active Contributor
//                                         </span>
//                                     </p>
//                                 )}
//                                 {profileData?.totalComments >= 20 && ( 
//                                     <p className="text-gray-700 flex items-center gap-2">
//                                         <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-200 text-blue-800">
//                                             <FaCommentDots className="inline-block mr-1" /> 
//                                             Chatty Member
//                                         </span>
//                                     </p>
//                                 )}
                              
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Recent Activity */}
//                 <div className="mt-10 pt-6 border-t border-gray-200">
//                     <h3 className={`text-xl font-semibold mb-5 ${PRIMARY_COLOR_CLASS}`}>My Recent Posts</h3>
//                     {recentActivity.length > 0 ? (
//                         <div className="grid grid-cols-1 gap-4">
//                             {recentActivity.map(post => (
//                                 <motion.div
//                                     key={post._id}
//                                     initial={{ opacity: 0, x: -20 }}
//                                     animate={{ opacity: 1, x: 0 }}
//                                     transition={{ duration: 0.3, delay: 0.1 }}
//                                     className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
//                                 >
//                                     <Link to={`/post-details/${post._id}`} className="block">
//                                         <h4 className={`text-lg font-semibold ${PRIMARY_COLOR_CLASS} hover:underline`}>
//                                             {post.title}
//                                         </h4>
//                                         <p className="text-gray-600 text-sm mt-1">
//                                             Posted on: {new Date(post.postTime).toLocaleDateString()}
//                                         </p>
//                                         <div className="flex items-center gap-4 text-gray-500 text-sm mt-2">
//                                             <span>
//                                                 <FaComments className="inline-block mr-1" /> {post.commentCount || 0} Comments
//                                             </span>
//                                             <span>
//                                                 <FaThumbsUp className="inline-block mr-1" /> {post.upVote || 0} Upvotes
//                                             </span>
//                                         </div>
//                                     </Link>
//                                 </motion.div>
//                             ))}
//                             {/* Link to all posts if you have a separate "My All Posts" page */}
//                             {profileData?.totalPosts > recentActivity.length && (
//                                 <div className="text-right mt-4">
//                                     <Link to="/dashboard/my-posts" className={`text-sm font-semibold ${PRIMARY_COLOR_CLASS} hover:underline`}>
//                                         View All My Posts &rarr;
//                                     </Link>
//                                 </div>
//                             )}
//                         </div>
//                     ) : (
//                         <p className="text-gray-600">No posts created yet.</p>
//                     )}
//                 </div>

//                 {/* Future Sections: Liked Posts, Bookmarked Posts, Settings */}
//                 <div className="mt-10 pt-6 border-t border-gray-200">
//                     <h3 className={`text-xl font-semibold mb-5 ${PRIMARY_COLOR_CLASS}`}>Liked Posts</h3>
//                     <p className="text-gray-600">Feature coming soon!</p>
//                 </div>
//                 <div className="mt-10 pt-6 border-t border-gray-200">
//                     <h3 className={`text-xl font-semibold mb-5 ${PRIMARY_COLOR_CLASS}`}>Settings & Privacy</h3>
//                     <p className="text-gray-600">Manage email notifications, privacy settings, and more here.</p>
//                     <button className={`mt-4 px-4 py-2 rounded-lg ${PRIMARY_BG_COLOR_CLASS} text-white ${PRIMARY_HOVER_BG_COLOR_CLASS} transition-colors`}>
//                         Change Password
//                     </button>
//                 </div>

//             </div>
//         </motion.div>
//     );
// };

// export default MyProfile;


//  profile thik korechil and pass

// import React, { useEffect, useState, useCallback } from 'react';
// import { FaUserCircle, FaEnvelope, FaCalendarAlt, FaComments, FaClipboardList, FaMapMarkerAlt, FaEdit, FaLink, FaThumbsUp, FaStar, FaCommentDots } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import useAuth from '../../../hooks/useAuth';
// import useAxios from '../../../hooks/useAxios';
// import Loader from '../../../shared/Loader/Loader';
// import Swal from 'sweetalert2'; // Import SweetAlert2
// import { updatePassword } from 'firebase/auth'; // Import updatePassword from Firebase auth

// const PRIMARY_COLOR_CLASS = "text-[#4CA3B8]";
// const PRIMARY_BG_COLOR_CLASS = "bg-[#4CA3B8]";
// const PRIMARY_BORDER_COLOR_CLASS = "border-[#4CA3B8]";
// const PRIMARY_HOVER_BG_COLOR_CLASS = "hover:bg-[#3B8E9B]";
// const PRIMARY_FOCUS_OUTLINE_CLASS = "focus:ring-2 focus:ring-[#4CA3B8] focus:border-transparent";


// const MyProfile = () => {
//     const { user, loading: authLoading, updateUserProfile } = useAuth();
//     const privateAxios = useAxios();
//     const [profileData, setProfileData] = useState(null);
//     const [recentActivity, setRecentActivity] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [editMode, setEditMode] = useState(false);
//     const [showPasswordChange, setShowPasswordChange] = useState(false); // New state for password change form

//     const [aboutMe, setAboutMe] = useState('');
//     const [location, setLocation] = useState('');
//     const [fullName, setFullName] = useState('');

//     // New states for password change
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmNewPassword, setConfirmNewPassword] = useState('');
//     const [passwordError, setPasswordError] = useState('');


//     // Base URL for your backend API
//     const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

//     // Function to fetch all user-related data
//     const fetchUserData = useCallback(async () => {
//         if (!user?.email) {
//             setLoading(false);
//             return;
//         }

//         setLoading(true);
//         try {

//             const userDbRes = await privateAxios.get(`${API_BASE}/users/${user.email}`);
//             const dbUserData = userDbRes.data;


//             const statsRes = await privateAxios.get(`${API_BASE}/user-stats?email=${user.email}`);
//             const statsData = statsRes.data;


//             const recentRes = await privateAxios.get(`${API_BASE}/recent?email=${user.email}&limit=3`);
//             setRecentActivity(recentRes.data);


//             setProfileData(prev => ({
//                 ...prev,
//                 ...dbUserData,
//                 ...statsData,

//                 aboutMe: dbUserData.aboutMe || '',
//                 location: dbUserData.location || '',
//                 fullName: dbUserData.fullName || user.displayName || '',
//                 role: dbUserData.role || 'Member',
//                 reputation: dbUserData.reputation || 0,
//             }));

//             // Set states for editable fields
//             setAboutMe(dbUserData.aboutMe || '');
//             setLocation(dbUserData.location || '');
//             setFullName(dbUserData.fullName || user.displayName || '');
//             // setProfileImageUrl(user.photoURL || 'https://i.ibb.co/VgY9pJf/avatar.png'); // This state is not used in JSX for image, but keeps user.photoURL in sync

//         } catch (error) {
//             console.error("Failed to fetch user profile data:", error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'Failed to load profile data! Please ensure your backend is running and user data exists.', // More descriptive message
//             });

//         } finally {
//             setLoading(false);
//         }
//     }, [user, privateAxios, API_BASE]);

//     useEffect(() => {
//         if (!authLoading) {
//             fetchUserData();
//         }
//     }, [user, authLoading, fetchUserData]);


//     // Function to handle profile update
//     const handleProfileUpdate = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             // Update display name in Firebase Auth
//             await updateUserProfile({
//                 displayName: fullName,
//                 // photoURL: profileImageUrl, // uncomment if you add profile image update functionality
//             });

//             // Update user data in your backend DB
//             await privateAxios.patch(`${API_BASE}/users/${user.email}`, {
//                 aboutMe,
//                 location,
//                 fullName,
//             });

//             Swal.fire({
//                 icon: 'success',
//                 title: 'Profile Updated!',
//                 text: 'Your profile has been updated successfully.',
//                 timer: 2000,
//                 showConfirmButton: false
//             });
//             setEditMode(false);
//             fetchUserData(); // Re-fetch data to reflect changes
//             setShowPasswordChange(false); // Close password change form after profile update

//         } catch (error) {
//             console.error('Error updating profile:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Update Failed',
//                 text: 'Failed to update profile. Please try again.',
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Function to handle password change
//     const handlePasswordChange = async (e) => {
//         e.preventDefault();
//         setPasswordError(''); // Clear previous errors

//         if (newPassword.length < 6) {
//             setPasswordError('Password should be at least 6 characters long.');
//             return;
//         }

//         if (newPassword !== confirmNewPassword) {
//             setPasswordError('New password and confirm password do not match.');
//             return;
//         }

//         setLoading(true);
//         try {
//             // Use the Firebase updatePassword function
//             await updatePassword(user, newPassword);

//             Swal.fire({
//                 icon: 'success',
//                 title: 'Password Updated!',
//                 text: 'Your password has been changed successfully. Please remember your new password.',
//                 timer: 3000,
//                 showConfirmButton: false
//             });
//             setNewPassword('');
//             setConfirmNewPassword('');
//             setShowPasswordChange(false); // Close the form

//         } catch (error) {
//             console.error('Error changing password:', error);
//             // Firebase error codes can be specific
//             let errorMessage = 'Failed to change password. Please try again.';
//             if (error.code === 'auth/requires-recent-login') {
//                 errorMessage = 'Please re-authenticate to change your password. Log out and log back in, then try again.';
//             } else if (error.code === 'auth/weak-password') {
//                 errorMessage = 'The new password is too weak. Please choose a stronger password.';
//             }
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Password Change Failed',
//                 text: errorMessage,
//             });
//         } finally {
//             setLoading(false);
//         }
//     };


//     if (authLoading || loading) {
//         return <div className="min-h-screen flex items-center justify-center"><Loader /></div>;
//     }

//     if (!user) {
//         return (
//             <div className="min-h-screen flex items-center justify-center text-xl text-gray-700">
//                 Please log in to view your profile.
//             </div>
//         );
//     }

//     const memberSinceDate = user.metadata?.creationTime ?
//         new Date(parseInt(user.metadata.creationTime)).toLocaleDateString() :
//         profileData?.joinedAt ? new Date(profileData.joinedAt).toLocaleDateString() : 'N/A';

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="container mx-auto p-4 md:p-8 min-h-screen bg-gray-50 pt-20"
//         >
//             <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
//                 {/* Profile Header */}
//                 <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-gray-200">
//                     <div className="relative">
//                         <img
//                             // Changed this line:
//                             src={user.photoURL || 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=User'}
//                             alt={user.displayName || 'User Avatar'}
//                             className={`w-28 h-28 md:w-32 md:h-32 rounded-full object-cover ring-4 ring-offset-2 ${PRIMARY_BORDER_COLOR_CLASS} shadow-md`}
//                         />
//                         {/* Edit photo button can go here later */}
//                     </div>
//                     <div className="text-center sm:text-left flex-grow">
//                         <h1 className={`text-3xl font-bold text-gray-800 mb-1`}>
//                             {user.displayName || profileData?.fullName || 'N/A'}
//                         </h1>
//                         <p className={`text-md ${PRIMARY_COLOR_CLASS} mb-2`}>
//                             {profileData?.role || 'Member'}
//                         </p>
//                         <p className="text-gray-600 text-sm flex items-center justify-center sm:justify-start gap-2 mb-1">
//                             <FaEnvelope className={`${PRIMARY_COLOR_CLASS} text-lg`} /> {user.email}
//                         </p>
//                         <p className="text-gray-600 text-sm flex items-center justify-center sm:justify-start gap-2">
//                             <FaCalendarAlt className={`${PRIMARY_COLOR_CLASS} text-lg`} /> Member Since: {memberSinceDate}
//                         </p>
//                     </div>
//                     <button
//                         onClick={() => {
//                             setEditMode(!editMode);
//                             setShowPasswordChange(false); // Hide password change form when toggling edit mode
//                             // Reset editable fields if cancelling edit
//                             if (editMode) {
//                                 setAboutMe(profileData?.aboutMe || '');
//                                 setLocation(profileData?.location || '');
//                                 setFullName(profileData?.fullName || user.displayName || '');
//                             }
//                         }}
//                         className={`text-sm px-4 py-2 rounded-lg flex items-center gap-2 ${PRIMARY_BG_COLOR_CLASS} text-white ${PRIMARY_HOVER_BG_COLOR_CLASS} transition-colors mt-4 sm:mt-0`}
//                     >
//                         <FaEdit /> {editMode ? 'Cancel Edit' : 'Edit Profile'}
//                     </button>
//                 </div>

//                 {/* Editable Profile Information */}
//                 {editMode ? (
//                     <form onSubmit={handleProfileUpdate} className="mt-8 space-y-6">
//                         <div>
//                             <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Display Name:</label>
//                             <input
//                                 id="fullName"
//                                 type="text"
//                                 value={fullName}
//                                 onChange={(e) => setFullName(e.target.value)}
//                                 className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ${PRIMARY_FOCUS_OUTLINE_CLASS}`}
//                                 required
//                             />
//                             <p className="text-xs text-gray-500 mt-1">This will also update your display name in Firebase.</p>
//                         </div>
//                         <div>
//                             <label htmlFor="aboutMe" className="block text-gray-700 text-sm font-bold mb-2">About Me (Bio):</label>
//                             <textarea
//                                 id="aboutMe"
//                                 value={aboutMe}
//                                 onChange={(e) => setAboutMe(e.target.value)}
//                                 rows="4"
//                                 placeholder="Tell us a little about yourself..."
//                                 className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ${PRIMARY_FOCUS_OUTLINE_CLASS}`}
//                             ></textarea>
//                         </div>
//                         <div>
//                             <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
//                             <input
//                                 id="location"
//                                 type="text"
//                                 value={location}
//                                 onChange={(e) => setLocation(e.target.value)}
//                                 placeholder="e.g., Dhaka, Bangladesh"
//                                 className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ${PRIMARY_FOCUS_OUTLINE_CLASS}`}
//                             />
//                         </div>
//                         {/*  contact info, profile image upload */}
//                         <div className="flex justify-end gap-3">
//                             <button
//                                 type="submit"
//                                 className={`px-5 py-2 rounded-lg text-white font-semibold ${PRIMARY_BG_COLOR_CLASS} ${PRIMARY_HOVER_BG_COLOR_CLASS} transition-colors`}
//                             >
//                                 Save Changes
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => {
//                                     setEditMode(false);
//                                     // Reset editable fields if cancelling
//                                     setAboutMe(profileData?.aboutMe || '');
//                                     setLocation(profileData?.location || '');
//                                     setFullName(profileData?.fullName || user.displayName || '');
//                                 }}
//                                 className={`px-5 py-2 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors`}
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </form>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
//                         {/* About Me */}
//                         <div>
//                             <h3 className={`text-xl font-semibold mb-3 ${PRIMARY_COLOR_CLASS}`}>About Me</h3>
//                             <p className="text-gray-700 text-sm leading-relaxed">
//                                 {profileData?.aboutMe || "No bio yet. Click 'Edit Profile' to add one!"}
//                             </p>
//                             {profileData?.location && (
//                                 <p className="text-gray-600 text-sm flex items-center gap-2 mt-2">
//                                     <FaMapMarkerAlt className={`${PRIMARY_COLOR_CLASS} text-base`} /> {profileData.location}
//                                 </p>
//                             )}
//                             {/* Assuming contactInfo comes from your DB profile data */}
//                             {profileData?.contactInfo?.website && (
//                                 <a href={profileData.contactInfo.website} target="_blank" rel="noopener noreferrer"
//                                     className={`text-sm flex items-center gap-2 mt-2 ${PRIMARY_COLOR_CLASS} hover:underline`}>
//                                     <FaLink className={`${PRIMARY_COLOR_CLASS} text-base`} /> Website
//                                 </a>
//                             )}

//                         </div>

//                         {/* Forum Stats */}
//                         <div>
//                             <h3 className={`text-xl font-semibold mb-3 ${PRIMARY_COLOR_CLASS}`}>Forum Stats</h3>
//                             <div className="space-y-2">
//                                 <p className="text-gray-700 flex items-center gap-2">
//                                     <FaClipboardList className={`${PRIMARY_COLOR_CLASS} text-xl`} />
//                                     Total Posts: <span className="font-semibold">{profileData?.totalPosts || 0}</span>
//                                 </p>
//                                 <p className="text-gray-700 flex items-center gap-2">
//                                     <FaComments className={`${PRIMARY_COLOR_CLASS} text-xl`} />
//                                     Total Comments: <span className="font-semibold">{profileData?.totalComments || 0}</span>
//                                 </p>
//                                 {profileData?.reputation > 0 && ( // Display reputation if greater than 0
//                                     <p className="text-gray-700 flex items-center gap-2">
//                                         <FaUserCircle className={`${PRIMARY_COLOR_CLASS} text-xl`} />
//                                         Reputation: <span className="font-semibold">{profileData.reputation}</span>
//                                     </p>
//                                 )}
//                                 {/* Basic Badge Display - you can make this more complex with different icons/colors based on reputation value */}
//                                 {profileData?.totalPosts >= 10 && (
//                                     <p className="text-gray-700 flex items-center gap-2">
//                                         <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-yellow-200 text-yellow-800">
//                                             <FaStar className="inline-block mr-1" />
//                                             Active Contributor
//                                         </span>
//                                     </p>
//                                 )}
//                                 {profileData?.totalComments >= 20 && (
//                                     <p className="text-gray-700 flex items-center gap-2">
//                                         <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-200 text-blue-800">
//                                             <FaCommentDots className="inline-block mr-1" />
//                                             Chatty Member
//                                         </span>
//                                     </p>
//                                 )}

//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Recent Activity */}
//                 <div className="mt-10 pt-6 border-t border-gray-200">
//                     <h3 className={`text-xl font-semibold mb-5 ${PRIMARY_COLOR_CLASS}`}>My Recent Posts</h3>
//                     {recentActivity.length > 0 ? (
//                         <div className="grid grid-cols-1 gap-4">
//                             {recentActivity.map(post => (
//                                 <motion.div
//                                     key={post._id}
//                                     initial={{ opacity: 0, x: -20 }}
//                                     animate={{ opacity: 1, x: 0 }}
//                                     transition={{ duration: 0.3, delay: 0.1 }}
//                                     className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
//                                 >
//                                     <Link to={`/post-details/${post._id}`} className="block">
//                                         <h4 className={`text-lg font-semibold ${PRIMARY_COLOR_CLASS} hover:underline`}>
//                                             {post.title}
//                                         </h4>
//                                         <p className="text-gray-600 text-sm mt-1">
//                                             Posted on: {new Date(post.postTime).toLocaleDateString()}
//                                         </p>
//                                         <div className="flex items-center gap-4 text-gray-500 text-sm mt-2">
//                                             <span>
//                                                 <FaComments className="inline-block mr-1" /> {post.commentCount || 0} Comments
//                                             </span>
//                                             <span>
//                                                 <FaThumbsUp className="inline-block mr-1" /> {post.upVote || 0} Upvotes
//                                             </span>
//                                         </div>
//                                     </Link>
//                                 </motion.div>
//                             ))}
//                             {/* Link to all posts if you have a separate "My All Posts" page */}
//                             {profileData?.totalPosts > recentActivity.length && (
//                                 <div className="text-right mt-4">
//                                     <Link to="/dashboard/my-posts" className={`text-sm font-semibold ${PRIMARY_COLOR_CLASS} hover:underline`}>
//                                         View All My Posts &rarr;
//                                     </Link>
//                                 </div>
//                             )}
//                         </div>
//                     ) : (
//                         <p className="text-gray-600">No posts created yet.</p>
//                     )}
//                 </div>

//                 {/* Future Sections: Liked Posts, Bookmarked Posts, Settings */}
//                 <div className="mt-10 pt-6 border-t border-gray-200">
//                     <h3 className={`text-xl font-semibold mb-5 ${PRIMARY_COLOR_CLASS}`}>Liked Posts</h3>
//                     <p className="text-gray-600">Feature coming soon!</p>
//                 </div>
//                 <div className="mt-10 pt-6 border-t border-gray-200">
//                     <h3 className={`text-xl font-semibold mb-5 ${PRIMARY_COLOR_CLASS}`}>Settings & Privacy</h3>
//                     <p className="text-gray-600">Manage email notifications, privacy settings, and more here.</p>
//                     <button
//                         onClick={() => {
//                             setShowPasswordChange(!showPasswordChange);
//                             setEditMode(false); // Hide edit profile form when toggling password change
//                             setPasswordError(''); // Clear any password errors when toggling
//                             setNewPassword(''); // Clear password fields
//                             setConfirmNewPassword('');
//                         }}
//                         className={`mt-4 px-4 py-2 rounded-lg ${PRIMARY_BG_COLOR_CLASS} text-white ${PRIMARY_HOVER_BG_COLOR_CLASS} transition-colors`}
//                     >
//                         Change Password
//                     </button>

//                     {showPasswordChange && (
//                         <motion.form
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: 'auto' }}
//                             transition={{ duration: 0.3 }}
//                             onSubmit={handlePasswordChange} className="mt-6 space-y-4 p-4 border rounded-lg bg-gray-50"
//                         >
//                             <h4 className="text-lg font-semibold text-gray-800">Update Your Password</h4>
//                             <div>
//                                 <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">New Password:</label>
//                                 <input
//                                     id="newPassword"
//                                     type="password"
//                                     value={newPassword}
//                                     onChange={(e) => setNewPassword(e.target.value)}
//                                     className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ${PRIMARY_FOCUS_OUTLINE_CLASS}`}
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="confirmNewPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm New Password:</label>
//                                 <input
//                                     id="confirmNewPassword"
//                                     type="password"
//                                     value={confirmNewPassword}
//                                     onChange={(e) => setConfirmNewPassword(e.target.value)}
//                                     className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ${PRIMARY_FOCUS_OUTLINE_CLASS}`}
//                                     required
//                                 />
//                             </div>
//                             {passwordError && (
//                                 <p className="text-red-500 text-sm">{passwordError}</p>
//                             )}
//                             <div className="flex justify-end gap-3">
//                                 <button
//                                     type="submit"
//                                     className={`px-5 py-2 rounded-lg text-white font-semibold ${PRIMARY_BG_COLOR_CLASS} ${PRIMARY_HOVER_BG_COLOR_CLASS} transition-colors`}
//                                 >
//                                     Save New Password
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         setShowPasswordChange(false);
//                                         setNewPassword('');
//                                         setConfirmNewPassword('');
//                                         setPasswordError('');
//                                     }}
//                                     className={`px-5 py-2 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors`}
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </motion.form>
//                     )}
//                 </div>

//             </div>
//         </motion.div>
//     );
// };

// export default MyProfile;


import React, { useEffect, useState, useCallback } from 'react';
import { FaUserCircle, FaEnvelope, FaCalendarAlt, FaComments, FaClipboardList, FaMapMarkerAlt, FaEdit, FaLink, FaThumbsUp, FaStar, FaCommentDots, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import Loader from '../../../shared/Loader/Loader';
import Swal from 'sweetalert2';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { getAuth } from 'firebase/auth'; 

// ImgBB API Key from .env
const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;

const PRIMARY_COLOR_CLASS = "text-[#4CA3B8]";
const PRIMARY_BG_COLOR_CLASS = "bg-[#4CA3B8]";
const PRIMARY_BORDER_COLOR_CLASS = "border-[#4CA3B8]";
const PRIMARY_HOVER_BG_COLOR_CLASS = "hover:bg-[#3B8E9B]";
const PRIMARY_FOCUS_OUTLINE_CLASS = "focus:ring-2 focus:ring-[#4CA3B8] focus:border-transparent";


const MyProfile = () => {
    const { user, loading: authLoading, updateUserProfile } = useAuth();
    const privateAxios = useAxios();
    const [profileData, setProfileData] = useState(null);
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [showPasswordChange, setShowPasswordChange] = useState(false);

    const [aboutMe, setAboutMe] = useState('');
    const [location, setLocation] = useState('');
    const [fullName, setFullName] = useState('');
    const [profileImageFile, setProfileImageFile] = useState(null); 
    const [currentProfileImageUrl, setCurrentProfileImageUrl] = useState(''); 

    
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
        console.log({loading})
    const fetchUserData = useCallback(async () => {
        if (!user?.email) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const userDbRes = await privateAxios.get(`${API_BASE}/users/${user.email}`);
            const dbUserData = userDbRes.data;

            const statsRes = await privateAxios.get(`${API_BASE}/user-stats?email=${user.email}`);
            const statsData = statsRes.data;

            const recentRes = await privateAxios.get(`${API_BASE}/recent?email=${user.email}&limit=3`);
            setRecentActivity(recentRes.data);

            setProfileData(prev => ({
                ...prev,
                ...dbUserData,
                ...statsData,
                aboutMe: dbUserData.aboutMe || '',
                location: dbUserData.location || '',
                fullName: dbUserData.fullName || user.displayName || '',
                role: dbUserData.role || 'Member',
                reputation: dbUserData.reputation || 0,
            }));

         
            setAboutMe(dbUserData.aboutMe || '');
            setLocation(dbUserData.location || '');
            setFullName(dbUserData.fullName || user.displayName || '');
            setCurrentProfileImageUrl(user.photoURL || 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=User');
            setLoading(false)

        } catch (error) {
            console.error("Failed to fetch user profile data:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to load profile data! Please ensure your backend is running and user data exists.',
            });

        } finally {
            setLoading(false);
        }
    }, [user, privateAxios, API_BASE]);

    useEffect(() => {
        if (!authLoading) {
            fetchUserData();
        }
    }, [user, authLoading, fetchUserData]);


 
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        let imageUrlToUpdate = currentProfileImageUrl; 

        try {
            if (profileImageFile) {
               
                const imageFile = { image: profileImageFile };
                const imgbbResponse = await privateAxios.post(
                    `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
                    imageFile,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                imageUrlToUpdate = imgbbResponse.data.data.display_url;
            }

            await updateUserProfile({
                displayName: fullName,
                photoURL: imageUrlToUpdate,
            });

          
            await privateAxios.patch(`${API_BASE}/users/${user.email}`, {
                aboutMe,
                location,
                fullName,
                photoURL: imageUrlToUpdate,
            });

            Swal.fire({
                icon: 'success',
                title: 'Profile Updated!',
                text: 'Your profile has been updated successfully.',
                timer: 2000,
                showConfirmButton: false
            });
            setEditMode(false);
            setProfileImageFile(null); 
            setLoading(false)
            fetchUserData(); 
            setShowPasswordChange(false);

        } catch (error) {
            console.error('Error updating profile:', error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'Failed to update profile. Please try again. ' + (error.message || error.response?.data?.message || ''),
            });
        } finally {
            setLoading(false);
        }
    };


    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordError('');

        if (!oldPassword) {
            setPasswordError('Please enter your old password.');
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError('New password should be at least 6 characters long.');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setPasswordError('New password and confirm password do not match.');
            return;
        }

        setLoading(true);
        try {
     
            const auth = getAuth();
            const credential = EmailAuthProvider.credential(user.email, oldPassword);
            console.log(auth)
            await reauthenticateWithCredential(user, credential);

       
            await updatePassword(user, newPassword)
            .then(res=>setLoading(false))

            Swal.fire({
                icon: 'success',
                title: 'Password Updated!',
                text: 'Your password has been changed successfully. Please remember your new password.',
                timer: 3000,
                showConfirmButton: false
            });
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setShowPasswordChange(false);

        } catch (error) {
            console.error('Error changing password:', error);
            let errorMessage = 'Failed to change password. Please try again.';
            if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid old password. Please try again.';
            } else if (error.code === 'auth/requires-recent-login') {
                errorMessage = 'This operation is sensitive. Please re-authenticate (log out and log back in, then try again) to change your password.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'The new password is too weak. Please choose a stronger password.';
            } else if (error.code === 'auth/user-not-found') {
                errorMessage = 'User not found. Please log in again.';
            }
            Swal.fire({
                icon: 'error',
                title: 'Password Change Failed',
                text: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };


    if (authLoading || loading) {
        return <div className="min-h-screen flex items-center justify-center"><Loader /></div>;
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl text-gray-700">
                Please log in to view your profile.
            </div>
        );
    }

    const memberSinceDate = user.metadata?.creationTime ?
        new Date(parseInt(user.metadata.creationTime)).toLocaleDateString() :
        profileData?.joinedAt ? new Date(profileData.joinedAt).toLocaleDateString() : 'N/A';

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto p-4 md:p-8 min-h-screen bg-gray-50 pt-20"
        >
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
                <title>My Profile || Petiva</title>
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-gray-200">
                    <div className="relative">
                        <img
                            src={profileImageFile ? URL.createObjectURL(profileImageFile) : currentProfileImageUrl}
                            alt={user.displayName || 'User Avatar'}
                            className={`w-28 h-28 md:w-32 md:h-32 rounded-full object-cover ring-4 ring-offset-2 ${PRIMARY_BORDER_COLOR_CLASS} shadow-md`}
                        />
                    </div>
                    <div className="text-center sm:text-left flex-grow">
                        <h1 className={`text-3xl font-bold text-gray-800 mb-1`}>
                            {user.displayName || profileData?.fullName || 'N/A'}
                        </h1>
                        <p className={`text-md ${PRIMARY_COLOR_CLASS} mb-2`}>
                            {profileData?.role || 'Member'}
                        </p>
                        <p className="text-gray-600 text-sm flex items-center justify-center sm:justify-start gap-2 mb-1">
                            <FaEnvelope className={`${PRIMARY_COLOR_CLASS} text-lg`} /> {user.email}
                        </p>
                        <p className="text-gray-600 text-sm flex items-center justify-center sm:justify-start gap-2">
                            <FaCalendarAlt className={`${PRIMARY_COLOR_CLASS} text-lg`} /> Member Since: {memberSinceDate}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setEditMode(!editMode);
                            setShowPasswordChange(false);
                            if (editMode) {
                             
                                setAboutMe(profileData?.aboutMe || '');
                                setLocation(profileData?.location || '');
                                setFullName(profileData?.fullName || user.displayName || '');
                                setProfileImageFile(null); 
                                setCurrentProfileImageUrl(user.photoURL || 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=User'); 
                            }
                        }}
                        className={`text-sm px-4 py-2 rounded-lg flex items-center gap-2 ${PRIMARY_BG_COLOR_CLASS} text-white ${PRIMARY_HOVER_BG_COLOR_CLASS} transition-colors mt-4 sm:mt-0`}
                    >
                        <FaEdit /> {editMode ? 'Cancel Edit' : 'Edit Profile'}
                    </button>
                </div>

                {/* Editable Profile Information */}
                {editMode ? (
                    <form onSubmit={handleProfileUpdate} className="mt-8 space-y-6">
                        <div>
                            <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Display Name:</label>
                            <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ${PRIMARY_FOCUS_OUTLINE_CLASS}`}
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">This will also update your display name in Firebase.</p>
                        </div>
                        <div>
                            <label htmlFor="profileImage" className="block text-gray-700 text-sm font-bold mb-2">Profile Image:</label>
                            <input
                                id="profileImage"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setProfileImageFile(e.target.files[0])}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ${PRIMARY_FOCUS_OUTLINE_CLASS}`}
                            />
                            <p className="text-xs text-gray-500 mt-1">Upload a new profile picture. Max 2MB.</p>
                        </div>
                        <div>
                            <label htmlFor="aboutMe" className="block text-gray-700 text-sm font-bold mb-2">About Me (Bio):</label>
                            <textarea
                                id="aboutMe"
                                value={aboutMe}
                                onChange={(e) => setAboutMe(e.target.value)}
                                rows="4"
                                placeholder="Tell us a little about yourself..."
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ${PRIMARY_FOCUS_OUTLINE_CLASS}`}
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
                            <input
                                id="location"
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="e.g., Dhaka, Bangladesh"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ${PRIMARY_FOCUS_OUTLINE_CLASS}`}
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                type="submit"
                                className={`px-5 py-2 rounded-lg text-white font-semibold ${PRIMARY_BG_COLOR_CLASS} ${PRIMARY_HOVER_BG_COLOR_CLASS} transition-colors`}
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setEditMode(false);
                                    setAboutMe(profileData?.aboutMe || '');
                                    setLocation(profileData?.location || '');
                                    setFullName(profileData?.fullName || user.displayName || '');
                                    setProfileImageFile(null); // Clear selected file
                                    setCurrentProfileImageUrl(user.photoURL || 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=User'); // Reset current image URL
                                }}
                                className={`px-5 py-2 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors`}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        {/* About Me */}
                        <div>
                            <h3 className={`text-xl font-semibold mb-3 ${PRIMARY_COLOR_CLASS}`}>About Me</h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {profileData?.aboutMe || "No bio yet. Click 'Edit Profile' to add one!"}
                            </p>
                            {profileData?.location && (
                                <p className="text-gray-600 text-sm flex items-center gap-2 mt-2">
                                    <FaMapMarkerAlt className={`${PRIMARY_COLOR_CLASS} text-base`} /> {profileData.location}
                                </p>
                            )}
                            {profileData?.contactInfo?.website && (
                                <a href={profileData.contactInfo.website} target="_blank" rel="noopener noreferrer"
                                    className={`text-sm flex items-center gap-2 mt-2 ${PRIMARY_COLOR_CLASS} hover:underline`}>
                                    <FaLink className={`${PRIMARY_COLOR_CLASS} text-base`} /> Website
                                </a>
                            )}

                        </div>

                        {/* Forum Stats */}
                        <div>
                            <h3 className={`text-xl font-semibold mb-3 ${PRIMARY_COLOR_CLASS}`}>Forum Stats</h3>
                            <div className="space-y-2">
                                <p className="text-gray-700 flex items-center gap-2">
                                    <FaClipboardList className={`${PRIMARY_COLOR_CLASS} text-xl`} />
                                    Total Posts: <span className="font-semibold">{profileData?.totalPosts || 0}</span>
                                </p>
                                <p className="text-gray-700 flex items-center gap-2">
                                    <FaComments className={`${PRIMARY_COLOR_CLASS} text-xl`} />
                                    Total Comments: <span className="font-semibold">{profileData?.totalComments || 0}</span>
                                </p>
                                {profileData?.reputation > 0 && (
                                    <p className="text-gray-700 flex items-center gap-2">
                                        <FaUserCircle className={`${PRIMARY_COLOR_CLASS} text-xl`} />
                                        Reputation: <span className="font-semibold">{profileData.reputation}</span>
                                    </p>
                                )}
                                {profileData?.totalPosts >= 10 && (
                                    <p className="text-gray-700 flex items-center gap-2">
                                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-yellow-200 text-yellow-800">
                                            <FaStar className="inline-block mr-1" />
                                            Active Contributor
                                        </span>
                                    </p>
                                )}
                                {profileData?.totalComments >= 20 && (
                                    <p className="text-gray-700 flex items-center gap-2">
                                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-200 text-blue-800">
                                            <FaCommentDots className="inline-block mr-1" />
                                            Chatty Member
                                        </span>
                                    </p>
                                )}

                            </div>
                        </div>
                    </div>
                )}

                {/* Recent Activity */}
                <div className="mt-10 pt-6 border-t border-gray-200">
                    <h3 className={`text-xl font-semibold mb-5 ${PRIMARY_COLOR_CLASS}`}>My Recent Posts</h3>
                    {recentActivity.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
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
                            {profileData?.totalPosts > recentActivity.length && (
                                <div className="text-right mt-4">
                                    <Link to="/dashboard/my-posts" className={`text-sm font-semibold ${PRIMARY_COLOR_CLASS} hover:underline`}>
                                        View All My Posts &rarr;
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-600">No posts created yet.</p>
                    )}
                </div>

                {/* Future Sections: Liked Posts, Bookmarked Posts, Settings */}
                <div className="mt-10 pt-6 border-t border-gray-200">
                    <h3 className={`text-xl font-semibold mb-5 ${PRIMARY_COLOR_CLASS}`}>Liked Posts</h3>
                    <p className="text-gray-600">Feature coming soon!</p>
                </div>
                <div className="mt-10 pt-6 border-t border-gray-200">
                    <h3 className={`text-xl font-semibold mb-5 ${PRIMARY_COLOR_CLASS}`}>Settings & Privacy</h3>
                    <p className="text-gray-600">Manage email notifications, privacy settings, and more here.</p>
                    <button
                        onClick={() => {
                            setShowPasswordChange(!showPasswordChange);
                            setEditMode(false);
                            setPasswordError('');
                            setOldPassword('');
                            setNewPassword('');
                            setConfirmNewPassword('');
                        }}
                        className={`mt-4 px-4 py-2 rounded-lg ${PRIMARY_BG_COLOR_CLASS} text-white ${PRIMARY_HOVER_BG_COLOR_CLASS} transition-colors`}
                    >
                        Change Password
                    </button>

                    {showPasswordChange && (
                        <motion.form
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                            onSubmit={handlePasswordChange} className="mt-6 space-y-4 p-4 border rounded-lg bg-gray-50"
                        >
                            <h4 className="text-lg font-semibold text-gray-800">Update Your Password</h4>
                            {/* Old Password Field */}
                            <div>
                                <label htmlFor="oldPassword" className="block text-gray-700 text-sm font-bold mb-2">Old Password:</label>
                                <div className="relative">
                                    <input
                                        id="oldPassword"
                                        type={showOldPassword ? "text" : "password"}
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight ${PRIMARY_FOCUS_OUTLINE_CLASS}`}
                                        required
                                    />
                                    <span
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                    >
                                        {showOldPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                                    </span>
                                </div>
                            </div>
                            {/* New Password Field */}
                            <div>
                                <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">New Password:</label>
                                <div className="relative">
                                    <input
                                        id="newPassword"
                                        type={showNewPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight ${PRIMARY_FOCUS_OUTLINE_CLASS}`}
                                        required
                                    />
                                    <span
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                                    </span>
                                </div>
                            </div>
                            {/* Confirm New Password Field */}
                            <div>
                                <label htmlFor="confirmNewPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm New Password:</label>
                                <div className="relative">
                                    <input
                                        id="confirmNewPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight ${PRIMARY_FOCUS_OUTLINE_CLASS}`}
                                        required
                                    />
                                    <span
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                                    </span>
                                </div>
                            </div>
                            {passwordError && (
                                <p className="text-red-500 text-sm">{passwordError}</p>
                            )}
                            <div className="flex justify-end gap-3">
                                <button
                                    type="submit"
                                    className={`px-5 py-2 rounded-lg text-white font-semibold ${PRIMARY_BG_COLOR_CLASS} ${PRIMARY_HOVER_BG_COLOR_CLASS} transition-colors`}
                                >
                                    Save New Password
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPasswordChange(false);
                                        setOldPassword('');
                                        setNewPassword('');
                                        setConfirmNewPassword('');
                                        setPasswordError('');
                                    }}
                                    className={`px-5 py-2 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors`}
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.form>
                    )}
                </div>

            </div>
        </motion.div>
    );
};

export default MyProfile;