// CommentsCount.jsx
import React from "react";
import { FaCommentAlt } from "react-icons/fa";

const CommentsCount = ({ count }) => {
  return (
    <div className="flex items-center gap-1 text-gray-600 text-sm">
      <FaCommentAlt />
      <span>{count || 0}</span>
    </div>
  );
};

export default CommentsCount;
