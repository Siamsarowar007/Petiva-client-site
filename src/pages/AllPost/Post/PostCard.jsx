import React, { useState } from "react";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaCommentDots,
} from "react-icons/fa";
import CommentCount from "./CommentCount";
import useAuth from "../../../hooks/useAuth";
import { useVotePost } from "../../../hooks/useVotePost";

const PostCard = ({ post, fixedHeight = false }) => {
  const { user } = useAuth();
  const userId = user?.email;

  const [up, setUp] = useState(post.upVote || 0);
  const [down, setDown] = useState(post.downVote || 0);
  const [userVote, setUserVote] = useState(null);

  const voteMutation = useVotePost();

  const handleVote = async (voteType, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!userId) {
      alert("Please login to vote.");
      return;
    }

    try {
      const res = await voteMutation.mutateAsync({
        postId: post._id,
        userId,
        voteType,
      });
      setUp(res.upVote);
      setDown(res.downVote);
      setUserVote(res.userVote);
    } catch (err) {
      console.error("Vote failed:", err);
    }
  };

  const authorName = post.authorName || "Unknown";

  return (
    <div
      className={`border border-gray-200 rounded-2xl shadow-md bg-white p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${
        fixedHeight ? "h-[300px]" : ""
      }`}
    >
    
      <div className="flex items-start gap-4">
        <img
          className="h-12 w-12 rounded-full object-cover ring-2 ring-[#4CA3B8]"
          src={post.authorImage || "https://i.ibb.co/VgY9pJf/avatar.png"}
          alt={authorName}
        />
        <div className="flex-1">
          <h2 className="text-md font-semibold text-gray-800 break-words line-clamp-2 group-hover:text-[#4CA3B8] transition-colors duration-200">
            {post.title}
          </h2>
          <p className="text-xs text-[#4CA3B8] mt-1">#{post.tag}</p>
        
          <p className="text-xs text-gray-500 mt-1">
            by <span className="font-medium text-gray-700">{authorName}</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(post.postTime).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* description */}
      <p className="mt-3 text-sm text-gray-600 line-clamp-3">
        {post.description}
      </p>

      {/* Actions */}
      <div className="mt-4 flex items-center gap-5 text-gray-600 text-sm">
        <button
          onClick={(e) => handleVote("up", e)}
          className={`flex items-center gap-1 hover:scale-110 transition-transform ${
            userVote === "up" ? "text-green-600 font-semibold" : ""
          }`}
          title="Like"
        >
          <FaThumbsUp className="text-lg" /> {up}
        </button>
        <button
          onClick={(e) => handleVote("down", e)}
          className={`flex items-center gap-1 hover:scale-110 transition-transform ${
            userVote === "down" ? "text-red-500 font-semibold" : ""
          }`}
          title="Dislike"
        >
          <FaThumbsDown className="text-lg" /> {down}
        </button>
        <span
          className="flex items-center gap-1 hover:scale-110 transition-transform"
          title="Comments"
        >
          <FaCommentDots className="text-lg text-[#4CA3B8]" />
          <CommentCount postId={post._id} />
        </span>
      </div>
    </div>
  );
};

export default PostCard;
