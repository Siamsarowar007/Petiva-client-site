import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaCommentDots,
  FaShareAlt,
} from "react-icons/fa";

import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import useAuth from "../../../hooks/useAuth";
import CommentCount from "./CommentCount";
import {useVotePost} from "../../../hooks/useVotePost" ; 

const SITE_URL = import.meta.env.VITE_SITE_URL || "http://localhost:5000";


const PRIMARY_COLOR_CLASS = "text-[#4CA3B8]";
const PRIMARY_BG_COLOR_CLASS = "bg-[#4CA3B8]";
const PRIMARY_BORDER_COLOR_CLASS = "border-[#4CA3B8]";
const PRIMARY_HOVER_COLOR_CLASS = "hover:text-[#3B8E9B]";
const PRIMARY_HOVER_BG_COLOR_CLASS = "hover:bg-[#3B8E9B]";
const PRIMARY_FOCUS_OUTLINE_CLASS = "focus:outline-[#4CA3B8]";

const PostCard = ({ post }) => {
  const { user } = useAuth();
  const userId = user?.email;

  
  const [up, setUp] = useState(post.upVote || 0); 
  const [down, setDown] = useState(post.downVote || 0); 
  const [userVote, setUserVote] = useState(post.votes?.[userId] || null); 

  const voteMutation = useVotePost();

  const [showShare, setShowShare] = useState(false);
  const shareRef = useRef(null);
  const descriptionRef = useRef(null);
  const [showReadMore, setShowReadMore] = useState(false);

  const handleClickOutside = useCallback((e) => {
    if (shareRef.current && !shareRef.current.contains(e.target)) {
      setShowShare(false);
    }
  }, []);

  useEffect(() => {
    if (showShare) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showShare, handleClickOutside]);

  useEffect(() => {
    if (descriptionRef.current) {

      setShowReadMore(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
    }
  }, [post.description]); 


  useEffect(() => {
    setUp(post.upVote || 0);
    setDown(post.downVote || 0);
    setUserVote(post.votes?.[userId] || null);
  }, [post, userId]);

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
 
      await voteMutation.mutateAsync({
        postId: post._id,
        userId,
        voteType,
      });

    } catch (err) {
      console.error("Vote failed:", err);

    }
  };

  const authorName = post.authorName || "Unknown";
  const postDate = new Date(post.postTime).toLocaleDateString();

  //  FIX 2: Format time to include AM/PM
  const postTime = new Date(post.postTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  const shareUrl = `${SITE_URL}/post-details/${post._id}`;
  const shareTitle = post.title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}

      className="w-full flex"
    >
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-5 flex flex-col justify-between group overflow-hidden relative w-full h-[400px]"> {/* 🔴 Fixed height applied here */}
        {/* Link to post details for the whole clickable area except buttons */}
        <Link to={`/post-details/${post._id}`} className="block flex-grow cursor-pointer">
          <div className="flex items-start gap-3 mb-3">
            <img
              className="h-10 w-10 rounded-full object-cover ring-1 ring-offset-1 ring-[#4CA3B8] shadow-sm"
              src={post.authorImage || "https://i.ibb.co/VgY9pJf/avatar.png"}
              alt={authorName}
              loading="lazy"
            />
            <div className="flex-1">
              {/* Author Name */}
              <p className="text-sm font-medium text-gray-700">
                {authorName}
              </p>
              {/* Post Date & Time */}
              <p className="text-xs text-gray-500 mt-0.5">
                {postDate} at {postTime}
              </p>
            </div>
          </div>

          {/* Post Title */}
          <h3 className={`text-lg font-bold text-gray-800 break-words line-clamp-2 leading-tight group-hover:${PRIMARY_COLOR_CLASS} transition-colors duration-200 mb-2`}>
            {post.title}
          </h3>

          {/* Post Tag */}
          <p className={`text-xs ${PRIMARY_COLOR_CLASS} font-medium mb-3`}>#{post.tag}</p>

          {/*  FIX 1: Post Description with line-clamp and Read More functionality */}
          <div className="relative">
            <p
              ref={descriptionRef}
              className="text-sm text-gray-600 line-clamp-[7]" 
            >
              {post.description}
            </p>
            {showReadMore && ( 
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent pt-8 text-right">
                <span className={`text-sm font-medium ${PRIMARY_COLOR_CLASS} hover:underline ml-2`}>
                  Read More
                </span>
              </div>
            )}
          </div>
        </Link>

       
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center gap-4">
            {/* Upvote Button */}
            <button
              onClick={(e) => handleVote("up", e)}
              className={`flex items-center gap-1 text-base transition-transform hover:scale-105 focus:outline-none ${
                post.votes?.[userId] === "up" ? "text-green-500 font-semibold" : `${PRIMARY_COLOR_CLASS} hover:text-green-500`
              }`}
              title="Upvote"
            >
              <FaThumbsUp /> <span className="text-sm font-medium">{post.upVote}</span>
            </button>
            {/* Downvote Button */}
            <button
              onClick={(e) => handleVote("down", e)}
              className={`flex items-center gap-1 text-base transition-transform hover:scale-105 focus:outline-none ${
                post.votes?.[userId] === "down" ? "text-red-500 font-semibold" : "text-gray-500 hover:text-red-500"
              }`}
              title="Downvote"
            >
              <FaThumbsDown /> <span className="text-sm font-medium">{post.downVote}</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Comments Link */}
            <Link
              to={`/post-details/${post._id}#comments`}
              className={`flex items-center gap-1 text-base ${PRIMARY_COLOR_CLASS} hover:scale-105 transition-transform focus:outline-none`}
              title="Comments"
            >
              <FaCommentDots /> <CommentCount postId={post._id} />
            </Link>

            {/* Share Icon with Popover */}
            <div className="relative" ref={shareRef}>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowShare((s) => !s); }}
                title="Share this post"
                className={`flex items-center gap-1 text-base ${PRIMARY_COLOR_CLASS} hover:scale-105 transition-transform focus:outline-none`}
              >
                <FaShareAlt />
              </button>

              {showShare && (
                <div
                  className="absolute right-0 bottom-full mb-3 z-10 flex items-center gap-3 bg-white border border-gray-200 rounded-xl shadow-xl p-3 transform origin-bottom-right animate-fade-in-up"
                >
                  <FacebookShareButton
                    url={shareUrl}
                    quote={shareTitle}
                    hashtag="#YourWebsiteName"
                    className="outline-none focus:outline-none"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>

                  <WhatsappShareButton
                    url={shareUrl}
                    title={shareTitle}
                    separator=" - "
                    className="outline-none focus:outline-none"
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;