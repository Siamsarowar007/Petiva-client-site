// import React from "react";
// import useSWR from "swr";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";

// const API_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:5000").replace(/\/$/, "");

// const fetcher = (url) => axios.get(url).then((r) => r.data);

// const MembershipDashboard = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const email = user?.email;

//   const { data, error, isLoading, mutate } = useSWR(
//     email ? `${API_URL}/api/membership/status?email=${encodeURIComponent(email)}` : null,
//     fetcher
//   );

//   if (!email) return <p className="text-center mt-10">Please log in.</p>;
//   if (isLoading) return <p className="text-center mt-10">Loading membership...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500">Failed to load membership.</p>;

//   const { membership, caps } = data;
//   const { plan, status, startDate, endDate } = membership;

//   const handleUpgrade = () => navigate("/membership"); 

//   const handleCancel = async () => {
//     const choice = await Swal.fire({
//       title: "Cancel Membership?",
//       text: "Do you want to downgrade immediately or at period end?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Immediate Downgrade",
//       cancelButtonText: "Cancel",
//       showDenyButton: true,
//       denyButtonText: "End of Period",
//     });

//     if (choice.isDenied) {
//       await axios.patch(`${API_URL}/api/membership/cancel`, {
//         email,
//         mode: "period_end",
//       });
//       Swal.fire("Scheduled", "Membership will cancel at period end.", "info");
//       mutate();
//       return;
//     }

//     if (choice.isConfirmed) {
//       await axios.patch(`${API_URL}/api/membership/cancel`, {
//         email,
//         mode: "immediate",
//       });
//       Swal.fire("Cancelled", "Downgraded to Bronze.", "success");
//       mutate();
//     }
//   };

//   const fmt = (d) => (d ? new Date(d).toLocaleDateString() : "—");
//   const postLimitText = caps.postLimit < 0 ? "Unlimited" : caps.postLimit;

//   return (
//     <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded shadow">
//       <h1 className="text-3xl font-bold mb-6 text-center">My Membership</h1>

//       <div className="space-y-2 text-center">
//         <p><strong>Plan:</strong> {plan}</p>
//         <p><strong>Status:</strong> {status}</p>
//         <p><strong>Start:</strong> {fmt(startDate)}</p>
//         <p><strong>End:</strong> {fmt(endDate)}</p>
//         <p><strong>Posts Allowed:</strong> {postLimitText}</p>
//         {caps.canBoost && <p>✅ Priority Post Boosting</p>}
//         {caps.dedicatedSupport && <p>✅ Dedicated Support</p>}
//         {caps.spotlight && <p>✅ Homepage Spotlight</p>}
//       </div>

//       <div className="mt-8 flex gap-4 justify-center">
//         <button
//           onClick={handleUpgrade}
//           className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
//         >
//           Change / Upgrade Plan
//         </button>

//         {plan !== "Bronze" && (
//           <button
//             onClick={handleCancel}
//             className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
//           >
//             Cancel Plan
//           </button>
//         )}
//       </div>
//     </div>

//   );
// };

// export default MembershipDashboard;

import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";          // <-- পথ ঠিক করো
import useAxiosSecure from "../../hooks/useAxiosSecure"; // <-- পথ ঠিক করো

const MembershipDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const email = user?.email;

  // React Query fetch
  const {
    data,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["membership-status", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/membership/status?email=${encodeURIComponent(email)}`
      );
      return res.data;
    },
  });

  if (!email) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow text-center">
        <p className="text-red-500 font-semibold">দয়া করে লগইন করুন।</p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow text-center">
        Loading membership...
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow text-center">
        <p className="text-red-500">Membership লোড করতে সমস্যা হয়েছে।</p>
      </div>
    );
  }

  // API data structure:
  // { membership: {plan, status, startDate, endDate, autoRenew}, caps: {...} }
  const { membership, caps } = data || {};
  const plan = membership?.plan ?? "Bronze";
  const status = membership?.status ?? "active";
  const startDate = membership?.startDate;
  const endDate = membership?.endDate;
  const autoRenew = membership?.autoRenew;

  const fmt = (d) => (d ? new Date(d).toLocaleDateString() : "—");
  const postLimitText =
    caps?.postLimit != null
      ? caps.postLimit < 0
        ? "Unlimited"
        : caps.postLimit
      : "—";

  // Cancel handler
  const handleCancel = async () => {
    // যদি Bronze, কিছু করার দরকার নেই
    if (plan === "Bronze") {
      Swal.fire("Info", "আপনি ইতিমধ্যেই Bronze প্ল্যানে আছেন।", "info");
      return;
    }

    const action = await Swal.fire({
      title: "মেম্বারশিপ বাতিল করবেন?",
      text: "তুমি কি এখনই Bronze-এ নেমে যেতে চাও, নাকি মেয়াদ শেষে?",
      icon: "warning",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "এখনই ডাউনগ্রেড",
      denyButtonText: "মেয়াদ শেষে বাতিল",
      cancelButtonText: "বন্ধ করুন",
    });

    try {
      if (action.isDenied) {
        await axiosSecure.patch("/api/membership/cancel", {
          email,
          mode: "period_end",
        });
        Swal.fire("Scheduled", "মেয়াদ শেষে বাতিল হবে।", "info");
      } else if (action.isConfirmed) {
        await axiosSecure.patch("/api/membership/cancel", {
          email,
          mode: "immediate",
        });
        Swal.fire("Done", "Bronze প্ল্যানে ডাউনগ্রেড সম্পন্ন।", "success");
      }
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "বাতিল করতে সমস্যা হয়েছে।", "error");
    }
  };

  // Upgrade handler
  const handleUpgrade = () => navigate("/membership");

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">আমার মেম্বারশিপ</h1>

      <div className="space-y-2 text-center">
        <p>
          <strong>Plan:</strong> {plan}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Start:</strong> {fmt(startDate)}
        </p>
        <p>
          <strong>End:</strong> {fmt(endDate)}
        </p>
        <p>
          <strong>Auto Renew:</strong> {autoRenew ? "Yes" : "No"}
        </p>
        <p>
          <strong>Posts Allowed:</strong> {postLimitText}
        </p>
        {caps?.canBoost && <p>✅ Priority Post Boosting</p>}
        {caps?.dedicatedSupport && <p>✅ Dedicated Support</p>}
        {caps?.spotlight && <p>✅ Homepage Spotlight</p>}
      </div>

      <div className="mt-8 flex gap-4 justify-center flex-wrap">
        <button
          onClick={handleUpgrade}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          প্ল্যান পরিবর্তন / আপগ্রেড
        </button>

        {plan !== "Bronze" && (
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            প্ল্যান বাতিল
          </button>
        )}
      </div>
    </div>
  );
};

export default MembershipDashboard;
