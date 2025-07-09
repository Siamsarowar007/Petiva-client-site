// import React from 'react';
// import { Outlet } from 'react-router';

// const DashboardLayout = () => {
//     return (
//         <div>
//             <h1>DashboardLayout</h1>
//             <Outlet></Outlet>
//         </div>
//     );
// };

// export default DashboardLayout;

import { Outlet, NavLink } from 'react-router';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">User Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <NavLink to="/dashboard" className="text-blue-600">My Profile</NavLink>
          <NavLink to="/dashboard/add-post">Add Post</NavLink>
          <NavLink to="/dashboard/my-posts">My Posts</NavLink>
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;