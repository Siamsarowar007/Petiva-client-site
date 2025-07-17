import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaCommentDots,
} from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loader from "../../shared/Loader/Loader";

const PRIMARY = "#4CA3B8";

const PostDetails = () => {
  const { id } = useParams();
  const axios = useAxios();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [upVote, setUpVote] = useState(0);
  const [downVote, setDownVote] = useState(0);
  const [userVote, setUserVote] = useState(null);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  const commentsRef = useRef(null);

  // Fetch post + comments
  useEffect(() => {
    const fetchPostAndComments = async () => {
      setLoading(true);
      try {
        const postRes = await axios.get(`/posts/${id}`);
        const postData = postRes.data;
        setPost(postData);

        // derive votes
        const votesObj = postData?.votes || {};
        const vals = Object.values(votesObj);
        setUpVote(vals.filter((v) => v === "up").length);
        setDownVote(vals.filter((v) => v === "down").length);

        // set userVote (by email)
        if (user?.email && votesObj[user.email]) {
          setUserVote(votesObj[user.email]);
        } else {
          setUserVote(null);
        }

        // load comments
        const commentRes = await axios.get(`/comments/${id}`);
        setComments(commentRes.data || []);
      } catch (err) {
        console.error("Error fetching post or comments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPostAndComments();
  }, [id, axios, user?.email]);

  // Submit new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!user) return alert("Please login to comment.");

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
      // prepend new comment
      setComments((prev) => [res.data, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("Comment failed", err);
      alert("Failed to post comment.");
    } finally {
      setCommentSubmitting(false);
    }
  };

  // Vote handler
  const handleVote = async (voteType) => {
    if (!user?.email) {
      alert("Please login to vote.");
      return;
    }
    try {
      const res = await axios.patch(`/posts/vote/${id}`, {
        userId: user.email,
        voteType, // "up" | "down"
      });
      setUpVote(res.data.upVote ?? 0);
      setDownVote(res.data.downVote ?? 0);
      setUserVote(res.data.userVote ?? null);
    } catch (err) {
      console.error("Vote failed:", err);
      alert("Failed to record vote.");
    }
  };

  // Scroll to comments
  const scrollToComments = () => {
    if (commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <Loader />
      </div>
    );
  }
  if (!post) {
    return <div className="text-center py-10">Post not found.</div>;
  }

  const authorName = post.authorName || "Unknown";
  const authorImage = post.authorImage || "https://i.ibb.co/VgY9pJf/avatar.png";
  const postDate = new Date(post.postTime).toLocaleString();

  return (
    <div className="mt-20 px-4 py-6">
      <article className="relative bg-white max-w-4xl mx-auto rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* subtle top accent bar */}
        <div
          className="h-1 w-full"
          style={{ backgroundColor: PRIMARY }}
          aria-hidden="true"
        />

        {/* Post Header */}
        <header className="p-6 sm:p-8 border-b border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={authorImage}
              alt={authorName}
              className="w-16 h-16 rounded-full object-cover ring-2"
              style={{ borderColor: PRIMARY }}
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {post.title}
              </h1>
              <div className="text-sm text-gray-500 space-x-1">
                <span>by</span>
                <span className="font-medium text-gray-700">{authorName}</span>
                <span>·</span>
                <time dateTime={post.postTime}>{postDate}</time>
              </div>
            </div>
          </div>

          {/* Tag chip */}
          {post.tag && (
            <span
              className="inline-block text-xs font-medium px-2 py-1 rounded-full"
              style={{
                backgroundColor: "#E0F4F8",
                color: PRIMARY,
              }}
            >
              #{post.tag}
            </span>
          )}
        </header>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <p className="mb-8 text-gray-700 leading-relaxed whitespace-pre-line">
            {post.description}
          </p>

          {/* Reaction Bar */}
          <div
            className="flex flex-wrap items-center gap-8 sm:gap-10 py-4 px-5 rounded-lg border mb-10"
            style={{ borderColor: PRIMARY, backgroundColor: "#F0FAFC" }}
          >
            <button
              onClick={() => handleVote("up")}
              className={`flex items-center gap-2 text-xl transition-transform hover:scale-110 ${
                userVote === "up" ? "text-green-600 font-semibold" : "text-gray-600"
              }`}
              title="Like this post"
              type="button"
            >
              <FaThumbsUp /> {upVote}
            </button>

            <button
              onClick={() => handleVote("down")}
              className={`flex items-center gap-2 text-xl transition-transform hover:scale-110 ${
                userVote === "down" ? "text-red-500 font-semibold" : "text-gray-600"
              }`}
              title="Dislike this post"
              type="button"
            >
              <FaThumbsDown /> {downVote}
            </button>

            <button
              onClick={scrollToComments}
              className="flex items-center gap-2 text-xl text-gray-600 hover:scale-110 transition-transform"
              title="Jump to comments"
              type="button"
            >
              <FaCommentDots style={{ color: PRIMARY }} /> {comments.length}
            </button>
          </div>

          {/* Comments Section */}
          <section ref={commentsRef} id="comments">
            <h2
              className="text-xl sm:text-2xl font-semibold mb-4 pb-2 border-b"
              style={{ borderColor: PRIMARY }}
            >
              Comments ({comments.length})
            </h2>

            {/* Comment Form */}
            {user ? (
              <form
                onSubmit={handleCommentSubmit}
                className="mb-8 p-4 sm:p-5 rounded-lg border"
                style={{ borderColor: PRIMARY, backgroundColor: "#F9FEFF" }}
              >
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full border rounded p-3 mb-3 focus:outline-none focus:ring-2"
                  style={{ borderColor: PRIMARY }}
                  rows={3}
                />
                <button
                  className="px-5 py-2 rounded font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-1"
                  style={{ backgroundColor: PRIMARY }}
                  disabled={commentSubmitting}
                  type="submit"
                >
                  {commentSubmitting ? "Sending..." : "Comment"}
                </button>
              </form>
            ) : (
              <p className="text-red-500 mb-6">Please login to comment.</p>
            )}

            {/* Comment List */}
            {comments.length === 0 ? (
              <p className="text-gray-500">
                No comments yet. Be the first to comment!
              </p>
            ) : (
              <ul className="space-y-4">
                {comments.map((comment) => {
                  const cName = comment.authorName || "Anonymous";
                  const cTime = comment.time
                    ? new Date(comment.time).toLocaleString()
                    : "";
                  return (
                    <li
                      key={comment._id || comment.time}
                      className="p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow"
                      style={{ borderColor: "#e5e7eb" }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
                          style={{ backgroundColor: PRIMARY }}
                        >
                          {cName[0]?.toUpperCase() || "U"}
                        </div>
                        <div className="text-sm leading-tight">
                          <p className="font-semibold text-gray-800">{cName}</p>
                          <p className="text-xs text-gray-400">{cTime}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                        {comment.text}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Report Comments Link */}
            {comments.length > 0 && (
              <Link
                to={`/comments/${id}`}
                className="inline-block mt-8 text-sm font-medium underline hover:opacity-80"
                style={{ color: PRIMARY }}
              >
                Report or view all comments →
              </Link>
            )}
          </section>
        </div>
      </article>
    </div>
  );
};

export default PostDetails;
