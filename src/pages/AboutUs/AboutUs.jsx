import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const pinColor = "#E94B3C"; // modern red for pins
const primaryColor = "#4CA3B8"; // your primary color for headlines

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
    });
    AOS.refresh();
  }, []);

  const timelinePoints = [
    { year: "2023", text: "Petiva Idea Born", delay: 0 },
    { year: "2024", text: "Forum Launch & First 1,000 Users", delay: 100 },
    { year: "2025", text: "Membership Features & Vet Partnership", delay: 200 },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-gray-800">
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
          data-aos-delay="150"
        >
          A dedicated forum for all things pet care — built for passionate pet
          lovers across Bangladesh.
        </p>
      </div>

      {/* Timeline Section */}
      <div className="mb-16">
        <h2
          className="text-3xl font-bold mb-8 text-center"
          style={{ color: primaryColor }}
        >
          Our Journey
        </h2>
        <div className="relative border-l-4 border-[#E6B94D] max-w-md mx-auto pl-10">
          {timelinePoints.map(({ year, text, delay }, i) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay / 1000 + 0.3, duration: 0.6 }}
              className="mb-8 relative"
            >
              {/* Red dot */}
              <span
                className="absolute -left-7 top-2 w-5 h-5 rounded-full"
                style={{ backgroundColor: pinColor }}
              ></span>
              <p className="text-gray-700 font-semibold text-lg">
                <span
                  className="mr-2 inline-block"
                  aria-label="pin icon"
                  role="img"
                >
                  {/* SVG pin icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={pinColor}
                    viewBox="0 0 24 24"
                    stroke={pinColor}
                    className="inline-block w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                    />
                    <circle cx="12" cy="9" r="2.5" fill="white" />
                  </svg>
                </span>
                <strong className="text-primary">{year}</strong> – {text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

            {/* Additional Modern Sections */}
      <div className="grid md:grid-cols-2 gap-8 mt-12 mb-8 max-w-4xl mx-auto">
        {[
          {
            title: "Meet the Founders",
            text: "A small group of pet lovers launched Petiva to bridge the knowledge gap in local pet care. We’re proud to serve thousands across the country.",
          },
          {
            title: "Community Driven",
            text: "Petiva thrives on community support — your stories, questions, and answers help every pet owner grow together.",
          },
          {
            title: "Expert Verified",
            text: "All medical or health-related advice goes through expert review from certified veterinarians or experienced trainers.",
          },
          {
            title: "Always Improving",
            text: "We're constantly adding new features and improving performance based on your feedback — stay tuned for more.",
          },
        ].map(({ title, text }, i) => (
          <motion.div
            key={title}
            className="bg-white shadow-xl rounded-xl p-6 cursor-pointer hover:scale-[1.03] transition-transform duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 * i, duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>
              {title}
            </h3>
            <p className="text-gray-600">{text}</p>
          </motion.div>
        ))}
      </div>

      {/* About Petiva */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2
          className="text-3xl font-bold mb-4"
          style={{ color: primaryColor }}
        >
          About Us
        </h2>
        <p className="text-md leading-relaxed mb-6 max-w-3xl mx-auto">
          <strong>Petiva</strong> is more than just a website — it's a
          passionate community built for pet owners, by pet owners. Whether you
          have a dog, cat, bird, or even a reptile, we’re here to support you
          in your pet parenting journey.
        </p>

        <h3
          className="text-xl font-semibold mb-2 mt-6"
          style={{ color: primaryColor }}
        >
          Our Mission
        </h3>
        <p className="text-md leading-relaxed mb-6 max-w-3xl mx-auto">
          To empower pet owners across Bangladesh by providing a dedicated
          platform to ask questions, share experiences, and access expert
          insights.
        </p>

        <h3
          className="text-xl font-semibold mb-2 mt-6"
          style={{ color: primaryColor }}
        >
          What We Offer
        </h3>
        <ul className="list-disc list-inside mb-6 text-left md:text-center max-w-xl mx-auto">
          <li>Discussion Forums on Pet Health, Nutrition, and Grooming</li>
          <li>Expert Q&A from Vets and Professionals</li>
          <li>Membership Plans with Exclusive Benefits</li>
          <li>Community Support and Adoption Stories</li>
        </ul>

        <h3
          className="text-xl font-semibold mb-2 mt-6"
          style={{ color: primaryColor }}
        >
          Our Values
        </h3>
        <p className="text-md leading-relaxed mb-6 max-w-3xl mx-auto">
          At Petiva, we believe every pet deserves love, care, and respect. We
          promote responsible ownership, ethical adoption, and kindness toward
          all animals.
        </p>

        <h3
          className="text-xl font-semibold mb-2 mt-6"
          style={{ color: primaryColor }}
        >
          Join Our Journey
        </h3>
        <p className="text-md leading-relaxed mb-12 max-w-3xl mx-auto">
          Whether you're here to learn, share, or just browse — welcome to the
          Petiva family.
        </p>
      </motion.div>


    </div>
  );
};

export default AboutUs;
