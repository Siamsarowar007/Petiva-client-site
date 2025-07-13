import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router"; // corrected import
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/posts/${postId}`);
          setPosts((prev) => prev.filter((post) => post._id !== postId));
          Swal.fire("Deleted!", "Your post has been deleted.", "success");
        } catch (error) {
          console.error("Failed to delete post:", error);
          Swal.fire("Error", "Unable to delete post. Try again later.", "error");
        }
      }
    });
  };

  if (loading) return <div className="text-center py-10">Loading your posts...</div>;

  if (!posts.length) return <div className="text-center py-10">You have no posts yet.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">My Posts</h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Tag</th>
              <th className="px-4 py-3 text-center">Votes</th>
              <th className="px-4 py-3 text-center">Comments</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, idx) => {
              const voteCount = (post.upVote?.length || 0) - (post.downVote?.length || 0);
              return (
                <tr key={post._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{post.title}</td>
                  <td className="px-4 py-2 capitalize">{post.tag}</td>
                  <td className="px-4 py-2 text-center">{voteCount}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => navigate(`/post-details/${post._id}`)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Comments
                    </button>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/edit-post/${post._id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPost;
