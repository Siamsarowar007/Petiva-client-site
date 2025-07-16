// import React from "react";
// import { useNavigate } from "react-router-dom";

// const packages = [
//   {
//     name: "Bronze",
//     price: "Free",
//     features: [
//       "Default for all registered users",
//       "Basic Access",
//       "Bronze Profile Badge",
//     ],
//     badgeColor: "#CD7F32",
//     isFree: true,
//   },
//   {
//     name: "Silver",
//     price: "৳800/month",
//     features: [
//       "20 posts per month",
//       "Silver Member Access",
//       "Verified Silver Profile Badge",
//     ],
//     badgeColor: "#C0C0C0",
//     isFree: false,
//   },
//   {
//     name: "Gold",
//     price: "৳1500/month",
//     features: [
//       "Unlimited posts",
//       "Gold Member Access",
//       "Dedicated Support Manager",
//       "Priority Post Boosting",
//       "Verified Gold Profile Badge",
//     ],
//     badgeColor: "#FFD700",
//     isFree: false,
//   },
//   {
//     name: "Platinum",
//     price: "৳2000/month",
//     features: [
//       "All Gold Features",
//       "Verified Profile Badge",
//       "Homepage Spotlight",
//       "Unlimited Pet Ads",
//     ],
//     badgeColor: "blue",
//     isFree: false,
//   },
// ];

// const MembershipPage = () => {
//   const navigate = useNavigate();

//   const handleSubscribe = (pkg) => {
//     if (!pkg.isFree) {
//       navigate(`/payment?name=${pkg.name}&price=${encodeURIComponent(pkg.price)}`);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto py-12 px-4">
//       <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
//         Choose Your Membership Plan
//       </h2>
//       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//         {packages.map((pkg, idx) => (
//           <div
//             key={idx}
//             className="flex flex-col justify-between bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 border border-gray-200"
//             style={{ minHeight: "420px" }}
//           >
//             {/* Header */}
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-xl font-bold text-gray-800">{pkg.name}</h3>
//                 <span
//                   className="px-3 py-1 text-xs rounded-full text-white font-semibold"
//                   style={{ backgroundColor: pkg.badgeColor }}
//                 >
//                   {pkg.name} Badge
//                 </span>
//               </div>
//               <p className="text-2xl font-extrabold text-indigo-700 mb-4">
//                 {pkg.price}
//               </p>
//               <ul className="text-gray-600 space-y-2 mb-6">
//                 {pkg.features.map((feature, fIdx) => (
//                   <li key={fIdx} className="flex items-center text-sm">
//                     ✅ <span className="ml-2">{feature}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             {/* Button */}
//             <div>
//               {pkg.isFree ? (
//                 <button
//                   className="w-full py-2 bg-gray-300 text-gray-700 rounded-lg cursor-not-allowed"
//                   disabled
//                 >
//                   Default Plan
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => handleSubscribe(pkg)}
//                   className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all duration-300"
//                 >
//                   Subscribe
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MembershipPage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    bg: "bg-gray-100",
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
    bg: "bg-blue-100",
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
    bg: "bg-yellow-100",
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
    badgeColor: "#E5E4E2",
    bg: "bg-purple-100",
  },
];

const MembershipPage = ({ userEmail }) => {
  const navigate = useNavigate();
  const [loadingBronze, setLoadingBronze] = useState(false);

  const handleSubscribe = async (plan) => {
    if (plan.name === "Bronze") {
      // Free plan activation API call
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
      // Redirect to Payment page with query params
      const price = plan.price.match(/\d+/g)?.join("") || ""; // extract digits only
      navigate(`/payment?plan=${plan.name}&price=${price}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-10">Choose Your Membership Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl shadow-lg p-6 flex flex-col justify-between ${plan.bg}`}
          >
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: plan.badgeColor }}>
                {plan.name} Plan
              </h2>
              <p className="text-xl font-semibold mb-4">{plan.price}</p>
              <ul className="list-disc list-inside space-y-1 mb-6 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => handleSubscribe(plan)}
              disabled={loadingBronze && plan.name === "Bronze"}
              className={`mt-auto w-full py-3 rounded-md text-white font-semibold
                ${plan.name === "Bronze" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {loadingBronze && plan.name === "Bronze" ? "Activating..." : "Subscribe Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipPage;
