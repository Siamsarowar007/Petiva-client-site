import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const FeaturedPosts = () => {
  const axios = useAxios();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/posts/featured?limit=4")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axios]);

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-extrabold mb-8 text-[#1E293B] text-center">
        Featured Posts
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-400 italic">No featured posts available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
              style={{ animation: "fadeInUp 0.5s ease forwards" }}
            >
              <h3 className="text-xl font-semibold mb-2 text-[#4CA3B8]">{post.title}</h3>
              <p className="text-gray-700 mb-3 line-clamp-3">{post.description}</p>
              <p className="text-xs text-gray-400">
                Posted by: {post.authorName} |{" "}
                {new Date(post.postTime).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Truncate text */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default FeaturedPosts;
