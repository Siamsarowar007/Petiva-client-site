import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router";

const Membership = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);

  // ধরো user object এ মেম্বারশিপ স্ট্যাটাস আছে (অথবা অন্য জায়গা থেকে আনতে হবে)
  useEffect(() => {
    if (!user) {
      navigate("/join-us"); // লগইন না থাকলে join-us রাউটে নিয়ে যাবে
    } else {
      // Example: user.isMember দিয়ে চেক করছি
      // তুমি API কল করে স্ট্যাটাস আনতে পারো এখানে
      setIsMember(user.isMember || false);
      setLoading(false);
    }
  }, [user, navigate]);

  const handlePayment = () => {
    // এখানে তুমি payment গেটওয়ে লজিক যোগ করবে
    // পেমেন্ট সফল হলে মেম্বারশিপ আপডেট করবে
    alert("Payment successful! You are now a member.");
    setIsMember(true);

    // এখানে চাইলে তোমার backend API কল করে ইউজার মেম্বারশিপ আপডেট করো
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Become a Member</h1>

      {isMember ? (
        <div className="text-center space-y-4">
          <p className="text-green-600 font-semibold text-xl">
            🎉 You are a Gold Member!
          </p>
          <p>
            You have a <span className="font-bold">Gold Badge</span> and can post more than 5 posts.
          </p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-lg text-center">
            To become a member, please pay <span className="font-bold text-orange-500">N taka/dollar</span>.
          </p>
          <div className="text-center">
            <button
              onClick={handlePayment}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md"
            >
              Pay Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Membership;
