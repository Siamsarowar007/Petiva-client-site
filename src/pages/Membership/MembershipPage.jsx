

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Bronze",
    price: "Free",
    features: [
      "Default for all registered users",
      "Basic Access",
      "Bronze Profile Badge",
    ],
    badgeColor: "#CD7F32",
  },
  {
    name: "Silver",
    price: "৳800/month",
    features: [
      "20 posts per month",
      "Silver Member Access",
      "Verified Silver Profile Badge",
    ],
    badgeColor: "#C0C0C0",
  },
  {
    name: "Gold",
    price: "৳1500/month",
    features: [
      "Unlimited posts",
      "Gold Member Access",
      "Dedicated Support Manager",
      "Priority Post Boosting",
      "Verified Gold Profile Badge",
    ],
    badgeColor: "#FFD700",
  },
  {
    name: "Platinum",
    price: "৳2000/month",
    features: [
      "All Gold Features",
      "Verified Profile Badge",
      "Homepage Spotlight",
      "Unlimited Pet Ads",
    ],
    badgeColor: "#2c67f2",
  },
];

const MembershipPage = ({ userEmail }) => {
  const navigate = useNavigate();
  const [loadingBronze, setLoadingBronze] = useState(false);

  const handleSubscribe = async (plan) => {
    if (plan.name === "Bronze") {
      try {
        setLoadingBronze(true);
        await axios.post(`${import.meta.env.VITE_API_URL}/api/membership/activate-bronze`, {
          email: userEmail,
        });
        alert("Bronze plan activated successfully!");
      } catch (error) {
        alert("Failed to activate Bronze plan.");
        console.error(error);
      } finally {
        setLoadingBronze(false);
      }
    } else {
      const price = plan.price.match(/\d+/g)?.join("") || "";
      navigate(`/payment?plan=${plan.name}&price=${price}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Title */}
      <motion.h1
        className="text-4xl font-extrabold text-center mb-12 text-[#4CA3B8]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Choose Your Membership Plan
      </motion.h1>

      {/* Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            className="bg-white border border-[#4CA3B8]/20 shadow-md hover:shadow-xl rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <div>
              <h2
                className="text-2xl font-bold mb-2 flex items-center gap-2"
                style={{ color: plan.badgeColor }}
              >
                {plan.name} Plan
                <span
                  className="text-xs px-2 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: plan.badgeColor,
                    color: "white",
                  }}
                >
                  {plan.name}
                </span>
              </h2>
              <p className="text-xl font-semibold mb-4 text-gray-700">
                {plan.price}
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleSubscribe(plan)}
              disabled={loadingBronze && plan.name === "Bronze"}
              className={`
                mt-6 w-full py-3 rounded-lg font-semibold text-white 
                transition-all duration-300 shadow-sm hover:shadow-md
                ${
                  plan.name === "Bronze"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-[#4CA3B8] hover:bg-[#3e8da3]"
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {loadingBronze && plan.name === "Bronze"
                ? "Activating..."
                : "Subscribe Now"}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Why Become a Member Section */}
      <motion.section
        className="mt-20 max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center text-[#4CA3B8] mb-10">
          Why Become a Member?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            {
              icon: "https://cdn-icons-png.flaticon.com/512/942/942748.png",
              title: "Boosted Visibility",
              text: "Get more reach and interactions on your posts by upgrading.",
            },
            {
              icon: "https://cdn-icons-png.flaticon.com/512/2872/2872312.png",
              title: "Verified Badge",
              text: "Show credibility and stand out with a verified badge.",
            },
            {
              icon: "https://cdn-icons-png.flaticon.com/512/950/950884.png",
              title: "Priority Support",
              text: "Get instant support from our dedicated team whenever you need.",
            },
            {
              icon: "https://cdn-icons-png.flaticon.com/512/747/747376.png",
              title: "Unlimited Access",
              text: "Remove limits and unlock all features of the platform.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white border border-[#4CA3B8]/20 shadow-sm rounded-xl p-6 hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-12 h-12 mx-auto mb-3"
              />
              <h3 className="text-lg font-semibold text-[#4CA3B8] mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default MembershipPage;

