// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const AdminReportedComments = () => {
//   const axiosSecure = useAxiosSecure();
//   const [reports, setReports] = useState([]);

//   // রিপোর্টগুলো ফেচ করার ফাংশন
//   const fetchReports = async () => {
//     try {
//       const res = await axiosSecure.get("/reports");
//       setReports(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch reports", err);
//       Swal.fire("Error", "Failed to retrieve reports.", "error");
//     }
//   };

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   // কমেন্ট ডিলিট করার ফাংশন
//   const handleDeleteComment = async (commentId) => {
//     try {
//       await axiosSecure.delete(`/comments/${commentId}`);
//       Swal.fire("Deleted", "Comment has been deleted successfully.", "success");
//       fetchReports();
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Failed to delete the comment.", "error");
//     }
//   };

//   // ইউজার ব্যান করার ফাংশন (ইমেইল দিয়ে)
//   const handleBanUser = async (email) => {
//     try {
//       await axiosSecure.patch(`/users/ban-by-email/${email}`);
//       Swal.fire("User Banned", `${email} has been banned.`, "warning");
//       fetchReports();
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Failed to ban the user.", "error");
//     }
//   };

//   // রিপোর্ট ইগনোর (ডিলিট) করার ফাংশন
//   const handleIgnoreReport = async (reportId) => {
//     try {
//       await axiosSecure.delete(`/reports/${reportId}`);
//       Swal.fire("Ignored", "Report has been ignored and removed.", "success");
//       fetchReports();
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Failed to ignore the report.", "error");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto mt-20 px-4">
//       <h2 className="text-2xl font-bold mb-4">Reported Comments</h2>

//       {reports.length === 0 ? (
//         <p>No reports found.</p>
//       ) : (
//         <table className="table w-full border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-4 py-2">Comment</th>
//               <th className="border px-4 py-2">Commenter Email</th>
//               <th className="border px-4 py-2">Reporter Email</th>
//               <th className="border px-4 py-2">Reason</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reports.map((report) => (
//               <tr key={report._id}>
//                 <td className="border px-4 py-2">{report.commentText}</td>
//                 <td className="border px-4 py-2">{report.commenterEmail}</td>
//                 <td className="border px-4 py-2">{report.reporterEmail}</td>
//                 <td className="border px-4 py-2">{report.reason}</td>
//                 <td className="border px-4 py-2 flex flex-col gap-1">
//                   <button
//                     className="btn btn-xs btn-error"
//                     onClick={() => handleDeleteComment(report.commentId)}
//                   >
//                     Delete Comment
//                   </button>
//                   <button
//                     className="btn btn-xs btn-warning"
//                     onClick={() => handleBanUser(report.commenterEmail)}
//                   >
//                     Ban User
//                   </button>
//                   <button
//                     className="btn btn-xs btn-secondary"
//                     onClick={() => handleIgnoreReport(report._id)}
//                   >
//                     Ignore Report
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminReportedComments;



import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminReportedComments = () => {
  const axiosSecure = useAxiosSecure();
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axiosSecure.get("/reports");
      setReports(res.data || []);
    } catch (err) {
      console.error("Failed to fetch reports", err);
      Swal.fire("Error", "Failed to retrieve reports.", "error");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axiosSecure.delete(`/comments/${commentId}`);
      Swal.fire("Deleted", "Comment has been deleted successfully.", "success");
      fetchReports();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete the comment.", "error");
    }
  };

  const handleBanUser = async (email) => {
    try {
      await axiosSecure.patch(`/users/ban-by-email/${email}`);
      Swal.fire("User Banned", `${email} has been banned.`, "warning");
      fetchReports();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to ban the user.", "error");
    }
  };

  const handleIgnoreReport = async (reportId) => {
    try {
      await axiosSecure.delete(`/reports/${reportId}`);
      Swal.fire("Ignored", "Report has been ignored and removed.", "success");
      fetchReports();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to ignore the report.", "error");
    }
  };

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(reports.length / reportsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4">
      <h2 className="text-2xl font-bold mb-4">Reported Comments</h2>

      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <>
          <table className="table w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Comment</th>
                <th className="border px-4 py-2">Commenter Email</th>
                <th className="border px-4 py-2">Reporter Email</th>
                <th className="border px-4 py-2">Reason</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentReports.map((report, index) => (
                <tr key={report._id}>
                  <td className="border px-4 py-2 text-center">
                    {(currentPage - 1) * reportsPerPage + index + 1}
                  </td>
                  <td className="border px-4 py-2">{report.commentText}</td>
                  <td className="border px-4 py-2">{report.commenterEmail}</td>
                  <td className="border px-4 py-2">{report.reporterEmail}</td>
                  <td className="border px-4 py-2">{report.reason}</td>
                  <td className="border px-4 py-2">
                    <div className="flex flex-wrap gap-1">
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleDeleteComment(report.commentId)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-xs btn-warning"
                        onClick={() => handleBanUser(report.commenterEmail)}
                      >
                        Ban
                      </button>
                      <button
                        className="btn btn-xs btn-secondary"
                        onClick={() => handleIgnoreReport(report._id)}
                      >
                        Ignore
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {reports.length > reportsPerPage && (
            <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto px-4 py-10 gap-3">
              <p className="text-sm text-gray-500 text-center sm:text-left">
                Showing {currentReports.length} of {reports.length} reports
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <button
                  disabled={currentPage === 1}
                  onClick={() => paginate(currentPage - 1)}
                  className="text-sm px-4 py-2 rounded border bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  « Previous
                </button>
                {[...Array(totalPages).keys()].map((num) => (
                  <button
                    key={num}
                    onClick={() => paginate(num + 1)}
                    className={`px-3 py-2 rounded text-sm border ${
                      currentPage === num + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {num + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => paginate(currentPage + 1)}
                  className="text-sm px-4 py-2 rounded border bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  Next »
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminReportedComments;
