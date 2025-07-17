import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../shared/Loader/Loader";
import PostCard from "./Post/PostCard";


const POSTS_PER_PAGE = 6;

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/all-posts");
      const postsWithVotes = res.data.map((post) => {
        const votes = post.votes || {};
        const upVote = Object.values(votes).filter((v) => v === "up").length;
        const downVote = Object.values(votes).filter((v) => v === "down").length;
        return { ...post, upVote, downVote };
      });
      setPosts(postsWithVotes);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Pagination derived values
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    return posts.slice(start, end);
  }, [posts, currentPage]);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <Loader />;

  return (
    <div className="mt-16 w-full">
      {/* Cards */}
      <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2">
        {currentPosts.map((post) => (
          <Link key={post._id} to={`/post-details/${post._id}`}>
            <PostCard post={post} fixedHeight /> 
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto px-4 py-10 gap-3">
        <p className="text-sm text-gray-500 text-center sm:text-left">
          Showing {currentPosts.length} of {posts.length} posts
        </p>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className="text-sm px-4 py-2 rounded border border-[#4CA3B8] bg-white text-[#4CA3B8] hover:bg-[#4CA3B8] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            « Previous
          </button>
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => paginate(num + 1)}
              className={`px-3 py-2 rounded text-sm border ${
                currentPage === num + 1
                  ? "bg-[#4CA3B8] text-white border-[#4CA3B8]"
                  : "bg-white text-[#4CA3B8] border-[#4CA3B8] hover:bg-[#4CA3B8]/10"
              }`}
            >
              {num + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className="text-sm px-4 py-2 rounded border border-[#4CA3B8] bg-white text-[#4CA3B8] hover:bg-[#4CA3B8] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next »
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllPost;
