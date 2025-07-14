import React from "react";

const CommentList = ({ comments }) => {
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (comments.length === 0) {
    return <p className="text-gray-500 text-sm">No comments yet.</p>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id} className="border-b border-gray-200 py-2">
          <p className="text-sm font-semibold">{comment.authorName || "Anonymous"}</p>
          <p className="text-sm whitespace-pre-line">{comment.text}</p>
          <p className="text-xs text-gray-400">{formatTime(comment.time || comment.createdAt)}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
