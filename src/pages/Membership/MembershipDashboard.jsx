import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaDollarSign,
  FaFileInvoiceDollar,
  FaCloudDownloadAlt,
  FaArrowUp,
  FaBan,
  FaInfoCircle,
  FaClipboardList,
} from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'; 
import useAuth from "../../hooks/useAuth";
import Loader from "../../shared/Loader/Loader";
import { NavLink } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecureFile";

// Tailwind CSS classes for consistency
const PRIMARY_COLOR_CLASS = "text-[#4CA3B8]";
const PRIMARY_BG_COLOR_CLASS = "bg-[#4CA3B8]";
const PRIMARY_BORDER_COLOR_CLASS = "border-[#4CA3B8]";
const PRIMARY_HOVER_BG_COLOR_CLASS = "hover:bg-[#3B8E9B]";
const BUTTON_COMMON_CLASSES = `px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-300 flex items-center justify-center gap-2`;

const MembershipDashboard = () => {
  const { user } = useAuth();
  const email = user?.email;
const axiosInstance = useAxiosSecure();
  const API_BASE = import.meta.env.VITE_API_URL || "https://pet-management-platform-server-site.vercel.app";

  // Query for Membership Status
  const {
    data: membershipData,
    isPending: isMembershipPending,
    isError: isMembershipError,
    error: membershipError,
    refetch: refetchMembershipStatus, 
  } = useQuery({
    queryKey: ["membership-status", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `${API_BASE}/api/membership/status?email=${encodeURIComponent(email)}`
      );
      return res.data;
    },
  });

 
  const {
    data: paymentHistory,
    isPending: isPaymentsPending,
    isError: isPaymentsError,
    error: paymentsError,
    refetch: refetchPaymentHistory,
  } = useQuery({
    queryKey: ["payment-history", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `${API_BASE}/api/payments?email=${encodeURIComponent(email)}`
      );
      return res.data;
    },
  });

  if (!email)
    return (
      <p className="min-h-screen flex items-center justify-center text-xl text-gray-700 pt-20">
        Please log in to view your membership details.
      </p>
    );
  if (isMembershipPending || isPaymentsPending)
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader />
      </div>
    );
  if (isMembershipError) {
    console.error("Membership Error:", membershipError);
    return (
      <p className="min-h-screen flex items-center justify-center text-xl text-red-500 pt-20">
        Error loading membership status. Please try refreshing.
      </p>
    );
  }
  if (isPaymentsError) {
    console.error("Payments Error:", paymentsError);
    return (
      <p className="min-h-screen flex items-center justify-center text-xl text-red-500 pt-20">
        Error loading payment history. Please try refreshing.
      </p>
    );
  }

  const { membership, caps } = membershipData || {};
  const { plan, status, startDate, endDate, autoRenew } = membership || {};
  const fmtDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-BD", { year: 'numeric', month: 'short', day: 'numeric' }) : "N/A";
  const postLimitText = caps?.postLimit < 0 ? "Unlimited" : caps?.postLimit ?? "N/A";

  // --- Handlers for Membership Actions ---
  const handleCancelMembership = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel your membership? This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          
          Swal.fire(
            "Cancelled!",
            "Your membership has been cancelled.",
            "success"
          );
          refetchMembershipStatus(); 
        } catch (error) {
          console.error("Error cancelling membership:", error);
          Swal.fire(
            "Failed!",
            "Could not cancel membership. Please try again.",
            "error"
          );
        }
      }
    });
  };

  const handleUpgradeMembership = async () => {
    Swal.fire({
      title: "Upgrade/Change Membership",
      text: "You will be redirected to the pricing page to choose a new plan.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: PRIMARY_BG_COLOR_CLASS,
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Go to Plans",
    }).then((result) => {
      if (result.isConfirmed) {
       
        Swal.fire("Redirecting...", "", "info");
      }
    });
  };

  const handleDownloadPaymentHistory = () => {
    if (!paymentHistory || paymentHistory.length === 0) {
      Swal.fire("No History", "There is no payment history to download.", "info");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Payment History", 14, 22);

    doc.setFontSize(11);
    doc.text(`User: ${user.email}`, 14, 30);
    doc.text(`Download Date: ${new Date().toLocaleDateString("en-BD")}`, 14, 37);

    const tableColumn = ["ID", "Package Name", "Transaction ID", "Method", "Status", "Date"];
    const tableRows = [];

    paymentHistory.forEach(payment => {
      const paymentDate = new Date(payment.createdAt).toLocaleDateString("en-BD", { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      const paymentData = [
        payment._id.substring(0, 10) + '...', 
        payment.packageName,
        payment.transactionId,
        payment.method,
        payment.status,
        paymentDate,
      ];
      tableRows.push(paymentData);
    });

    
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 45,
    });

    doc.save(`Payment_History_${user.email}.pdf`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 md:p-8 min-h-screen bg-gray-50 pt-20"
    >
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
        <title>Payment History || Petiva</title>
        <h1 className={`text-3xl md:text-4xl font-bold mb-8 text-center ${PRIMARY_COLOR_CLASS}`}>
          My Membership & Payments
        </h1>

        {/* Membership Status Card */}
        <motion.div
          className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg shadow-md border border-indigo-100 mb-8"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${PRIMARY_COLOR_CLASS}`}>
            <FaUserCircle /> Membership Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-lg">
            <p className="flex items-center gap-2">
              <FaDollarSign className="text-xl text-green-600" />
              <strong>Plan:</strong> <span className="font-semibold">{plan || "Free Tier"}</span>
            </p>
            <p className="flex items-center gap-2">
              {status === "active" ? (
                <FaCheckCircle className="text-xl text-green-500" />
              ) : (
                <FaInfoCircle className="text-xl text-yellow-500" />
              )}
              <strong>Status:</strong> <span className={`font-semibold capitalize ${status === "active" ? "text-green-600" : "text-red-600"}`}>
                {status || "Inactive"}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-xl text-blue-500" />
              <strong>Start Date:</strong> <span className="font-semibold">{fmtDate(startDate)}</span>
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-xl text-red-500" />
              <strong>End Date:</strong> <span className="font-semibold">{fmtDate(endDate)}</span>
            </p>
            <p className="flex items-center gap-2">
              {autoRenew ? (
                <FaCheckCircle className="text-xl text-green-500" />
              ) : (
                <FaTimesCircle className="text-xl text-red-500" />
              )}
              <strong>Auto Renew:</strong> <span className="font-semibold">{autoRenew ? "Yes" : "No"}</span>
            </p>
            <p className="flex items-center gap-2">
              <FaClipboardList className="text-xl text-purple-500" />
              <strong>Posts Allowed:</strong> <span className="font-semibold">{postLimitText}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {status === "active" && ( // Only show cancel if active
              <button
                onClick={handleCancelMembership}
                className={`${BUTTON_COMMON_CLASSES} bg-red-600 hover:bg-red-700`}
              >
                <FaBan /> Cancel Membership
              </button>
            )}
            <NavLink to='/membership'>
              <button
                onClick={handleUpgradeMembership}
                className={`${BUTTON_COMMON_CLASSES} ${PRIMARY_BG_COLOR_CLASS} ${PRIMARY_HOVER_BG_COLOR_CLASS}`}
              >
                <FaArrowUp /> {status === "active" ? "Change Plan" : "Upgrade Membership"}
              </button>
            </NavLink>
          </div>
        </motion.div>

        {/* Payment History Section */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${PRIMARY_COLOR_CLASS}`}>
            <FaFileInvoiceDollar /> Payment History
          </h2>
          {paymentHistory && paymentHistory.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className={`bg-gray-100 text-gray-700 border-b ${PRIMARY_BORDER_COLOR_CLASS}`}>
                    <tr>
                      <th className="py-3 px-4 text-left font-semibold">ID</th>
                      <th className="py-3 px-4 text-left font-semibold">Package</th>
                      <th className="py-3 px-4 text-left font-semibold">Transaction ID</th>
                      <th className="py-3 px-4 text-left font-semibold">Method</th>
                      <th className="py-3 px-4 text-left font-semibold">Status</th>
                      <th className="py-3 px-4 text-left font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((payment) => (
                      <tr key={payment._id} className="border-b last:border-b-0 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-800 text-sm">{payment._id.substring(0, 10)}...</td>
                        <td className="py-3 px-4 text-gray-800 text-sm">{payment.packageName}</td>
                        <td className="py-3 px-4 text-gray-800 text-sm">{payment.transactionId}</td>
                        <td className="py-3 px-4 text-gray-800 text-sm">{payment.method}</td>
                        <td className="py-3 px-4 text-gray-800 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${payment.status === "success" ? "bg-green-100 text-green-800" :
                              payment.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                "bg-red-100 text-red-800"
                            }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-800 text-sm">
                          {new Date(payment.createdAt).toLocaleDateString("en-BD", { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 text-right">
                <button
                  onClick={handleDownloadPaymentHistory}
                  className={`${BUTTON_COMMON_CLASSES} ${PRIMARY_BG_COLOR_CLASS} ${PRIMARY_HOVER_BG_COLOR_CLASS}`}
                >
                  <FaCloudDownloadAlt /> Download History (PDF)
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-600">No payment history found.</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MembershipDashboard;
