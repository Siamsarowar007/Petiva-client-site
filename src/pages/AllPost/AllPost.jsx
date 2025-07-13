import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaCommentDots,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";
import { FacebookShareButton, WhatsappShareButton } from "react-share";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(() => {
      fetchPosts();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchPosts = () => {
    axios
      .get("http://localhost:5000/all-posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Failed to load posts", err));
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">📝 All User Posts</h2>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {currentPosts.map((post) => (
            <div
              key={post._id}
              className="w-full bg-gray-50 border rounded-lg overflow-hidden flex flex-col transition hover:shadow-md"
            >
              {/* Author Info */}
              <div className="flex items-center gap-3 px-5 pt-5">
                <img
                  src={
                    post.authorPhoto ||
                    "https://i.ibb.co/ypkgK0X/default-user.png"
                  }
                  className="w-12 h-12 rounded-full border"
                  alt="Author"
                />
                <div>
                  <p className="font-semibold text-gray-800">{post.authorName}</p>
                  <p className="text-sm text-gray-500">
                    {formatDateTime(post.postTime)}
                  </p>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-5 py-4 flex-grow">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  {post.description?.slice(0, 120)}...
                </p>
                <span className="badge badge-outline">{post.tag}</span>
              </div>

              {/* Footer */}
              <div className="border-t px-5 py-3 bg-gray-100 flex items-center justify-between">
                <div className="flex gap-4 text-gray-600">
                  <span className="flex items-center gap-1 hover:text-green-600 text-sm">
                    <FaThumbsUp /> {post.upVote?.length || 0}
                  </span>
                  <span className="flex items-center gap-1 hover:text-red-500 text-sm">
                    <FaThumbsDown /> {post.downVote?.length || 0}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <FaCommentDots /> {post.commentCount || 0}
                  </span>
                </div>

                <div className="flex gap-2">
                  <FacebookShareButton url={`https://your-site.com/post/${post._id}`}>
                    <FaFacebook size={20} className="text-blue-600" />
                  </FacebookShareButton>
                  <WhatsappShareButton url={`https://your-site.com/post/${post._id}`}>
                    <FaWhatsapp size={20} className="text-green-500" />
                  </WhatsappShareButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-10">
          <p className="text-sm text-gray-500">
            Showing {currentPosts.length} of {posts.length} posts
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
            >
              « Previous
            </button>

            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => paginate(num + 1)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  currentPage === num + 1
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {num + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
            >
              Next »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPost;
