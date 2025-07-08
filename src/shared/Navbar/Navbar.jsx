import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {

    const navItems = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
    </>

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Pet </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;


// import { NavLink, useNavigate } from 'react-router';
// import { useContext } from 'react';
// import { AuthContext } from '../../context/AuthProvider'; // adjust path as needed
// import { FaBell } from 'react-icons/fa';
// import { AiOutlineLogout } from 'react-icons/ai';

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await logout();
//     navigate('/join-us');
//   };

//   const navItems = (
//     <>
//       <li><NavLink to="/" className="font-medium">Home</NavLink></li>
//       <li><NavLink to="/membership" className="font-medium">Membership</NavLink></li>
//     </>
//   );

//   return (
//     <div className="navbar bg-base-100 shadow-sm px-4">
//       {/* Navbar Start */}
//       <div className="navbar-start">
//         <div className="dropdown lg:hidden">
//           <button tabIndex={0} className="btn btn-ghost">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
//               viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16" />
//             </svg>
//           </button>
//           <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52">
//             {navItems}
//           </ul>
//         </div>
//         <NavLink to="/" className="btn btn-ghost text-xl font-bold">
//           {/* logo image optional */}
//           Pet <span className="text-orange-500">House</span>
//         </NavLink>
//       </div>

//       {/* Navbar Center */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">
//           {navItems}
//         </ul>
//       </div>

//       {/* Navbar End */}
//       <div className="navbar-end flex items-center gap-3">
//         {/* Notification Icon (always visible if logged in) */}
//         {user && (
//           <button className="btn btn-ghost text-xl">
//             <FaBell />
//           </button>
//         )}

//         {/* Profile or Join Us */}
//         {!user ? (
//           <NavLink to="/join-us" className="btn btn-outline btn-sm">Join Us</NavLink>
//         ) : (
//           <div className="dropdown dropdown-end">
//             <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
//               <div className="w-10 rounded-full ring ring-orange-400 ring-offset-base-100 ring-offset-2">
//                 <img src={user.photoURL || "/default-avatar.png"} alt="profile" />
//               </div>
//             </label>
//             <ul tabIndex={0} className="mt-3 z-[10] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
//               <li className="font-semibold text-center">{user.displayName}</li>
//               <li>
//                 <NavLink to="/dashboard">Dashboard</NavLink>
//               </li>
//               <li>
//                 <button onClick={handleLogout} className="flex items-center gap-2 text-red-500">
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
