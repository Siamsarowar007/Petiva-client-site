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
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

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
      _id: Math.random().toString(36).substring(2, 9), // temporary id for React key
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

  if (loading) return <div className="text-center py-10">Loading post...</div>;

  if (!post) return <div className="text-center py-10">Post not found.</div>;

  const voteCount = (post.upVote?.length || 0) - (post.downVote?.length || 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={post.authorPhoto || "https://i.ibb.co/VgY9pJf/avatar.png"}
            alt="Author"
            className="w-12 h-12 rounded-full border object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">{post.authorName}</h3>
            <p className="text-sm text-gray-500">
              {new Date(post.postTime).toLocaleString("en-BD")}
            </p>
          </div>
        </div>

        {/* Post Content */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-3">{post.description}</p>
        <span className="badge badge-info capitalize mb-4">{post.tag}</span>

        {/* Votes & Share */}
        <div className="flex items-center gap-4 mt-4 flex-wrap">
          <button className="flex items-center gap-1 text-green-600 font-semibold" disabled>
            <FaThumbsUp /> {post.upVote?.length || 0}
          </button>
          <button className="flex items-center gap-1 text-red-500 font-semibold" disabled>
            <FaThumbsDown /> {post.downVote?.length || 0}
          </button>
          <p className="text-gray-600">Votes: {voteCount}</p>

          <div className="flex items-center gap-2 ml-auto">
            <FacebookShareButton url={window.location.href}>
              <FacebookIcon size={30} round />
            </FacebookShareButton>
            <WhatsappShareButton url={window.location.href}>
              <WhatsappIcon size={30} round />
            </WhatsappShareButton>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Comments</h3>

          {/* Comments List */}
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            <ul className="space-y-3">
              {comments.map((comment) => (
                <li
                  key={comment._id || comment.time}
                  className="bg-gray-100 p-3 rounded shadow-sm text-sm"
                >
                  <p className="font-medium">{comment.authorName || "Anonymous"}</p>
                  <p>{comment.text}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {new Date(comment.time).toLocaleString("en-BD")}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mt-4 flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="input input-bordered w-full"
              placeholder={user ? "Write a comment..." : "Login to comment"}
              disabled={!user || commentSubmitting}
            />
            <button
              className="btn btn-primary"
              type="submit"
              disabled={!user || commentSubmitting}
            >
              {commentSubmitting ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
