
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";

const feedbackOptions = [
  "This comment is offensive",
  "This comment is misleading",
  "This comment violates rules",
];

const CommentsPage = () => {
  const { postId } = useParams();
  const axios = useAxios();
  const [comments, setComments] = useState([]);
  const [selectedFeedbacks, setSelectedFeedbacks] = useState({});
  const [reportedComments, setReportedComments] = useState([]);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    axios.get(`/comments/${postId}`).then((res) => setComments(res.data));
  }, [axios, postId]);

  const handleFeedbackChange = (commentId, feedback) => {
    setSelectedFeedbacks((prev) => ({ ...prev, [commentId]: feedback }));
  };

  const handleReport = async (comment) => {
    try {
      await axios.post(`/report`, {
        commentId: comment._id,
        feedback: selectedFeedbacks[comment._id],
      });
      Swal.fire("Reported!", "The comment has been reported.", "success");
      setReportedComments((prev) => [...prev, comment._id]);
    } catch (err) {
      Swal.fire("Error", "Failed to report comment.", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Comments on Post</h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Comment</th>
              <th>Feedback</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => {
              const shortComment =
                comment.text.length > 20
                  ? comment.text.slice(0, 20) + "..."
                  : comment.text;
              const isReported = reportedComments.includes(comment._id);
              const selectedFeedback = selectedFeedbacks[comment._id] || "";

              return (
                <tr key={comment._id}>
                  <td>{comment.email}</td>
                  <td>
                    {shortComment}
                    {comment.text.length > 20 && (
                      <>
                        {" "}
                        <button
                          className="text-blue-600 underline"
                          onClick={() => setActiveModal(comment._id)}
                        >
                          Read More
                        </button>

                        {/* Modal */}
                        {activeModal === comment._id && (
                          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow max-w-md w-full relative">
                              <button
                                className="absolute top-2 right-2 text-gray-500"
                                onClick={() => setActiveModal(null)}
                              >
                                ✖
                              </button>
                              <h4 className="font-semibold mb-2">Full Comment</h4>
                              <p>{comment.text}</p>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </td>
                  <td>
                    <select
                      className="select select-bordered select-sm"
                      value={selectedFeedback}
                      onChange={(e) =>
                        handleFeedbackChange(comment._id, e.target.value)
                      }
                    >
                      <option value="">Select feedback</option>
                      {feedbackOptions.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${
                        isReported || !selectedFeedback
                          ? "btn-disabled"
                          : "btn-error"
                      }`}
                      disabled={isReported || !selectedFeedback}
                      onClick={() => handleReport(comment)}
                    >
                      {isReported ? "Reported" : "Report"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentsPage;