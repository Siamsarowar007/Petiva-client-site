import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaCommentDots, FaFacebook, FaWhatsapp } from "react-icons/fa";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { FacebookShareButton, WhatsappShareButton } from "react-share";

const PostCard = ({ post, onLike, onUnlike, onAddComment }) => {
  const [commentToggle, setCommentToggle] = useState(false);

  const formatTime = (dateString) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const diffMs = now - postDate;
    const diffMinutes = Math.floor(diffMs / 60000);
    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="border rounded-md p-4 mb-6 shadow-sm bg-white">
      {/* Author Info */}
      <div className="flex items-center mb-3">
        <img
          src={post.authorPhoto || "/default-avatar.png"}
          alt={post.authorName}
          className="w-10 h-10 rounded-full mr-3 object-cover"
        />
        <div>
          <p className="font-semibold">{post.authorName}</p>
          <p className="text-xs text-gray-500">{formatTime(post.createdAt || post.postTime)}</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-3">
        <span className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded">
          #{post.tag}
        </span>
        <h2 className="text-lg font-semibold mt-1">{post.title}</h2>
        <p className="mt-2 whitespace-pre-line">{post.description}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between text-gray-600 text-sm">
        <div className="flex space-x-4">
          <button
            onClick={onLike}
            className="flex items-center space-x-1 hover:text-blue-600"
            aria-label="Like"
          >
            <FaThumbsUp />
            <span>{post.upVote?.length || 0}</span>
          </button>

          <button
            onClick={onUnlike}
            className="flex items-center space-x-1 hover:text-red-600"
            aria-label="Unlike"
          >
            <FaThumbsDown />
            <span>{post.downVote?.length || 0}</span>
          </button>

          <button
            onClick={() => setCommentToggle(!commentToggle)}
            className="flex items-center space-x-1 hover:text-green-600"
            aria-label="Comments"
          >
            <FaCommentDots />
            <span>{post.comments?.length || 0}</span>
          </button>
        </div>

        <div className="flex space-x-3">
          <FacebookShareButton url={window.location.href} quote={post.title}>
            <FaFacebook className="text-blue-600 cursor-pointer" />
          </FacebookShareButton>

          <WhatsappShareButton url={window.location.href} title={post.title}>
            <FaWhatsapp className="text-green-600 cursor-pointer" />
          </WhatsappShareButton>
        </div>
      </div>

      {/* Comment Section */}
      {commentToggle && (
        <div className="mt-4">
          <CommentForm postId={post._id} onAddComment={onAddComment} />
          <CommentList comments={post.comments || []} />
        </div>
      )}
    </div>
  );
};

export default PostCard;
