// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../hooks/useAxiosSecureFile";


// const PRIMARY = "#4CA3B8";
// const TABLE_HEAD_BG = "#F0FAFC";
// const TABLE_BORDER = "#E2E8F0";

// const AdminReportedComments = () => {
//   const [reports, setReports] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const reportsPerPage = 10;
//   const axiosInstance = useAxiosSecure();

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const fetchReports = async () => {
//     try {
//       const res = await axiosInstance.get("/reports");
//       setReports(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch reports", err);
//       Swal.fire("Error", "Failed to retrieve reports.", "error");
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await axiosInstance.delete(`/comments/${commentId}`);
//       Swal.fire("Deleted", "Comment has been deleted successfully.", "success");
//       fetchReports();
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Failed to delete the comment.", "error");
//     }
//   };

//   const handleBanUser = async (email) => {
//     try {
//       await axiosInstance.patch(`/users/ban-by-email/${email}`);
//       Swal.fire("User Banned", `${email} has been banned.`, "warning");
//       fetchReports();
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Failed to ban the user.", "error");
//     }
//   };

//   const handleIgnoreReport = async (reportId) => {
//     try {
//       await axiosInstance.delete(`/reports/${reportId}`);
//       Swal.fire("Ignored", "Report has been ignored and removed.", "success");
//       fetchReports();
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Failed to ignore the report.", "error");
//     }
//   };

//   // pagination calc
//   const indexOfLastReport = currentPage * reportsPerPage;
//   const indexOfFirstReport = indexOfLastReport - reportsPerPage;
//   const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);
//   const totalPages = Math.ceil(reports.length / reportsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // small util: truncate for table cell
//   const truncate = (txt = "", len = 40) =>
//     txt.length > len ? txt.slice(0, len) + "…" : txt;

//   return (
//     <div className="max-w-6xl mx-auto mt-20 px-4">
//       <title>Admin Reported Comments || Petiva</title>
//       <h2 className="text-3xl font-bold mb-6" style={{ color: PRIMARY }}>
//         Reported Comments
//       </h2>

//       {reports.length === 0 ? (
//         <p className="text-gray-500">No reports found.</p>
//       ) : (
//         <>
//           <div className="overflow-x-auto">
//             <table
//               className="table w-full border text-sm"
//               style={{ borderColor: TABLE_BORDER }}
//             >
//               <thead>
//                 <tr style={{ backgroundColor: TABLE_HEAD_BG }}>
//                   <th className="border px-4 py-2 text-center" style={{ borderColor: TABLE_BORDER }}>
//                     #
//                   </th>
//                   <th className="border px-4 py-2 text-left" style={{ borderColor: TABLE_BORDER }}>
//                     Comment
//                   </th>
//                   <th className="border px-4 py-2 text-left" style={{ borderColor: TABLE_BORDER }}>
//                     Commenter Email
//                   </th>
//                   <th className="border px-4 py-2 text-left" style={{ borderColor: TABLE_BORDER }}>
//                     Reporter Email
//                   </th>
//                   <th className="border px-4 py-2 text-left" style={{ borderColor: TABLE_BORDER }}>
//                     Reason
//                   </th>
//                   <th className="border px-4 py-2 text-center" style={{ borderColor: TABLE_BORDER }}>
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentReports.map((report, index) => (
//                   <tr
//                     key={report._id}
//                     className="hover:bg-gray-50 transition-colors"
//                   >
//                     <td
//                       className="border px-4 py-2 text-center font-medium"
//                       style={{ borderColor: TABLE_BORDER }}
//                     >
//                       {(currentPage - 1) * reportsPerPage + index + 1}
//                     </td>
//                     <td
//                       className="border px-4 py-2 max-w-[220px]"
//                       style={{ borderColor: TABLE_BORDER }}
//                       title={report.commentText}
//                     >
//                       {truncate(report.commentText, 60)}
//                     </td>
//                     <td
//                       className="border px-4 py-2 break-all"
//                       style={{ borderColor: TABLE_BORDER }}
//                       title={report.commenterEmail}
//                     >
//                       {report.commenterEmail}
//                     </td>
//                     <td
//                       className="border px-4 py-2 break-all"
//                       style={{ borderColor: TABLE_BORDER }}
//                       title={report.reporterEmail}
//                     >
//                       {report.reporterEmail}
//                     </td>
//                     <td
//                       className="border px-4 py-2 max-w-[200px]"
//                       style={{ borderColor: TABLE_BORDER }}
//                       title={report.reason}
//                     >
//                       {truncate(report.reason, 40)}
//                     </td>
//                     <td
//                       className="border px-4 py-2"
//                       style={{ borderColor: TABLE_BORDER }}
//                     >
//                       <div className="flex flex-wrap gap-1 justify-center">
//                         <button
//                           className="px-2 py-1 text-xs rounded font-semibold text-white bg-red-500 hover:bg-red-600 transition"
//                           onClick={() => handleDeleteComment(report.commentId)}
//                         >
//                           Delete
//                         </button>
//                         <button
//                           className="px-2 py-1 text-xs rounded font-semibold text-white bg-yellow-500 hover:bg-yellow-600 transition"
//                           onClick={() => handleBanUser(report.commenterEmail)}
//                         >
//                           Ban
//                         </button>
//                         <button
//                           className="px-2 py-1 text-xs rounded font-semibold text-white"
//                           style={{ backgroundColor: PRIMARY }}
//                           onClick={() => handleIgnoreReport(report._id)}
//                         >
//                           Ignore
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {reports.length > reportsPerPage && (
//             <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto px-4 py-10 gap-3">
//               <p className="text-sm text-gray-500 text-center sm:text-left">
//                 Showing {currentReports.length} of {reports.length} reports
//               </p>
//               <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
//                 <button
//                   disabled={currentPage === 1}
//                   onClick={() => paginate(currentPage - 1)}
//                   className="text-sm px-4 py-2 rounded border bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                   style={{ borderColor: PRIMARY }}
//                 >
//                   « Previous
//                 </button>
//                 {[...Array(totalPages).keys()].map((num) => (
//                   <button
//                     key={num}
//                     onClick={() => paginate(num + 1)}
//                     className={`px-3 py-2 rounded text-sm border ${
//                       currentPage === num + 1
//                         ? "text-white"
//                         : "bg-white text-gray-700 hover:bg-gray-100"
//                     }`}
//                     style={{
//                       borderColor: PRIMARY,
//                       backgroundColor:
//                         currentPage === num + 1 ? PRIMARY : undefined,
//                     }}
//                   >
//                     {num + 1}
//                   </button>
//                 ))}
//                 <button
//                   disabled={currentPage === totalPages}
//                   onClick={() => paginate(currentPage + 1)}
//                   className="text-sm px-4 py-2 rounded border bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                   style={{ borderColor: PRIMARY }}
//                 >
//                   Next »
//                 </button>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default AdminReportedComments;




import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecureFile";
import Loader from "../../../shared/Loader/Loader";


const PRIMARY = "#4CA3B8";
const TABLE_HEAD_BG = "#F0FAFC";
const TABLE_BORDER = "#E2E8F0";

const AdminReportedComments = () => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false); 
  const reportsPerPage = 10;
  const axiosInstance = useAxiosSecure();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true); 
      const res = await axiosInstance.get("/reports");
      setReports(res.data || []);
      setLoading(false); 
    } catch (err) {
      console.error("Failed to fetch reports", err);
      setLoading(false);
      Swal.fire("Error", "Failed to retrieve reports.", "error");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axiosInstance.delete(`/comments/${commentId}`);
      Swal.fire("Deleted", "Comment has been deleted successfully.", "success");
      fetchReports();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete the comment.", "error");
    }
  };

  const handleBanUser = async (email) => {
    try {
      await axiosInstance.patch(`/users/ban-by-email/${email}`);
      Swal.fire("User Banned", `${email} has been banned.`, "warning");
      fetchReports();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to ban the user.", "error");
    }
  };

  const handleIgnoreReport = async (reportId) => {
    try {
      await axiosInstance.delete(`/reports/${reportId}`);
      Swal.fire("Ignored", "Report has been ignored and removed.", "success");
      fetchReports();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to ignore the report.", "error");
    }
  };

  // pagination calc
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(reports.length / reportsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const truncate = (txt = "", len = 40) =>
    txt.length > len ? txt.slice(0, len) + "…" : txt;


  if (loading) {
    return <Loader size="lg" />;
  }

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4">
      <title>Admin Reported Comments || Petiva</title>
      <h2 className="text-3xl font-bold mb-6" style={{ color: PRIMARY }}>
        Reported Comments
      </h2>

      {reports.length === 0 ? (
        <p className="text-gray-500">No reports found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table
              className="table w-full border text-sm"
              style={{ borderColor: TABLE_BORDER }}
            >
              <thead>
                <tr style={{ backgroundColor: TABLE_HEAD_BG }}>
                  <th className="border px-4 py-2 text-center" style={{ borderColor: TABLE_BORDER }}>
                    #
                  </th>
                  <th className="border px-4 py-2 text-left" style={{ borderColor: TABLE_BORDER }}>
                    Comment
                  </th>
                  <th className="border px-4 py-2 text-left" style={{ borderColor: TABLE_BORDER }}>
                    Commenter Email
                  </th>
                  <th className="border px-4 py-2 text-left" style={{ borderColor: TABLE_BORDER }}>
                    Reporter Email
                  </th>
                  <th className="border px-4 py-2 text-left" style={{ borderColor: TABLE_BORDER }}>
                    Reason
                  </th>
                  <th className="border px-4 py-2 text-center" style={{ borderColor: TABLE_BORDER }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentReports.map((report, index) => (
                  <tr key={report._id} className="hover:bg-gray-50 transition-colors">
                    <td className="border px-4 py-2 text-center font-medium" style={{ borderColor: TABLE_BORDER }}>
                      {(currentPage - 1) * reportsPerPage + index + 1}
                    </td>
                    <td className="border px-4 py-2 max-w-[220px]" style={{ borderColor: TABLE_BORDER }} title={report.commentText}>
                      {truncate(report.commentText, 60)}
                    </td>
                    <td className="border px-4 py-2 break-all" style={{ borderColor: TABLE_BORDER }} title={report.commenterEmail}>
                      {report.commenterEmail}
                    </td>
                    <td className="border px-4 py-2 break-all" style={{ borderColor: TABLE_BORDER }} title={report.reporterEmail}>
                      {report.reporterEmail}
                    </td>
                    <td className="border px-4 py-2 max-w-[200px]" style={{ borderColor: TABLE_BORDER }} title={report.reason}>
                      {truncate(report.reason, 40)}
                    </td>
                    <td className="border px-4 py-2" style={{ borderColor: TABLE_BORDER }}>
                      <div className="flex flex-wrap gap-1 justify-center">
                        <button
                          className="px-2 py-1 text-xs rounded font-semibold text-white bg-red-500 hover:bg-red-600 transition"
                          onClick={() => handleDeleteComment(report.commentId)}
                        >
                          Delete
                        </button>
                        <button
                          className="px-2 py-1 text-xs rounded font-semibold text-white bg-yellow-500 hover:bg-yellow-600 transition"
                          onClick={() => handleBanUser(report.commenterEmail)}
                        >
                          Ban
                        </button>
                        <button
                          className="px-2 py-1 text-xs rounded font-semibold text-white"
                          style={{ backgroundColor: PRIMARY }}
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
          </div>

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
                  className="text-sm px-4 py-2 rounded border bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ borderColor: PRIMARY }}
                >
                  « Previous
                </button>
                {[...Array(totalPages).keys()].map((num) => (
                  <button
                    key={num}
                    onClick={() => paginate(num + 1)}
                    className={`px-3 py-2 rounded text-sm border ${
                      currentPage === num + 1 ? "text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                    style={{
                      borderColor: PRIMARY,
                      backgroundColor: currentPage === num + 1 ? PRIMARY : undefined,
                    }}
                  >
                    {num + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => paginate(currentPage + 1)}
                  className="text-sm px-4 py-2 rounded border bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ borderColor: PRIMARY }}
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
