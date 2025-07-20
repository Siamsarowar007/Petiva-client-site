// ueser and admin there

import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import {
  FaBars,
  FaHome,
  FaUser,
  FaCrown,
  FaPlusCircle,
  FaListUl,
  FaUserShield,
  FaUsersCog,
  FaBullhorn,
  FaFlag,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const PRIMARY = "#4CA3B8";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { signOutUser } = useAuth(); 
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const activeClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg text-white bg-[#4CA3B8] font-medium shadow-md";
  const inactiveClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition";

  const handleSignOut = async () => {
    const result = await Swal.fire({
      title: "Sign out?",
      text: "Are you sure you want to sign out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: PRIMARY,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign Out",
    });

    if (!result.isConfirmed) return;

    try {
      await signOutUser();
      Swal.fire("Signed out", "You have been signed out.", "success");
      navigate("/login"); 
    } catch (err) {
      console.error("Sign out failed:", err);
      Swal.fire("Error", "Failed to sign out. Try again.", "error");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Hamburger button - mobile only */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 btn btn-ghost text-xl bg-white shadow-md rounded-full p-2"
      >
        {isSidebarOpen ? <IoClose /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          bg-white w-64 shadow-xl border-r
          flex flex-col justify-between
          fixed top-0 left-0 bottom-0 z-40
          transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:transform-none lg:translate-x-0
        `}
      >
        {/* Scroll area */}
        <div className="h-full flex flex-col overflow-y-auto">
          <div className="p-5 pb-3 border-b">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3">
              <img
                src="/Petiva-logo.png"
                alt="Petiva Logo"
                className="w-14 h-14 object-contain"
              />
              <h4 className="text-2xl font-bold" style={{ color: PRIMARY }}>
                Petiva
              </h4>
            </NavLink>
          </div>

          {/* Navigation Links */}
          <nav className="p-5 flex-1">
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/dashboard/dashboard-home"
                  className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                  }
                >
                  <FaHome /> Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                  }
                >
                  <FaUser /> My Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/payment-membership"
                  className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                  }
                >
                  <FaCrown /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/add-post"
                  className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                  }
                >
                  <FaPlusCircle /> Add Post
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my-posts"
                  className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                  }
                >
                  <FaListUl /> My Posts
                </NavLink>
              </li>

              {/* Admin Section */}
              <h2 className="font-bold text-sm uppercase tracking-wide text-gray-500 mt-6 mb-2 px-4">
                Admin
              </h2>
              <li>
                <NavLink
                  to="/dashboard/admin-dashboard"
                  className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                  }
                >
                  <FaUserShield /> Admin Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin-profile"
                  className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                  }
                >
                  <FaUserShield /> Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manage-users"
                  className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                  }
                >
                  <FaUsersCog /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/announcement"
                  className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                  }
                >
                  <FaBullhorn /> Make Announcement
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin-report"
                  className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                  }
                >
                  <FaFlag /> Reported Comments
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Sign Out Button */}
        <div className="p-5 border-t">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition transform hover:scale-[1.02] active:scale-95"
            style={{ backgroundColor: "#EF4444" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#DC2626")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#EF4444")}
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Page Content */}
      <main className="flex-1 lg:mx-auto p-6 overflow-x-hidden">
      
       
        <div className=" ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;




// role base

// import React, { useState } from "react";
// import { NavLink, Outlet, useNavigate } from "react-router";
// import {
//   FaBars,
//   FaHome,
//   FaUser,
//   FaCrown,
//   FaPlusCircle,
//   FaListUl,
//   FaUserShield,
//   FaUsersCog,
//   FaBullhorn,
//   FaFlag,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { IoClose } from "react-icons/io5";
// import Swal from "sweetalert2";
// import useAuth from "../hooks/useAuth";

// const PRIMARY = "#4CA3B8";

// const DashboardLayout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const { user, signOutUser } = useAuth(); // <-- এখন user-ও নিলাম
//   const navigate = useNavigate();

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   // রোল বের করা (fallback user)
//   const role = (user?.role || "").toLowerCase() === "admin" ? "admin" : "user";

//   // nav item config
//   const userLinks = [
//     { to: "/dashboard/dashboard-home", label: "Home", icon: <FaHome /> },
//     { to: "/dashboard/profile", label: "My Profile", icon: <FaUser /> },
//     {
//       to: "/dashboard/payment-membership",
//       label: "Membership Profile",
//       icon: <FaCrown />,
//     },
//     { to: "/dashboard/add-post", label: "Add Post", icon: <FaPlusCircle /> },
//     { to: "/dashboard/my-posts", label: "My Posts", icon: <FaListUl /> },
//   ];

//   const adminLinks = [
//     {
//       to: "/dashboard/admin-profile",
//       label: "Admin Profile",
//       icon: <FaUserShield />,
//     },
//     {
//       to: "/dashboard/manage-users",
//       label: "Manage Users",
//       icon: <FaUsersCog />,
//     },
//     {
//       to: "/dashboard/announcement",
//       label: "Make Announcement",
//       icon: <FaBullhorn />,
//     },
//     {
//       to: "/dashboard/admin-report",
//       label: "Reported Comments",
//       icon: <FaFlag />,
//     },
//   ];

//   const activeClass =
//     "flex items-center gap-3 px-4 py-2 rounded-lg text-white bg-[#4CA3B8] font-medium shadow-md";
//   const inactiveClass =
//     "flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition";

//   const handleSignOut = async () => {
//     const result = await Swal.fire({
//       title: "Sign out?",
//       text: "Are you sure you want to sign out?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: PRIMARY,
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Sign Out",
//     });

//     if (!result.isConfirmed) return;

//     try {
//       await signOutUser();
//       Swal.fire("Signed out", "You have been signed out.", "success");
//       navigate("/login");
//     } catch (err) {
//       console.error("Sign out failed:", err);
//       Swal.fire("Error", "Failed to sign out. Try again.", "error");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50 relative">
//       {/* Hamburger button - mobile only */}
//       <button
//         onClick={toggleSidebar}
//         className="lg:hidden fixed top-4 left-4 z-50 btn btn-ghost text-xl bg-white shadow-md rounded-full p-2"
//       >
//         {isSidebarOpen ? <IoClose /> : <FaBars />}
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`
//           bg-white w-64 shadow-xl border-r
//           flex flex-col justify-between
//           fixed top-0 left-0 bottom-0 z-40
//           transform transition-transform duration-300
//           ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
//           lg:static lg:transform-none lg:translate-x-0
//         `}
//       >
//         {/* Scroll area */}
//         <div className="h-full flex flex-col overflow-y-auto">
//           {/* Logo */}
//           <div className="p-5 pb-3 border-b">
//             <NavLink to="/" className="flex items-center gap-3">
//               <img
//                 src="/Petiva-logo.png"
//                 alt="Petiva Logo"
//                 className="w-14 h-14 object-contain"
//               />
//               <h4 className="text-2xl font-bold" style={{ color: PRIMARY }}>
//                 Petiva
//               </h4>
//             </NavLink>
//           </div>

//           {/* User Header */}
//           <div className="px-5 py-4 border-b flex items-center gap-3">
//             <img
//               src={
//                 user?.photoURL ||
//                 "https://i.ibb.co/VgY9pJf/avatar.png"
//               }
//               alt={user?.displayName || "User"}
//               className="w-10 h-10 rounded-full object-cover ring-2"
//               style={{ borderColor: PRIMARY }}
//             />
//             <div className="leading-tight">
//               <p className="text-sm font-semibold text-gray-800 truncate max-w-[150px]">
//                 {user?.displayName || "User"}
//               </p>
//               <p className="text-xs text-gray-500 truncate max-w-[150px]">
//                 {user?.email || "unknown"}
//               </p>
//             </div>
//           </div>

//           {/* Navigation Links */}
//           <nav className="p-5 flex-1">
//             <ul className="space-y-2">
//               {userLinks.map((item) => (
//                 <li key={item.to}>
//                   <NavLink
//                     to={item.to}
//                     className={({ isActive }) =>
//                       isActive ? activeClass : inactiveClass
//                     }
//                   >
//                     {item.icon} {item.label}
//                   </NavLink>
//                 </li>
//               ))}

//               {/* Admin Section (conditional) */}
//               {role === "admin" && (
//                 <>
//                   <h2 className="font-bold text-sm uppercase tracking-wide text-gray-500 mt-6 mb-2 px-4">
//                     Admin
//                   </h2>
//                   {adminLinks.map((item) => (
//                     <li key={item.to}>
//                       <NavLink
//                         to={item.to}
//                         className={({ isActive }) =>
//                           isActive ? activeClass : inactiveClass
//                         }
//                       >
//                         {item.icon} {item.label}
//                       </NavLink>
//                     </li>
//                   ))}
//                 </>
//               )}
//             </ul>
//           </nav>
//         </div>

//         {/* Sign Out Button */}
//         <div className="p-5 border-t">
//           <button
//             onClick={handleSignOut}
//             className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition transform hover:scale-[1.02] active:scale-95"
//             style={{ backgroundColor: "#EF4444" }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.backgroundColor = "#DC2626")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.backgroundColor = "#EF4444")
//             }
//           >
//             <FaSignOutAlt /> Sign Out
//           </button>
//         </div>
//       </aside>

//       {/* Overlay for mobile when sidebar open */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-30 lg:hidden"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Page Content */}
//       <main className="flex-1 lg:ml-64 p-6 overflow-x-hidden">
//         <div className="max-w-7xl mx-auto w-full">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;
