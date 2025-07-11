import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";

const MyPost = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchMyPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/posts?authorEmail=${user.email}`);
        setPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [user?.email, axios]);

  const handleDelete = async (postId) => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      await axios.delete(`/posts/${postId}`);
      setPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("Unable to delete post. Please try again later.");
    }
  };

  if (loading) return <div className="text-center py-10">Loading your posts...</div>;

  if (!posts.length) return <div className="text-center py-10">You have no posts yet.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6">My Posts</h2>
      <table className="min-w-full table-auto border border-gray-300 rounded-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Post Title</th>
            <th className="border px-4 py-2 text-center">Votes</th>
            <th className="border px-4 py-2 text-center">Comments</th>
            <th className="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            const voteCount = (post.upVote || 0) - (post.downVote || 0);

            return (
              <tr key={post._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{post.title}</td>
                <td className="border px-4 py-2 text-center">{voteCount}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => navigate(`/comments/${post._id}`)}
                  >
                    View Comments
                  </button>
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyPost;
