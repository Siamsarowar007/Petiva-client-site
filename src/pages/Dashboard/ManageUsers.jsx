// import React, { useEffect, useState } from 'react';
// import { FaShieldAlt, FaTimes } from 'react-icons/fa';
// import { MdAdminPanelSettings } from 'react-icons/md';
// import Swal from 'sweetalert2';
// import useAxios from '../../hooks/useAxios';

// const ManageUsers = () => {
//     const axiosInstance = useAxios();
//     const [users, setUsers] = useState([]);
//     const [search, setSearch] = useState('');

//     useEffect(() => {
//         fetchUsers();
//     }, [search]);

//     const fetchUsers = async () => {
//         try {
//             const res = await axiosInstance.get(`/users?search=${search}`);
//             setUsers(res.data);
//         } catch (error) {
//             console.error('Failed to fetch users:', error);
//         }
//     };

//     const handleMakeAdmin = async (userId) => {
//         try {
//             const res = await axiosInstance.patch(`/users/admin/${userId}`);
//             if (res.data.modifiedCount > 0) {
//                 Swal.fire('Success', 'User promoted to admin.', 'success');
//                 fetchUsers();
//             }
//         } catch (error) {
//             console.error('Make admin failed:', error);
//         }
//     };

//     const handleRemoveAdmin = async (userId) => {
//         try {
//             const res = await axiosInstance.patch(`/users/remove-admin/${userId}`);
//             if (res.data.modifiedCount > 0) {
//                 Swal.fire('Removed', 'Admin role removed.', 'success');
//                 fetchUsers();
//             }
//         } catch (error) {
//             console.error('Remove admin failed:', error);
//         }
//     };

//     const handleBanUser = async (userId) => {
//         try {
//             const res = await axiosInstance.patch(`/users/ban/${userId}`);
//             if (res.data.modifiedCount > 0) {
//                 Swal.fire('Banned', 'User has been banned.', 'warning');
//                 fetchUsers();
//             }
//         } catch (error) {
//             console.error('Ban failed:', error);
//         }
//     };

//     return (
//         <div className="p-4">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold">Manage Users</h2>
//                 <input
//                     type="text"
//                     placeholder="Search by name or email..."
//                     className="input input-bordered w-72"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra w-full">
//                     <thead className="bg-blue-100">
//                         <tr>
//                             <th>#</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Role</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user, index) => (
//                             <tr key={user._id}>
//                                 <td>{index + 1}</td>
//                                 <td>{user.name || 'N/A'}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.role}</td>
//                                 <td className="text-green-600 font-semibold">{user.status || 'Active'}</td>
//                                 <td className="space-x-2">
//                                     {user.role === 'admin' ? (
//                                         <button
//                                             className="btn btn-xs btn-error"
//                                             onClick={() => handleRemoveAdmin(user._id)}
//                                         >
//                                             <FaTimes className="mr-1" /> Remove Admin
//                                         </button>
//                                     ) : (
//                                         <button
//                                             className="btn btn-xs btn-info"
//                                             onClick={() => handleMakeAdmin(user._id)}
//                                         >
//                                             <MdAdminPanelSettings className="mr-1" /> Make Admin
//                                         </button>
//                                     )}
//                                     <button
//                                         className="btn btn-xs btn-warning"
//                                         onClick={() => handleBanUser(user._id)}
//                                     >
//                                         <FaShieldAlt className="mr-1" /> Ban
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ManageUsers;


