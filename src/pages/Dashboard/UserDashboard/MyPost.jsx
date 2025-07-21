import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router"; 
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecureFile";

const PRIMARY = "#4CA3B8";

const MyPost = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchMyPosts = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/posts?authorEmail=${user.email}`);
        setPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [user?.email, axiosInstance]);

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
          await axiosInstance.delete(`/posts/${postId}`);
          setPosts((prev) => prev.filter((post) => post._id !== postId));
          Swal.fire("Deleted!", "Your post has been deleted.", "success");
        } catch (error) {
          console.error("Failed to delete post:", error);
          Swal.fire("Error", "Unable to delete post. Try again later.", "error");
        }
      }
    });
  };

  if (loading)
    return <div className="text-center py-10 text-gray-600">Loading your posts...</div>;

  if (!posts.length)
    return <div className="text-center py-10 text-gray-600">You have no posts yet.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <title>My Post || Petiva</title>
      <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: PRIMARY }}>
        My Posts
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        
        <table className="min-w-full table-auto text-sm">
          <thead>
            <tr
              style={{
                backgroundColor: "#E6F6F9",
                color: PRIMARY,
                fontWeight: "600",
              }}
            >
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Tag</th>
              <th className="px-4 py-3 text-center">Comments</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, idx) => (
              <tr
                key={post._id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2 font-medium">{idx + 1}</td>
                <td className="px-4 py-2 text-gray-700">{post.title}</td>
                <td className="px-4 py-2 capitalize text-gray-600">{post.tag}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => navigate(`/post-details/${post._id}`)}
                    className="text-[13px] font-medium text-blue-600 hover:underline"
                  >
                    View Comments
                  </button>
                </td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="px-3 py-1 text-xs font-semibold rounded bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/edit-post/${post._id}`}
                      className="px-3 py-1 text-xs font-semibold rounded"
                      style={{
                        backgroundColor: PRIMARY,
                        color: "white",
                        transition: "background 0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#3b93a6")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = PRIMARY)
                      }
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPost;
