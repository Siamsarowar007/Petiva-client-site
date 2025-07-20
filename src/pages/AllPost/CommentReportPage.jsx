import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const feedbackOptions = [
  "Contains obscene language",
  "Off-topic comment",
  "Hate speech or abusive content",
  "Spam or promotional content",
  "Harassment or bullying",
  "False or misleading information",
  "Plagiarized content",
  "Personal attack",
  "Privacy violation (shared personal info)",
  "Inciting violence or self-harm"
];

const CommentReportPage = () => {
  const { postId } = useParams();
  const axios = useAxios();
  const { user } = useAuth();

  const [comments, setComments] = useState([]);
  const [selectedFeedbacks, setSelectedFeedbacks] = useState({});
  const [reportedIds, setReportedIds] = useState([]);
  const [modalComment, setModalComment] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${postId}`);
        setComments(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load comments.", "error");
      }
    };
    fetchComments();
  }, [postId]);

  const handleReport = async (comment) => {
    const feedback = selectedFeedbacks[comment._id];
    if (!feedback) {
      return Swal.fire("Warning", "Please select a feedback reason first.", "warning");
    }

    try {
      await axios.post("/comments/report", {
        commentId: comment._id,
        commentText: comment.text,
        commenterEmail: comment.authorEmail,
        reporterEmail: user.email,
        reason: feedback,
      });

      setReportedIds((prev) => [...prev, comment._id]);
      Swal.fire("Reported", "Comment has been reported successfully.", "success");
    } catch (err) {
      console.error("Report failed", err.response?.data || err.message);
      Swal.fire("Error", "Failed to report the comment.", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-20">
      <title>Report Comment || Petiva</title>
      <h2 className="text-2xl font-bold mb-4">All Comments on this Post</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Comment</th>
            <th className="border px-4 py-2">Feedback</th>
            <th className="border px-4 py-2">Report</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment._id}>
              <td className="border px-4 py-2">{comment.authorEmail}</td>
              <td className="border px-4 py-2">
                {comment.text?.length > 20 ? (
                  <>
                    {comment.text.slice(0, 20)}...{" "}
                    <button
                      onClick={() => setModalComment(comment.text)}
                      className="text-blue-500 text-sm"
                    >
                      Read More
                    </button>
                  </>
                ) : (
                  comment.text
                )}
              </td>
              <td className="border px-4 py-2">
                <select
                  className="select select-bordered select-sm"
                  onChange={(e) =>
                    setSelectedFeedbacks({
                      ...selectedFeedbacks,
                      [comment._id]: e.target.value,
                    })
                  }
                  defaultValue=""
                >
                  <option disabled value="">
                    Give Feedback
                  </option>
                  {feedbackOptions.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border px-4 py-2">
                <button
                  className={`btn btn-xs ${
                    reportedIds.includes(comment._id) ? "btn-neutral" : "btn-error"
                  }`}
                  onClick={() => handleReport(comment)}
                  disabled={reportedIds.includes(comment._id)}
                >
                  {reportedIds.includes(comment._id) ? "Reported" : "Report"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalComment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-2">Full Comment</h3>
            <p className="text-gray-800 max-h-64 overflow-y-auto">{modalComment}</p>
            <button
              className="mt-4 btn btn-sm btn-secondary"
              onClick={() => setModalComment(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentReportPage;
