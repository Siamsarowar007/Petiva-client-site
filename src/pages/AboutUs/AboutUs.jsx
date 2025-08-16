import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import {
  FaPaw,
  FaHandsHelping,
  FaLightbulb,
  FaHeartbeat,
  FaCertificate,
  FaUsers,
  FaPlusCircle,
} from "react-icons/fa";

const primaryColor = "#4CA3B8";
const pinColor = "#E6B94D";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const timelinePoints = [
    { year: "2023", text: "Petiva Idea Born" },
    { year: "2024", text: "Forum Launch & First 1,000 Users" },
    { year: "2025", text: "Membership Features & Vet Partnership" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-gray-800">
      <title>About || Petiva</title>

      {/* Header */}
      <div className="text-center mb-12">
        <h1
          className="text-5xl md:text-6xl font-bold"
          style={{ color: primaryColor }}
          data-aos="fade-up"
        >
          Welcome to Petiva
        </h1>
        <p
          className="text-lg md:text-xl text-gray-600"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          A dedicated forum for all things pet care — built for passionate pet lovers across Bangladesh.
        </p>
      </div>

      {/* Timeline + Founders Section Side by Side */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">

        {/* Timeline */}
        <div className="mx-auto">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: primaryColor }}
            data-aos="fade-up"
          >
            Our Journey
          </h2>
          <div className="relative border-l-4 border-[#E6B94D] pl-10">
            {timelinePoints.map(({ year, text }, idx) => (
              <div
                key={year}
                className="mb-8 relative"
                data-aos="fade-up"
                data-aos-delay={100 * idx}
              >
                <span
                  className="absolute -left-7 top-2 w-5 h-5 rounded-full flex text-white items-center justify-center"
                  style={{ backgroundColor: pinColor }}
                >
                  <FaPaw className="text-xs" />
                </span>
                <p className="text-gray-700 font-semibold text-lg">
                  <strong>{year}</strong> – {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Founders / Information Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Meet the Founders",
              text: "A small group of pet lovers launched Petiva to bridge the knowledge gap in local pet care.",
            },
            {
              title: "Community Driven",
              text: "Petiva thrives on user-generated stories, questions and peer-to-peer support.",
            },
            {
              title: "Expert Verified",
              text: "Medical advice is reviewed by certified veterinarians or experienced trainers.",
            },
            {
              title: "Always Improving",
              text: "We’re constantly adding new features and improving performance based on your feedback.",
            },
          ].map(({ title, text }, i) => (
            <motion.div
              key={title}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition duration-300"
              data-aos="fade-up"
              data-aos-delay={100 * i}
            >
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: primaryColor }}
              >
                {title}
              </h3>
              <p className="text-gray-600">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <section
        className="text-center py-16 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl shadow mb-12"
        data-aos="fade-up"
      >
        <FaLightbulb className="text-5xl text-[#E6B94D] mx-auto mb-4" />
        <h2 className="text-4xl font-extrabold mb-4" style={{ color: primaryColor }}>
          Our Mission
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700">
          To empower pet owners across Bangladesh by providing a platform to share experiences,
          ask questions and connect with professionals — ensuring better lives for every pet.
        </p>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 mb-16" data-aos="fade-up">
        <div className="text-center mb-12">
          <FaPlusCircle className="text-5xl text-[#E6B94D] mx-auto mb-4" />
          <h2
            className="text-4xl font-extrabold"
            style={{ color: primaryColor }}
          >
            What We Offer
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: FaUsers,
              title: "Discussion Forums",
              description: "Engage in conversations on pet health, nutrition and care.",
            },
            {
              icon: FaCertificate,
              title: "Expert Q&A",
              description: "Ask certified vets and trainers for trusted advice.",
            },
            {
              icon: FaPaw,
              title: "Exclusive Membership",
              description: "Unlock premium content, events & special badges.",
            },
            {
              icon: FaHandsHelping,
              title: "Community Support",
              description: "Connect with other owners for tips and adoption stories.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 text-center border-b-4 border-[#4CA3B8]
                         hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={100 * idx}
            >
              <item.icon className="text-5xl text-[#E6B94D] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values Section */}
      <section
        className="text-center py-16 bg-gradient-to-l from-teal-50 to-blue-50 rounded-xl shadow mb-14"
        data-aos="fade-up"
      >
        <FaHeartbeat className="text-5xl text-red-500 mx-auto mb-4" />
        <h2 className="text-4xl font-extrabold mb-4" style={{ color: primaryColor }}>
          Our Core Values
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700">
          We value empathy, responsible ownership and the lifelong wellbeing of all animals.
        </p>
      </section>

      {/* CTA */}
      <section
        className="text-center py-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl shadow"
        data-aos="fade-up"
      >
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 mb-8">
          Whether you're here to learn, share your knowledge or just enjoy pet stories — welcome to the Petiva family!
        </p>
        <button
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-white
                     bg-[#4CA3B8] hover:bg-[#3B8E9B] transition-all duration-300"
        >
          Join the Community
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
