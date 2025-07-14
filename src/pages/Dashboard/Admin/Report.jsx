import React, { useEffect, useState } from "react";
import axios from "axios";

const Report = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/reports"); // backend এ route ঠিক করতে হবে
      setReports(res.data);
    } catch (err) {
      console.error("Failed to fetch reports", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Report related action (delete, resolve, warn etc)
  const handleAction = (id, action) => {
    alert(`Performing ${action} on report ${id} - Implement backend logic!`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Reported Comments / Activities</h2>

      {loading ? (
        <p>Loading reports...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Reported By</th>
              <th className="border border-gray-300 px-4 py-2">Comment</th>
              <th className="border border-gray-300 px-4 py-2">Feedback</th>
              <th className="border border-gray-300 px-4 py-2">Reported At</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No reports found.
                </td>
              </tr>
            ) : (
              reports.map((r) => (
                <tr key={r._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{r.reportedBy}</td>
                  <td className="border border-gray-300 px-4 py-2">{r.commentText}</td>
                  <td className="border border-gray-300 px-4 py-2">{r.feedback}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(r.reportedAt).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleAction(r._id, "Resolve")}
                      className="bg-green-500 px-2 py-1 rounded hover:bg-green-600 text-white"
                    >
                      Resolve
                    </button>
                    <button
                      onClick={() => handleAction(r._id, "Delete")}
                      className="bg-red-600 px-2 py-1 rounded hover:bg-red-700 text-white"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleAction(r._id, "Warn")}
                      className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                    >
                      Warn
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Report;
