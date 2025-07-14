import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaFacebook,
  FaLinkedin,
  FaDev,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router";

const PostDetails = () => {
  const { id } = useParams();
  const axios = useAxios();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPostAndComments = async () => {
      setLoading(true);
      try {
        const postRes = await axios.get(`/posts/${id}`);
        setPost(postRes.data);

        const commentRes = await axios.get(`/comments/${id}`);
        setComments(commentRes.data || []);
      } catch (err) {
        console.error("Error fetching post or comments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id, axios]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    if (!user) {
      alert("Please login to comment.");
      return;
    }

    setCommentSubmitting(true);

    const commentData = {
      postId: id,
      text: newComment,
      time: new Date().toISOString(),
      authorName: user.displayName || "Anonymous",
      authorEmail: user.email || "unknown",
    };

    try {
      const res = await axios.post("/comments", commentData);
      setComments((prev) => [...prev, res.data || commentData]);
      setNewComment("");
    } catch (err) {
      console.error("Comment failed", err);
      alert("Failed to post comment. Please try again.");
    } finally {
      setCommentSubmitting(false);
    }
  };

  const handleVote = async (type) => {
    if (!user) {
      alert("Please login to vote");
      return;
    }
    try {
      const res = await axios.patch(`/posts/vote/${id}`, {
        userId: user.uid,
        voteType: type,
      });

      setPost((prev) => ({
        ...prev,
        upVote: res.data.upVote,
        downVote: res.data.downVote,
        userVote: res.data.userVote,
      }));
    } catch (err) {
      console.error("Vote error:", err);
    }
  };

  if (loading) return <div className="text-center py-10">Loading post...</div>;
  if (!post) return <div className="text-center py-10">Post not found.</div>;

  return (
    <div className="mt-16 sm:mt-[80px] px-4 py-6 overflow-hidden">
      <div className="bg-base-200 p-6 md:p-8 rounded-xl shadow-xl max-w-4xl mx-auto border border-orange-300 hover:shadow-orange-500 transition-shadow duration-300">
        {/* Author Info */}
        <div className="flex items-center gap-4 mb-4">
          <img
            className="h-14 w-14 rounded-full border-2 border-green-500"
            src={post.authorPhoto || "https://i.ibb.co/VgY9pJf/avatar.png"}
            alt="Author"
          />
          <div>
            <p className="font-bold text-orange-600">{post.authorName}</p>
            <p className="text-sm text-green-600">
              Posted on {new Date(post.postTime).toLocaleString("en-BD")}
            </p>
          </div>
        </div>

        {/* Post Content */}
        <h1 className="text-3xl font-bold mb-2 text-green-400">{post.title}</h1>
        <p className="text-md text-orange-600 font-semibold mb-4">#{post.tag}</p>
        <p className="leading-relaxed mb-6 text-green-500">{post.description}</p>

        {/* Vote & Share */}
        <div className="flex flex-wrap items-center gap-6 border-t border-b border-orange-300 py-4 mb-6">
          <button
            onClick={() => handleVote("up")}
            className={`flex items-center gap-2 font-semibold ${
              post.userVote === "up" ? "text-green-700" : "text-green-600"
            }`}
          >
            <FaThumbsUp /> {post.upVote?.length || 0}
          </button>
          <button
            onClick={() => handleVote("down")}
            className={`flex items-center gap-2 font-semibold ${
              post.userVote === "down" ? "text-red-700" : "text-red-600"
            }`}
          >
            <FaThumbsDown /> {post.downVote?.length || 0}
          </button>

          <div className="flex items-center gap-4 ml-auto text-xl text-blue-600">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="hover:text-blue-800 transition" />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="hover:text-blue-900 transition" />
            </a>
            <a
              href={`https://dev.to/new?prefill=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDev className="hover:text-gray-800 transition" />
            </a>
            <a
              href={`https://github.com/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="hover:text-black transition" />
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="hover:text-green-500 transition" />
            </a>
          </div>
        </div>

        {/* Comments Section */}
        <div>
          <h2 className="text-2xl font-bold text-orange-700 mb-4">
            Comments ({comments.length})
          </h2>

          {user ? (
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-4 border-2 border-green-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Write a comment..."
                rows={4}
                required
              />
              <div className="flex justify-end items-center mt-2">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold"
                  disabled={commentSubmitting}
                >
                  {commentSubmitting ? "Sending..." : "Comment"}
                </button>
              </div>
            </form>
          ) : (
            <p className="text-red-600 font-semibold mb-6">
              Please log in to comment.
            </p>
          )}

          <AnimatePresence>
            <div className="space-y-4 overflow-hidden">
              {comments.map((comment) => (
                <motion.div
                  key={comment._id || comment.time}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 rounded-md bg-green-50 border-l-4 border-green-400"
                >
                  <p className="font-semibold text-green-800">
                    {comment.authorName || "Anonymous"}
                  </p>
                  <p className="text-green-700 break-words">{comment.text}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(comment.time).toLocaleString("en-BD")}
                  </p>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>

        <Link
          to="/dashboard/my-Posts"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold transition duration-300"
        >
          ← Back to All Posts
        </Link>
      </div>
    </div>
  );
};

export default PostDetails;