import React, { useEffect, useState } from 'react';
import {
  FaShieldAlt,
  FaTimes,
  FaUndo,
  FaLock,
  FaUnlock,
  FaEye,
} from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [showBanned, setShowBanned] = useState(false);
  const [selectedRole, setSelectedRole] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [selectedUserActivity, setSelectedUserActivity] = useState(null);
  const usersPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, [search, showBanned, selectedRole]);

  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get(`/users?search=${search}`);
      let filtered = res.data.reverse();
      if (!showBanned) filtered = filtered.filter(user => user.status !== 'Banned');
      if (selectedRole !== 'All') filtered = filtered.filter(user => user.role === selectedRole.toLowerCase());
      setUsers(filtered);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleMakeAdmin = async (userId) => {
    try {
      const res = await axiosSecure.patch(`/users/admin/${userId}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire('Success', 'User promoted to admin.', 'success');
        fetchUsers();
      }
    } catch (error) {
      console.error('Make admin failed:', error);
      Swal.fire('Error', 'Admin বানাতে সমস্যা হয়েছে।', 'error');
    }
  };

  const handleRemoveAdmin = async (userId) => {
    try {
      const res = await axiosSecure.patch(`/users/remove-admin/${userId}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire('Removed', 'Admin role removed.', 'success');
        fetchUsers();
      }
    } catch (error) {
      console.error('Remove admin failed:', error);
      Swal.fire('Error', 'Admin রিমুভ করতে সমস্যা হয়েছে।', 'error');
    }
  };

  const handleBanOrUnbanUser = async (user) => {
    try {
      const endpoint = user.status === 'Banned' ? 'restore' : 'ban';
      const res = await axiosSecure.patch(`/users/${endpoint}/${user._id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire(
          user.status === 'Banned' ? 'Unbanned' : 'Banned',
          `User has been ${user.status === 'Banned' ? 'restored' : 'banned'}.`,
          user.status === 'Banned' ? 'success' : 'warning'
        );
        fetchUsers();
      }
    } catch (error) {
      console.error('Ban/unban failed:', error);
      Swal.fire('Error', 'Ban/Unban করতে সমস্যা হয়েছে।', 'error');
    }
  };

  const handleToggleLockUser = async (user) => {
    try {
      const endpoint = user.locked ? 'unlock' : 'lock';
      const res = await axiosSecure.patch(`/users/${endpoint}/${user._id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire(
          user.locked ? 'Unlocked' : 'Locked',
          `User account has been ${user.locked ? 'unlocked' : 'locked'}.`,
          'info'
        );
        fetchUsers();
      }
    } catch (error) {
      console.error('Lock/unlock failed:', error);
      Swal.fire('Error', 'Lock/unlock করতে সমস্যা হয়েছে।', 'error');
    }
  };

  const openActivityModal = async (user) => {
    try {
      const res = await axiosSecure.get(`/users/activity/${user._id}`);
      setSelectedUserActivity(res.data);
      setActivityModalOpen(true);
    } catch (e) {
      console.error('Activity fetch failed:', e);
      Swal.fire('Error', 'Activity log আনতে সমস্যা হয়েছে।', 'error');
    }
  };

  const closeActivityModal = () => {
    setActivityModalOpen(false);
    setSelectedUserActivity(null);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Manage Users</h2>
        <input
          type="text"
          placeholder="Search by name/email..."
          className="input input-bordered mx-auto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2 items-center">
          <select
            className="select select-bordered"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option>All</option>
            <option>Admin</option>
            <option>User</option>
          </select>
          <label className="label cursor-pointer gap-2">
            <span className="label-text">Show Banned Users</span>
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={showBanned}
              onChange={() => setShowBanned(!showBanned)}
            />
          </label>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-blue-100 text-sm">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Subscription</th>
              <th>Registered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{indexOfFirstUser + index + 1}</td>
                <td>{user.name || 'N/A'}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td className={user.status === 'Banned' ? 'text-red-500 font-semibold' : 'text-green-600 font-semibold'}>
                  {user.status || 'Active'}
                </td>
                <td>
                  <span className="badge badge-outline badge-info">{user.subscription || 'Free'}</span>
                </td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td className="flex flex-wrap gap-1">
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => openActivityModal(user)}
                  >
                    <FaEye />
                  </button>

                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => handleToggleLockUser(user)}
                    title={user.locked ? 'Unlock User' : 'Lock User'}
                  >
                    {user.locked ? <FaUnlock /> : <FaLock />}
                  </button>

                  {user.role === 'admin' ? (
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleRemoveAdmin(user._id)}
                    >
                      <FaTimes className="mr-1" /> Remove Admin
                    </button>
                  ) : (
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => handleMakeAdmin(user._id)}
                    >
                      <MdAdminPanelSettings className="mr-1" /> Make Admin
                    </button>
                  )}

                  <button
                    className={`btn btn-xs ${user.status === 'Banned' ? 'btn-success' : 'btn-warning'}`}
                    onClick={() => handleBanOrUnbanUser(user)}
                  >
                    {user.status === 'Banned' ? (
                      <>
                        <FaUndo className="mr-1" /> Unban
                      </>
                    ) : (
                      <>
                        <FaShieldAlt className="mr-1" /> Ban
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4 gap-2">
          <button className="btn btn-sm" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Previous</button>
          <div className="join">
            {[...Array(totalPages).keys()].map(page => (
              <button key={page} className={`join-item btn btn-sm ${currentPage === page + 1 ? 'btn-primary' : ''}`} onClick={() => setCurrentPage(page + 1)}>{page + 1}</button>
            ))}
          </div>
          <button className="btn btn-sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>Next</button>
        </div>
      </div>

      {/* Activity Modal */}
      {activityModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <h3 className="text-xl font-semibold mb-4">Activity Log - {selectedUserActivity?.name}</h3>
            <ul className="list-disc pl-5 max-h-60 overflow-y-auto mb-4">
              <li>Last Login: {new Date(selectedUserActivity?.last_log_in).toLocaleString()}</li>
              <li>Profile Updated: {new Date(selectedUserActivity?.last_profile_update).toLocaleString()}</li>
              <li>Total Posts: {selectedUserActivity?.total_posts}</li>
              <li>Last Logout: {new Date(selectedUserActivity?.last_logout).toLocaleString()}</li>
            </ul>
            <button onClick={closeActivityModal} className="btn btn-sm btn-secondary absolute top-2 right-2">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;




