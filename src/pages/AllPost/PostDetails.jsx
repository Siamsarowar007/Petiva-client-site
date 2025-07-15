import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loader from "../../shared/Loader/Loader";

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
    
   
    setComments((prev) => [res.data, ...prev]);

    setNewComment("");
  } catch (err) {
    console.error("Comment failed", err);
    alert("Failed to post comment.");
  } finally {
    setCommentSubmitting(false);
  }
};


  if (loading) return <div className="text-center py-10"><Loader /></div>;
  if (!post) return <div className="text-center py-10">Post not found.</div>;

  return (
    <div className="mt-20 px-4 py-6">
      <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="mb-4 text-gray-700">{post.description}</p>

        {/* Comments */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Comments ({comments.length})</h2>
          {user ? (
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full border p-2 rounded mb-2"
              />
              <button className="btn btn-primary" disabled={commentSubmitting}>
                {commentSubmitting ? "Sending..." : "Comment"}
              </button>
            </form>
          ) : (
            <p className="text-red-500">Please login to comment.</p>
          )}

          <ul className="mt-4 space-y-2">
            {comments.slice(0, 1).map((comment, idx) => (
              <li key={idx} className="border p-2 rounded">
                <p className="font-semibold">{comment.authorName}</p>
                <p className="text-gray-700">{comment.text}</p>
              </li>
            ))}
          </ul>

          {comments.length > 1 && (
            <Link
              to={`/comments/${id}`}
              className="text-blue-600 hover:underline text-sm block mt-2"
            >
              View all comments
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;