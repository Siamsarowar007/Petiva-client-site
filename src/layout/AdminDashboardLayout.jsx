// import React from 'react';
// import { Outlet } from 'react-router';

// const AdminDashboardLayout = () => {
//     return (
//         <div>
//             AdminDashboardLayout
//             <Outlet></Outlet>
//         </div>
//     );
// };

// export default AdminDashboardLayout;
// import { Outlet, NavLink } from 'react-router';

// const AdminDashboardLayout = () => {
//   return (
//     <div className="flex min-h-screen">
//       <aside className="w-64 bg-orange-50 p-4">
//         <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
//         <nav className="flex flex-col gap-2">
//           <NavLink to="/admin-dashboard" className="text-orange-600">Admin Profile</NavLink>
//           <NavLink to="/admin-dashboard/admin-manageUsers">Manage Users</NavLink>
//           <NavLink to="/admin-dashboard/admin-reports">Reported Comments</NavLink>
//           <NavLink to="/admin-dashboard/admin-announcement">Make Announcement</NavLink>
//         </nav>
//       </aside>
//       <main className="flex-1 p-4">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AdminDashboardLayout;