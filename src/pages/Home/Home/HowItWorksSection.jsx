import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaEdit, FaThumbsUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext'; 

const steps = [
  {
    icon: FaUserPlus,
    title: "1. Join Our Community",
    description: "Create an account in minutes to unlock all features. It's free and easy!",
    color: "text-blue-500", 
  },
  {
    icon: FaEdit,
    title: "2. Create or Engage",
    description: "Start new discussions, ask questions, or share your pet stories. Comment on posts you love!",
    color: "text-green-500", 
  },
  {
    icon: FaThumbsUp,
    title: "3. Connect & Grow",
    description: "Upvote helpful content, get answers, and build connections with fellow pet lovers.",
    color: "text-purple-500",
  },
];

const HowItWorksSection = () => {
 
  const { user } = useContext(AuthContext); 
 

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } },
  };

 
  const buttonText = user ? "Explore Membership Plans" : "Join Our Pet Community Today!";
  const buttonLink = user ? "/membership" : "/join-us?type=login"; 

  return (
    <div className="max-w-7xl mx-auto py-16 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg mb-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-4xl font-extrabold text-[#4CA3B8] text-center mb-12 tracking-tight"
      >
        How It Works
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 justify-items-center"
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 w-full max-w-sm"
          >
            <div className={`p-4 rounded-full ${step.color} bg-opacity-10 mb-6 text-5xl`}>
              <step.icon />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 leading-snug">{step.title}</h3>
            <p className="text-gray-600 text-base leading-relaxed mb-6">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-16 text-center"
      >
        <Link
          to={buttonLink}
          className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold
                     rounded-full shadow-lg text-white bg-[#4CA3B8]
                     hover:bg-[#3B8E9B] hover:scale-105 transition-all duration-300
                     focus:outline-none focus:ring-4 focus:ring-[#4CA3B8]/50"
        >
          {buttonText} 
        </Link>
      </motion.div>
    </div>
  );
};

export default HowItWorksSection;