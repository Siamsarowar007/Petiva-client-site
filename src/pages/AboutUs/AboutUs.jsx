import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { FaPaw, FaHandsHelping, FaLightbulb, FaHeartbeat, FaCertificate, FaUsers, FaPlusCircle } from "react-icons/fa"; 

const pinColor = "#E94B3C"; 
const primaryColor = "#4CA3B8";

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

 
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-gray-800">
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
          data-aos="fade-up"
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
              <span
                className="absolute -left-7 top-2 w-5 h-5 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: pinColor }}
              >
                
                <FaPaw className="text-xs" />
              </span>
              <p className="text-gray-700 font-semibold text-lg">
                <strong className="text-primary">{year}</strong> – {text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

     
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

      {/* --- NEW/IMPROVED SECTIONS START HERE --- */}

      {/* Our Mission Section */}
      <motion.section
        className="text-center py-16 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl shadow-lg mb-12"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          data-aos="fade-up" 
        >
          <FaLightbulb className="text-6xl text-[#E6B94D] mx-auto mb-4" />
          <h2 className="text-4xl font-extrabold mb-4" style={{ color: primaryColor }}>
            Our Mission
          </h2>
        </motion.div>
        <motion.p
          className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-gray-700"
          data-aos="fade-up" 
          data-aos-delay="200"
        >
          To empower pet owners across Bangladesh by providing a dedicated platform to ask questions,
          share experiences, and access expert insights, fostering a healthier and happier life for every pet.
        </motion.p>
      </motion.section>

      {/* What We Offer Section */}
      <motion.section
        className="py-16 mb-12"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          data-aos="fade-up" 
          className="text-center mb-12"
        >
          <FaPlusCircle className="text-6xl text-[#E6B94D] mx-auto mb-4" />
          <h2 className="text-4xl font-extrabold mb-8" style={{ color: primaryColor }}>
            What We Offer
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: FaUsers,
              title: "Discussion Forums",
              description: "Engage in vibrant discussions on pet health, nutrition, grooming, and more.",
            },
            {
              icon: FaCertificate,
              title: "Expert Q&A",
              description: "Get reliable advice directly from certified vets and pet care professionals.",
            },
            {
              icon: FaPaw,
              title: "Exclusive Membership",
              description: "Unlock premium content, early access, and special benefits with our plans.",
            },
            {
              icon: FaHandsHelping,
              title: "Community Support",
              description: "Connect with a compassionate network for shared experiences & adoption stories.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-center border-b-4 border-[#4CA3B8] hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
              variants={itemVariants}
              data-aos="fade-up" 
              data-aos-delay={100 * index}
            >
              <item.icon className="text-5xl text-[#E6B94D] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      
      <motion.section
        className="text-center py-16 bg-gradient-to-l from-pink-50 to-red-50 rounded-xl shadow-lg mb-12"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          data-aos="fade-up" 
        >
          <FaHeartbeat className="text-6xl text-red-500 mx-auto mb-4" />
          <h2 className="text-4xl font-extrabold mb-4" style={{ color: primaryColor }}>
            Our Core Values
          </h2>
        </motion.div>
        <motion.p
          className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-gray-700"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          At Petiva, we believe every pet deserves love, care, and respect. We passionately
          promote responsible ownership, ethical adoption practices, and kindness toward all animals.
          Our community stands for empathy, knowledge sharing, and a shared commitment to pet welfare.
        </motion.p>
      </motion.section>

     
      <motion.section
        className="text-center py-16 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl shadow-lg"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          data-aos="fade-up"
        >
          <FaPaw className="text-6xl text-[#E6B94D] mx-auto mb-4 animate-bounce-slow" /> 
          <h2 className="text-4xl font-extrabold mb-4" style={{ color: primaryColor }}>
            Join Our Petiva Family
          </h2>
        </motion.div>
        <motion.p
          className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-gray-700 mb-8"
          data-aos="fade-up" 
          data-aos-delay="200"
        >
          Whether you're here to learn, share your wisdom, seek advice, or simply browse heartwarming
          pet stories – you are warmly welcome. Let's make a difference in pets' lives together!
        </motion.p>
        <motion.button
          className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold
                     rounded-full shadow-lg text-white bg-[#4CA3B8]
                     hover:bg-[#3B8E9B] hover:scale-105 transition-all duration-300
                     focus:outline-none focus:ring-4 focus:ring-[#4CA3B8]/50"
          data-aos="zoom-in" 
          data-aos-delay="400"
        >
          Become a Member Today!
        </motion.button>
      </motion.section>

     
      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite ease-in-out;
        }
      `}</style>

    </div>
  );
};

export default AboutUs;