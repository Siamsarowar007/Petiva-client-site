// import React from "react";
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="bg-[#f9f9f9] text-gray-700 py-12 px-4 md:px-16">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

//         {/* Logo & About */}
//         <div>
//           {/* LOGO Placeholder */}
//           <h2 className="text-2xl font-bold text-[#4CA3B8] mb-3">Petiva</h2>
//           <p className="text-sm leading-6">
//             Empowering pet lovers and caretakers to connect, share, and learn together. Join our community of animal enthusiasts.
//           </p>
//           {/* Social Icons */}
//           <div className="flex gap-3 mt-4">
//             <span className="bg-[#4CA3B8]/10 p-2 rounded-full text-[#4CA3B8]">
//               <FaFacebookF />
//             </span>
//             <span className="bg-[#4CA3B8]/10 p-2 rounded-full text-[#4CA3B8]">
//               <FaTwitter />
//             </span>
//             <span className="bg-[#4CA3B8]/10 p-2 rounded-full text-[#4CA3B8]">
//               <FaInstagram />
//             </span>
//             <span className="bg-[#4CA3B8]/10 p-2 rounded-full text-[#4CA3B8]">
//               <FaLinkedinIn />
//             </span>
//             <span className="bg-[#4CA3B8]/10 p-2 rounded-full text-[#4CA3B8]">
//               <FaYoutube />
//             </span>
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="text-lg font-semibold text-[#4CA3B8] mb-4">Quick Links</h3>
//           <ul className="space-y-2 text-sm">
//             <li>• Adopt Pets</li>
//             <li>• Pet Tips</li>
//             <li>• About Us</li>
//             <li>• Support</li>
//             <li>• Announcements</li>
//           </ul>
//         </div>

//         {/* Our Services */}
//         <div>
//           <h3 className="text-lg font-semibold text-[#4CA3B8] mb-4">Our Services</h3>
//           <ul className="space-y-2 text-sm">
//             <li>• User Dashboard</li>
//             <li>• Admin Panel</li>
//             <li>• Pet Listings</li>
//             <li>• Pet Care Articles</li>
//             <li>• Reviews & Feedback</li>
//           </ul>
//         </div>

//         {/* Contact Info & Subscribe */}
//         <div>
//           <h3 className="text-lg font-semibold text-[#4CA3B8] mb-4">Contact Info</h3>
//           <ul className="text-sm space-y-3">
//             <li className="flex items-center gap-2">
//               <FaPhone /> +88 01740 520249
//             </li>
//             <li className="flex items-center gap-2">
//               <FaEnvelope /> support@petiva.com
//             </li>
//             <li className="flex items-center gap-2">
//               <FaMapMarkerAlt /> 5800, Bogura, Bangladesh
//             </li>
//           </ul>
//           <div className="mt-6">
//             <p className="font-medium mb-2">Stay Updated</p>
//             <div className="flex items-center border border-gray-300 rounded overflow-hidden">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="px-3 py-2 w-full outline-none text-sm"
//               />
//               <button className="bg-[#4CA3B8] text-white text-sm px-4 py-2">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaGithub,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { NavLink } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-[#f9f9f9] text-gray-700 py-12 px-4 md:px-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Logo & About */}
                <div>
                    <div>
                        <NavLink to="/">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <img src="/Petiva-logo.png" alt="Petiva Logo" className="w-16 h-16 -ml-4 object-contain" />
                                <h4 className="text-[#4CA3B8] text-3xl font-bold -ml-4">Petiva</h4>
                            </div>
                        </NavLink>
                    </div>
                    <p className="text-sm font-bold leading-6">
                        Empowering pet lovers and caretakers to connect, share, and learn together. Join our community of animal enthusiasts.
                    </p>
                    {/* Social Icons */}
                    <div className="flex gap-3 mt-4">
                        <a
                            href="https://www.facebook.com/share/1DgaZ1iQHY/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#4CA3B8]/10 p-2 rounded-full text-[#4CA3B8] hover:scale-110 transition-transform duration-300"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="https://x.com/Siamsarowar007?t=Ztc-q4lGS17esWux1DqQzw&s=09"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#4CA3B8]/10 p-2 rounded-full text-[#4CA3B8] hover:scale-110 transition-transform duration-300"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="https://www.instagram.com/siam_sarowar?igsh=azJqdnNjYWdmeXJn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#4CA3B8]/10 p-2 rounded-full text-[#4CA3B8] hover:scale-110 transition-transform duration-300"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/saroar-jahan-siam007/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#4CA3B8]/10 p-2 rounded-full text-[#4CA3B8] hover:scale-110 transition-transform duration-300"
                        >
                            <FaLinkedinIn />
                        </a>
                        <a
                            href="https://github.com/Siamsarowar007/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#4CA3B8]/10 p-2 rounded-full text-[#4CA3B8] hover:scale-110 transition-transform duration-300"
                        >
                            <FaGithub />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-[#4CA3B8] mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="/" className="hover:text-[#4CA3B8] font-bold transition-all duration-300">• Home</a>
                        </li>
                        <li>
                            <a href="/all-post" className="hover:text-[#4CA3B8] font-bold transition-all duration-300">• All Post</a>
                        </li>
                        <li>
                            <a href="/membership" className="hover:text-[#4CA3B8] font-bold transition-all duration-300">• Membership</a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-[#4CA3B8] font-bold transition-all duration-300">• About</a>
                        </li>
                        <li>
                            <a href="/support" className="hover:text-[#4CA3B8] font-bold transition-all duration-300">• Support</a>
                        </li>

                    </ul>
                </div>

                {/* Our Services */}
                <div>
                    <h3 className="text-lg font-semibold text-[#4CA3B8] mb-4">Our Services</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="/dashboard/dashboard-home" className="hover:text-[#4CA3B8] font-bold transition-all duration-300">• Home Dashboard</a>
                        </li>
                        <li>
                            <a href="/dashboard/profile" className="hover:text-[#4CA3B8] font-bold transition-all duration-300">• User Dashboard</a>
                        </li>
                        <li>
                            <a href="/dashboard/add-post" className="hover:text-[#4CA3B8] font-bold transition-all duration-300">• Add Post</a>
                        </li>
                        <li>
                            <a href="/dashboard/my-posts" className="hover:text-[#4CA3B8] font-bold transition-all duration-300">• My Post</a>
                        </li>

                        <li>
                            <a href="/dashboard/payment-membership" className="hover:text-[#4CA3B8] font-bold transition-all duration-300">• Membership</a>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold text-[#4CA3B8] mb-4">Contact Info</h3>
                    <ul className="text-sm space-y-3">
                        <li className="flex items-center gap-2 hover:text-[#4CA3B8] font-bold transition-all duration-300">
                            <FaPhone /> +88 01740 000000
                        </li>
                        <li className="flex items-center gap-2 hover:text-[#4CA3B8] font-bold transition-all duration-300">
                            <FaEnvelope /> support@petiva.com
                        </li>
                        <li className="flex items-center gap-2 hover:text-[#4CA3B8] font-bold transition-all duration-300">
                            <FaMapMarkerAlt /> Mymenshingh, Bangladesh
                        </li>
                    </ul>
                    <div className="mt-6">
                        <p className="font-bold mb-2">Stay Updated</p>
                        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-3 py-2 w-full outline-none text-sm"
                            />
                            <button className="bg-[#4CA3B8] text-white text-sm px-4 py-2 hover:bg-[#3d8aa0] transition-colors duration-300">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
