// import React from "react";
// import {
//   FaEnvelope,
//   FaPhoneAlt,
//   FaPaperPlane,
//   FaCheckCircle,
// } from "react-icons/fa";
// import { MdLiveHelp, MdSupportAgent } from "react-icons/md";
// import { motion } from "framer-motion";

// const Support = () => {
//   const isLive = true; 

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12 text-gray-800">
//       <title>Support || Petiva</title>
      
//       <motion.div
//         className="text-center mb-12"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="flex justify-center mb-3">
//           <MdSupportAgent className="text-5xl text-[#4CA3B8]" />
//         </div>
//         <h2 className="text-3xl font-bold text-[#4CA3B8] mb-2">Support & Help Center</h2>
//         <p className="text-sm text-gray-600 max-w-xl mx-auto">
//           Welcome to Petiva’s dedicated support space. Whether you need help managing your pet posts, exploring features, or just have a question — we’re here to guide you.
//         </p>
//       </motion.div>

//       {/* Email & Call Support */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="border p-6 rounded shadow text-center"
//         >
//           <FaEnvelope className="text-4xl mx-auto text-[#4CA3B8] mb-3" />
//           <h3 className="text-lg font-semibold mb-1">Email Support</h3>
//           <p className="text-[#4CA3B8]">support@petiva.com</p>
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="border p-6 rounded shadow text-center"
//         >
//           <FaPhoneAlt className="text-4xl mx-auto text-[#4CA3B8] mb-3" />
//           <h3 className="text-lg font-semibold mb-1">Call Us</h3>
//           <p className="text-[#4CA3B8]">+88 01740 000000</p>
//         </motion.div>
//       </div>

//       {/* Live Chat Section */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="bg-[#FDECEF] p-6 rounded shadow text-center mb-10"
//       >
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
//       </motion.div>

//       {/* Operating Hours */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="text-center mb-10"
//       >
//         <p className="text-md font-medium">
//           🕒 Support Hours: 9:00 AM – 9:00 PM (Everyday)
//         </p>
//       </motion.div>


//       {/* Social Media Support */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="bg-[#f0fbff] p-6 rounded shadow text-center mb-10"
//       >
//         <h3 className="text-lg font-semibold mb-2">Connect on Social Media</h3>
//         <p className="mb-3 text-sm">
//           Get help and updates faster through our official social channels.
//         </p>
//         <div className="flex justify-center gap-4">
//           <a
//             href="#"
//             target="_blank"
//             className="text-white bg-[#4CA3B8] hover:bg-[#3a8aa3] px-4 py-2 rounded"
//           >
//             Facebook
//           </a>
//           <a
//             href="#"
//             target="_blank"
//             className="text-white bg-[#4CA3B8] hover:bg-[#3a8aa3] px-4 py-2 rounded"
//           >
//             Messenger
//           </a>
//         </div>
//       </motion.div>

//       {/* Send Feedback */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="border p-6 rounded shadow"
//       >
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
//             className="bg-[#4CA3B8] hover:bg-[#3a8aa3] text-white px-6 py-2 rounded flex items-center gap-2"
//           >
//             <FaCheckCircle /> Submit Feedback
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default Support;


import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";
import { MdLiveHelp, MdSupportAgent } from "react-icons/md";
import { motion } from "framer-motion";

const Support = () => {
  const isLive = true;
  const feedbackRef = useRef(null);

  // controlled form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const scrollToFeedback = () => {
    feedbackRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "success",
      title: "Submitted!",
      text: "Thank you for your feedback.",
    });

    // Clear only the form inputs (no reload)
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-gray-800">
      <title>Support || Petiva</title>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
        data-aos="fade-up"
      >
        <MdSupportAgent className="text-5xl text-[#4CA3B8] mx-auto mb-3" />
        <h2 className="text-3xl font-bold text-[#4CA3B8] mb-2">
          Support & Help Center
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          Welcome to Petiva’s dedicated support space. We’re here to guide you
          anytime.
        </p>
      </motion.div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-12">
        <div
          className="p-6 rounded-lg shadow-md text-center"
          data-aos="fade-up"
        >
          <FaEnvelope className="text-4xl mx-auto text-[#4CA3B8] mb-3" />
          <h3 className="text-lg font-semibold mb-1">Email Support</h3>
          <p className="text-[#4CA3B8]">support@petiva.com</p>
        </div>

        <div
          className="p-6 rounded-lg shadow-md text-center"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <FaPhoneAlt className="text-4xl mx-auto text-[#4CA3B8] mb-3" />
          <h3 className="text-lg font-semibold mb-1">Call Us</h3>
          <p className="text-[#4CA3B8]">+88 01740 000000</p>
        </div>
      </div>

      {/* Live Chat Section */}
      <div
        className="bg-[#F3FAFC] p-6 rounded-lg shadow-md text-center mb-12"
        data-aos="fade-up"
      >
        <MdLiveHelp className="text-4xl text-[#4CA3B8] mx-auto mb-2" />
        <h3 className="text-lg font-semibold mb-2">Live Chat Support</h3>
        <p className="mb-3 text-sm text-gray-700">
          Need instant help? Our support team is available during business
          hours.
        </p>
        <p className="text-sm font-medium">
          {isLive ? "🟢 Live Chat Coming Soon" : "🔴 Currently Offline"}
        </p>
      </div>

      {/* Shortcut Button */}
      <div className="text-center mb-12" data-aos="zoom-in">
        <button
          onClick={scrollToFeedback}
          className="bg-[#4CA3B8] text-white px-6 py-2 rounded hover:bg-[#3a8aa3]"
        >
          Send Feedback
        </button>
      </div>

      {/* Feedback Form */}
      <div ref={feedbackRef} data-aos="fade-up">
        <div className="border p-8 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-[#4CA3B8]">
            <FaPaperPlane /> Send Us Feedback
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                className="w-full px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-[#4CA3B8]"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                className="w-full px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-[#4CA3B8]"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm mb-1">Message</label>
              <textarea
                rows="4"
                className="w-full px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-[#4CA3B8]"
                placeholder="Write your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="mt-2 bg-[#4CA3B8] hover:bg-[#3a8aa3] text-white px-6 py-2 rounded flex items-center gap-2 mx-auto"
            >
              <FaCheckCircle /> Submit Feedback
            </button>
          </form>
        </div>
      </div>

      <div
        className="text-center mt-12 text-sm text-gray-600"
        data-aos="fade-up"
      >
        🕒 Support Hours: 9:00 AM – 9:00 PM (Everyday)
      </div>
    </div>
  );
};

export default Support;


