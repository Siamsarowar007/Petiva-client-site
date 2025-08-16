import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";
import { MdLiveHelp, MdSupportAgent } from "react-icons/md";
import { motion } from "framer-motion";

const Support = () => {
  // initialize AOS here as well
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
    AOS.refresh();
  }, []);

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
      title: "Submitted!",
      text: "Thank you for your feedback.",
    });
    // clear form
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
        data-aos="fade-down"
      >
        <MdSupportAgent className="text-5xl text-[#4CA3B8] mx-auto mb-3" />
        <h2 className="text-3xl font-bold text-[#4CA3B8] mb-2">
          Support & Help Center
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          Welcome to Petiva’s dedicated support space. We’re here to guide you anytime.
        </p>
      </motion.div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-12">
        <div className="p-6 rounded-lg shadow-md text-center" data-aos="fade-up">
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
        data-aos="zoom-in"
      >
        <MdLiveHelp className="text-4xl text-[#4CA3B8] mx-auto mb-2" />
        <h3 className="text-lg font-semibold mb-2">Live Chat Support</h3>
        <p className="mb-3 text-sm text-gray-700">
          Need instant help? Our support team is available during business hours.
        </p>
        <p className="text-sm font-medium">
          {isLive ? "🟢 Live Chat Coming Soon" : "🔴 Currently Offline"}
        </p>
      </div>

      {/* Shortcut Button */}
      <div className="text-center mb-12" data-aos="fade-up">
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

      <div className="text-center mt-12 text-sm text-gray-600" data-aos="fade-up">
        🕒 Support Hours: 9:00 AM – 9:00 PM (Everyday)
      </div>
    </div>
  );
};

export default Support;
