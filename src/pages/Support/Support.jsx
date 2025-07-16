// import React from "react";
// import { FaEnvelope, FaPhoneAlt, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
// import { MdLiveHelp } from "react-icons/md";

// const Support = () => {
//   const isLive = true; // Can be dynamic later

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12 text-gray-800">
//       {/* Status Notice Banner */}
//       <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 p-4 mb-6 rounded">
//         <p className="font-medium">
//           ⚠️ Some users may experience delay in email responses due to maintenance.
//         </p>
//       </div>

//       {/* Email & Call Support */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//         <div className="border p-6 rounded shadow text-center">
//           <FaEnvelope className="text-4xl mx-auto text-[#4CA3B8] mb-3" />
//           <h3 className="text-lg font-semibold mb-1">Email Support</h3>
//           <p className="text-[#4CA3B8]">support@example.com</p>
//         </div>
//         <div className="border p-6 rounded shadow text-center">
//           <FaPhoneAlt className="text-4xl mx-auto text-[#4CA3B8] mb-3" />
//           <h3 className="text-lg font-semibold mb-1">Call Us</h3>
//           <p className="text-[#4CA3B8]">+88 01740 000000</p>
//         </div>
//       </div>

//       {/* Live Chat Section */}
//       <div className="bg-[#FDECEF] p-6 rounded shadow text-center mb-10">
//         <MdLiveHelp className="text-4xl text-[#4CA3B8] mx-auto mb-2" />
//         <h3 className="text-lg font-semibold mb-2">Live Chat Support</h3>
//         <p className="mb-4 text-sm">
//           Need instant help? Our support team is available via live chat during business hours.
//         </p>
//         <p className="mb-3 font-medium">
//           {isLive ? "🟢 Live Chat Available Now" : "🔴 Offline: Leave a message"}
//         </p>
//         <button className="bg-[#4CA3B8] hover:bg-[#3a8aa3] text-white px-6 py-2 rounded">
//           Start Live Chat
//         </button>
//       </div>

//       {/* Operating Hours */}
//       <div className="text-center mb-10">
//         <p className="text-md font-medium">🕒 Support Hours: 9:00 AM – 9:00 PM (Everyday)</p>
//       </div>

//       {/* Send Feedback Section */}
//       <div className="border p-6 rounded shadow">
//         <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//           <FaPaperPlane /> Send Us Feedback
//         </h3>
//         <form className="space-y-4">
//           <input
//             type="text"
//             placeholder="Your Name"
//             className="w-full px-4 py-2 border rounded"
//           />
//           <input
//             type="email"
//             placeholder="Your Email"
//             className="w-full px-4 py-2 border rounded"
//           />
//           <textarea
//             rows="4"
//             placeholder="Your Message"
//             className="w-full px-4 py-2 border rounded"
//           ></textarea>
//           <button
//             type="submit"
//             className="bg-[#E6B94D] hover:bg-yellow-500 text-white px-6 py-2 rounded flex items-center gap-2"
//           >
//             <FaCheckCircle /> Submit Feedback
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Support;


import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";
import { MdLiveHelp } from "react-icons/md";
import { motion } from "framer-motion";

const Support = () => {
  const isLive = true; // Can be dynamic later

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-gray-800">
      {/* Email & Call Support */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border p-6 rounded shadow text-center"
        >
          <FaEnvelope className="text-4xl mx-auto text-[#4CA3B8] mb-3" />
          <h3 className="text-lg font-semibold mb-1">Email Support</h3>
          <p className="text-[#4CA3B8]">support@example.com</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border p-6 rounded shadow text-center"
        >
          <FaPhoneAlt className="text-4xl mx-auto text-[#4CA3B8] mb-3" />
          <h3 className="text-lg font-semibold mb-1">Call Us</h3>
          <p className="text-[#4CA3B8]">+88 01740 000000</p>
        </motion.div>
      </div>

      {/* Live Chat Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#FDECEF] p-6 rounded shadow text-center mb-10"
      >
        <MdLiveHelp className="text-4xl text-[#4CA3B8] mx-auto mb-2" />
        <h3 className="text-lg font-semibold mb-2">Live Chat Support</h3>
        <p className="mb-4 text-sm">
          Need instant help? Our support team is available via live chat during business hours.
        </p>
        <p className="mb-3 font-medium">
          {isLive ? "🟢 Live Chat Available Now" : "🔴 Offline: Leave a message"}
        </p>
        <button className="bg-[#4CA3B8] hover:bg-[#3a8aa3] text-white px-6 py-2 rounded">
          Start Live Chat
        </button>
      </motion.div>

      {/* Operating Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-10"
      >
        <p className="text-md font-medium">
          🕒 Support Hours: 9:00 AM – 9:00 PM (Everyday)
        </p>
      </motion.div>

      {/* New Relevant Section - Social Media Support */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#f0fbff] p-6 rounded shadow text-center mb-10"
      >
        <h3 className="text-lg font-semibold mb-2">Connect on Social Media</h3>
        <p className="mb-3 text-sm">
          Get help and updates faster through our official social channels.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="#"
            target="_blank"
            className="text-white bg-[#4CA3B8] hover:bg-[#3a8aa3] px-4 py-2 rounded"
          >
            Facebook
          </a>
          <a
            href="#"
            target="_blank"
            className="text-white bg-[#4CA3B8] hover:bg-[#3a8aa3] px-4 py-2 rounded"
          >
            Messenger
          </a>
        </div>
      </motion.div>

      {/* Send Feedback Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border p-6 rounded shadow"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaPaperPlane /> Send Us Feedback
        </h3>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full px-4 py-2 border rounded"
          ></textarea>
          <button
            type="submit"
            className="bg-[#4CA3B8] hover:bg-[#3a8aa3] text-white px-6 py-2 rounded flex items-center gap-2"
          >
            <FaCheckCircle /> Submit Feedback
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Support;