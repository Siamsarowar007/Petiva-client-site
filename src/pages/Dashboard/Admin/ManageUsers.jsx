// import React, { useState, useEffect } from "react";
// import Loader from "../../../shared/Loader/Loader";
// import useAxiosSecure from "../../../hooks/useAxiosSecureFile";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const axiosInstance = useAxiosSecure();
  
//   const fetchUsers = async (search = "") => {
//     setLoading(true);
//     try {
//       const res = await axiosInstance.get(`/users?search=${search}`); 
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Failed to fetch users", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Make Admin API call
//   const makeAdmin = async (email) => {
//     try {
//       await axiosInstance.patch(`/users/make-admin/${email}`);
//       alert("User is now an Admin");
//       fetchUsers(searchTerm);
//     } catch (err) {
//       alert("Failed to update user role");
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <title>Admin Manage Users || Petiva</title>
//       <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

//       <input
//         type="text"
//         placeholder="Search by username..."
//         className="border px-3 py-2 rounded mb-4 w-full max-w-sm"
//         value={searchTerm}
//         onChange={(e) => {
//           setSearchTerm(e.target.value);
//           fetchUsers(e.target.value);
//         }}
//       />

//       {loading ? (
//         <p><Loader></Loader></p>
//       ) : (
//         <table className="w-full table-auto border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 px-4 py-2">Name</th>
//               <th className="border border-gray-300 px-4 py-2">Email</th>
//               <th className="border border-gray-300 px-4 py-2">Subscription Status</th>
//               <th className="border border-gray-300 px-4 py-2">Make Admin</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="text-center text-xl py-4 my-16">
//                   No users found.
//                 </td>
//               </tr>
//             ) : (
//               users.map((user) => (
//                 <tr key={user._id} className="hover:bg-gray-50">
//                   <td className="border border-gray-300 px-4 py-2">{user.name}</td>
//                   <td className="border border-gray-300 px-4 py-2">{user.email}</td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {user.isMember ? (
//                       <span className="text-green-600 font-semibold">Member</span>
//                     ) : (
//                       <span className="text-gray-600">Free</span>
//                     )}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {!user.isAdmin && (
//                       <button
//                         onClick={() => makeAdmin(user.email)}
//                         className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                       >
//                         Make Admin
//                       </button>
//                     )}
//                     {user.isAdmin && (
//                       <span className="text-green-600 font-semibold">Admin</span>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ManageUsers;
