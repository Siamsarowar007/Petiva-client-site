
// import { useEffect, useState, useContext } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { FaBell } from "react-icons/fa";
// import { AiOutlineLogout } from "react-icons/ai";
// import { AuthContext } from "../../contexts/AuthContext/AuthContext";
// import useAxios from "../../hooks/useAxios";
// import moment from "moment";

// const Navbar = () => {
//   const { user, signOutUser } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const axios = useAxios();

//   const [unread, setUnread] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const res = await axios.get("/announcements");
//         const all = res.data;
//         const readIds = JSON.parse(localStorage.getItem("read_announcements")) || [];
//         const unreadAnnouncements = all.filter((a) => !readIds.includes(a._id));
//         setUnread(unreadAnnouncements);
//       } catch (err) {
//         console.error("Failed to fetch announcements", err);
//       }
//     };

//     if (user) fetchAnnouncements();
//   }, [user]);

//   const handleMarkAllRead = () => {
//     const ids = unread.map((a) => a._id);
//     localStorage.setItem(
//       "read_announcements",
//       JSON.stringify([...ids, ...(JSON.parse(localStorage.getItem("read_announcements")) || [])])
//     );
//     setUnread([]);
//   };

//   const handleLogout = async () => {
//     await signOutUser();
//     navigate("/join-us");
//   };

//   const navItems = (
//     <>
//       <li>
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             `font-medium ${isActive ? "border-b-2 border-[#4CA3B8]" : ""}`
//           }
//         >
//           Home
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/all-post"
//           className={({ isActive }) =>
//             `font-medium ${isActive ? "border-b-2 border-[#4CA3B8]" : ""}`
//           }
//         >
//           All Post
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/membership"
//           className={({ isActive }) =>
//             `font-medium ${isActive ? "border-b-2 border-[#4CA3B8]" : ""}`
//           }
//         >
//           Membership
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/about"
//           className={({ isActive }) =>
//             `font-medium ${isActive ? "border-b-2 border-[#4CA3B8]" : ""}`
//           }
//         >
//           About Us
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/support"
//           className={({ isActive }) =>
//             `font-medium ${isActive ? "border-b-2 border-[#4CA3B8]" : ""}`
//           }
//         >
//           Support
//         </NavLink>
//       </li>
//     </>
//   );

//   return (
//     <div className="navbar bg-base-100 shadow-sm px-4 sticky top-0 z-50">
//       {/* 🔶 Logo & Name */}
//       <div className="navbar-start">
//         <div className="dropdown -ml-4 lg:hidden">
//           <label tabIndex={0} className="btn btn-ghost">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//             </svg>
//           </label>
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content mt-3 z-[10] p-1 ml-4 shadow bg-base-100 rounded-box w-52"
//           >
//             {navItems}
//           </ul>
//         </div>

//         <div className="flex items-center gap-2 cursor-pointer">
//           <img src="/Petiva-logo.png" alt="Petiva Logo" className="w-14 -ml-4 h-14 object-contain" />
//           <h4 className="text-[#4CA3B8] text-3xl -ml-4 font-bold m-0">Petiva</h4>
//         </div>
//       </div>

//       {/* 🔷 Center Navigation */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">{navItems}</ul>
//       </div>

//       {/*  Notification & Profile */}
//       <div className="navbar-end flex items-center gap-3 relative">
//         {user && (
//           <div className="relative">
//             <button
//               className="btn btn-ghost text-[#4CA3B8] text-xl relative"
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               title="Notifications"
//             >
//               <FaBell />
//               {unread.length > 0 && (
//                 <span className="badge badge-sm bg-red-500 text-white absolute -top-1 -right-1">
//                   {unread.length}
//                 </span>
//               )}
//             </button>

