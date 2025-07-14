import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentManage = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // কমেন্ট লোড করা
  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:5000/comments/all");
      // Debug: console.log করে ডাটা দেখো
      console.log("Comments data from API:", res.data);

      // যদি ডাটা একটা array হয়, সেটি set করো, নাহলে empty array দাও
      if (Array.isArray(res.data)) {
        setComments(res.data);
      } else {
        setComments([]);
        setError("Invalid data format received from server");
      }
    } catch (err) {
      console.error("Failed to fetch comments", err);
      setError("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Delete comment
  const deleteComment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await axios.delete(`http://localhost:5000/comments/${id}`);
      fetchComments();
    } catch (err) {
      alert("Failed to delete comment");
    }
  };

  // Placeholder for warn/block actions
  const handleAction = (id, action) => {
    alert(`Performing ${action} on comment ${id} - Backend logic to implement.`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Comments</h2>

      {loading && <p>Loading comments...</p>}
      {error && (
        <p className="text-red-600 font-semibold mb-4">{error}</p>
      )}

      {!loading && !error && (
        <table className="w-full border-collapse border border-gray-300 table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">User Name</th>
              <th className="border border-gray-300 px-4 py-2">Comment</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Feedback</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No comments found.
                </td>
              </tr>
            ) : (
              comments.map((c) => (
                <tr key={c._id || c.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{c.authorName || c.authorEmail || "Unknown"}</td>
                  <td className="border border-gray-300 px-4 py-2">{c.text || "No comment text"}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {c.createdAt ? new Date(c.createdAt).toLocaleString() : "No date"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{c.feedback || "—"}</td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleAction(c._id, "Warn")}
                      className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                    >
                      Warn
                    </button>
                    <button
                      onClick={() => deleteComment(c._id)}
                      className="bg-red-600 px-2 py-1 rounded text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleAction(c._id, "Block")}
                      className="bg-gray-600 px-2 py-1 rounded text-white hover:bg-gray-700"
                    >
                      Block
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

export default CommentManage;
