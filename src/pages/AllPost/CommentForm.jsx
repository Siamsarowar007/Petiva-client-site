import React, { useState } from "react";

const CommentForm = ({ postId, onAddComment }) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(postId, commentText.trim());
    setCommentText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <textarea
        rows={2}
        className="w-full border rounded p-2 focus:outline-blue-400"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button
        type="submit"
        className="mt-1 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;
