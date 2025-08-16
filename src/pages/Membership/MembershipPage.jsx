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
      title: "Thank you!",
      text: "Feedback submitted!",
    });

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-gray-800">
      <title>Support || Petiva</title>

      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <MdSupportAgent className="text-5xl text-[#4CA3B8] mx-auto mb-3" />
        <h2 className="text-3xl font-bold text-[#4CA3B8] mb-2">
          Support & Help Center
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          Welcome to Petiva’s dedicated support space. We're here to guide you!
        </p>
      </motion.div>

      {/* Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border p-6 rounded-lg shadow text-center"
        >
          <FaEnvelope className="text-4xl mx-auto text-[#4CA3B8] mb-3" />
          <h3 className="text-lg font-semibold mb-1">Email Support</h3>
          <p className="text-[#4CA3B8]">support@petiva.com</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border p-6 rounded-lg shadow text-center"
        >
          <FaPhoneAlt className="text-4xl mx-auto text-[#4CA3B8] mb-3" />
          <h3 className="text-lg font-semibold mb-1">Call Us</h3>
          <p className="text-[#4CA3B8]">+88 01740 000000</p>
        </motion.div>
      </div>

      {/* Live Chat */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#F0FAFD] p-6 rounded-lg shadow text-center mb-10"
      >
        <MdLiveHelp className="text-4xl text-[#4CA3B8] mx-auto mb-2" />
        <h3 className="text-lg font-semibold mb-2">Live Chat Support</h3>
        <p className="mb-3 text-sm">
          Need instant help? Our support team is available via live chat during
          business hours.
        </p>
        <p className="font-medium mb-4">
          {isLive ? "🟢 Live Chat Available Soon" : "🔴 Offline"}
        </p>
        <button className="bg-gray-300 cursor-not-allowed text-gray-600 px-6 py-2 rounded">
          Start Chat (Coming Soon)
        </button>
      </motion.div>

      {/* Shortcut Button */}
      <div className="text-center mb-12">
        <button
          onClick={scrollToFeedback}
          className="bg-[#4CA3B8] text-white px-6 py-2 rounded hover:bg-[#3a8aa3]"
        >
          Send Feedback
        </button>
      </div>

      {/* Feedback Form */}
      <div ref={feedbackRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border p-8 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#4CA3B8]">
            <FaPaperPlane /> Send Us Feedback
          </h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Your Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#4CA3B8] hover:bg-[#3a8aa3] text-white px-6 py-2 rounded flex items-center gap-2 mx-auto"
            >
              <FaCheckCircle /> Submit Feedback
            </button>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 text-sm text-gray-600">
        🕒 Support Hours: 9:00 AM – 9:00 PM (Everyday)
      </div>
    </div>
  );
};

export default Support;