//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-300 shadow-lg rounded-md z-50">
//                 <div className="px-4 py-2 font-semibold border-b">Notifications</div>
//                 <div className="max-h-64 overflow-y-auto">
//                   {unread.length > 0 ? (
//                     unread.map((a) => (
//                       <div key={a._id} className="p-3 border-b">
//                         <p className="font-medium">{a.title}</p>
//                         <p className="text-xs text-gray-500">{moment(a.createdAt).fromNow()}</p>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="p-3 text-center text-gray-500">No new notifications</div>
//                   )}
//                 </div>
//                 {unread.length > 0 && (
//                   <button
//                     onClick={handleMarkAllRead}
//                     className="text-blue-500 hover:underline w-full py-2 text-sm"
//                   >
//                     Mark all as read
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {/* 👤 Profile / Join */}
//         {!user ? (
//           <NavLink
//             to="/join-us"
//             className="btn btn-sm md:btn-md lg:btn-lg bg-[#4CA3B8] text-white hover:bg-[#3b889e] transition-all duration-200"
//           >
//             Join Us
//           </NavLink>
//         ) : (
//           <div className="dropdown dropdown-end">
//             <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
//               <div className="w-10 h-10 rounded-full ring ring-[#4CA3B8] ring-offset-base-100 ring-offset-2 overflow-hidden">
//                 <img
//                   src={user?.photoURL || "/default-avatar.png"}
//                   alt="profile"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </label>
//             <ul
//               tabIndex={0}
//               className="mt-3 z-[10] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
//             >
//               <li className="text-center font-semibold">{user.displayName || "User"}</li>
//               <li>
//                 <NavLink to="/dashboard">Dashboard</NavLink>
//               </li>
//               <li>
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center gap-2 text-red-500"
//                 >
//                   <AiOutlineLogout /> Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import { useEffect, useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBell, FaHome, FaInfoCircle, FaQuestionCircle, FaUserCircle, FaTachometerAlt } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlinePostAdd, MdWorkspacePremium } from "react-icons/md";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import useAxios from "../../hooks/useAxios";
import moment from "moment";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const axios = useAxios();
  

  const [unread, setUnread] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get("/announcements");
        const all = res.data;
        const readIds = JSON.parse(localStorage.getItem("read_announcements")) || [];
        const unreadAnnouncements = all.filter((a) => !readIds.includes(a._id));
        setUnread(unreadAnnouncements);
      } catch (err) {
        console.error("Failed to fetch announcements", err);
      }
    };

    if (user) fetchAnnouncements();
  }, [user]);

  const handleMarkAllRead = () => {
    const ids = unread.map((a) => a._id);
    localStorage.setItem(
      "read_announcements",
      JSON.stringify([...ids, ...(JSON.parse(localStorage.getItem("read_announcements")) || [])])
    );
    setUnread([]);
  };

  const handleLogout = async () => {
    await signOutUser();
    navigate("/join-us");
  };

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 font-medium ${isActive ? "text-[#4CA3B8]" : ""}`
          }
        >
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-post"
          className={({ isActive }) =>
            `flex items-center gap-2 font-medium ${isActive ? "text-[#4CA3B8]" : ""}`
          }
        >
          <MdOutlinePostAdd /> All Post
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/membership"
          className={({ isActive }) =>
            `flex items-center gap-2 font-medium ${isActive ? "text-[#4CA3B8]" : ""}`
          }
        >
          <MdWorkspacePremium /> Membership
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex items-center gap-2 font-medium ${isActive ? "text-[#4CA3B8]" : ""}`
          }
        >
          <FaInfoCircle /> About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/support"
          className={({ isActive }) =>
            `flex items-center gap-2 font-medium ${isActive ? "text-[#4CA3B8]" : ""}`
          }
        >
          <FaQuestionCircle /> Support
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 sticky top-0 z-50">
      {/*  Logo & Name */}
      <div className="navbar-start lg:ml-76">
        <div className="dropdown -ml-4 lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[10] p-1 ml-4 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>

        <div className="flex items-center gap-2 cursor-pointer">
          <img src="/Petiva-logo.png" alt="Petiva Logo" className="w-14 -ml-4 h-14 object-contain" />
          <h4 className="text-[#4CA3B8] text-3xl -ml-4 font-bold m-0">Petiva</h4>
        </div>
      </div>

      {/* 🔷 Center Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      {/*  Notification & Profile */}
      <div className="navbar-end flex items-center gap-3 relative">
        {user && (
          <div className="relative">
            <button
              className="btn btn-ghost text-[#4CA3B8] text-xl relative"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              title="Notifications"
            >
              <FaBell />
              {unread.length > 0 && (
                <span className="badge badge-sm bg-red-500 text-white absolute -top-1 -right-1">
                  {unread.length}
                </span>
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 shadow-lg rounded-md z-50">
                <div className="flex justify-between items-center px-4 py-3 border-b bg-[#4CA3B8] text-white font-semibold">
                  <span>Notifications</span>
                  <FaBell />
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {unread.length > 0 ? (
                    unread.map((a) => (
                      <div key={a._id} className="p-3 border-b hover:bg-gray-100 transition">
                        <p className="font-medium">{a.title}</p>
                        <p className="text-xs text-gray-500">{moment(a.createdAt).fromNow()}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-center text-gray-500">No new notifications</div>
                  )}
                </div>
                {unread.length > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[#4CA3B8] hover:underline w-full py-2 text-sm font-medium"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/*  Profile / Join */}
        <div className="lg:mr-76">
        {!user ? (
          <NavLink
            to="/join-us"
            className="btn btn-sm md:btn-md lg:btn-lg bg-[#4CA3B8] text-white hover:bg-[#3b889e] transition-all duration-200"
          >
            Join Us
          </NavLink>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 h-10 rounded-full ring ring-[#4CA3B8] ring-offset-base-100 ring-offset-2 overflow-hidden">
                <img
                  src={user?.photoURL || "/default-avatar.png"}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[10] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-56"
            >
              <Link to="/dashboard/profile">
                   <li className=" font-semibold flex ml-4 text-lg gap-2">
                <FaUserCircle /> {user.displayName || "User"}
              </li>
              </Link>
              <li>
                <NavLink to="/dashboard" className="flex items-center gap-2 hover:text-[#4CA3B8]">
                  <FaTachometerAlt /> Dashboard
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600"
                >
                  <AiOutlineLogout /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

