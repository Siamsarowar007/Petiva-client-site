import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";


const Banner = () => {
  const axios = useAxios();
  const [searchTag, setSearchTag] = useState("");
  const [tagQuery, setTagQuery] = useState("");

  const { data: searchResults = [], refetch, isLoading } = useQuery({
    queryKey: ["searchPosts", tagQuery],
    queryFn: async () => {
      const res = await axios.get(`/posts/search?tag=${tagQuery}`);
      return res.data;
    },
    enabled: !!tagQuery,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setTagQuery(searchTag.trim());
    refetch();
  };

  return (
    <div>
      {/* 🔵 Banner Section */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-20 px-4 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          Welcome to Petiva!
        </h1>
        <p className="text-lg mb-6">
          Search posts by tag: <strong>pet-care, adoption, nutrition, training</strong>
        </p>

        <form onSubmit={handleSearch} className="max-w-md mx-auto flex">
          <input
            type="text"
            placeholder="Enter tag..."
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            className="input input-bordered w-full text-black"
          />
          <button type="submit" className="btn btn-accent ml-2">
            Search
          </button>
        </form>
      </div>

      {/* 🔽 Search Result Section */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {tagQuery ? `Results for "${tagQuery}"` : "Search by tag to see posts"}
        </h2>

        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : searchResults.length === 0 && tagQuery ? (
          <p className="text-center text-gray-500">No posts found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {searchResults.map((post) => (
              <div
                key={post._id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {post.description.slice(0, 100)}...
                </p>
                <div className="text-xs text-gray-500 mb-1">
                  Tag: <span className="text-indigo-500">{post.tag}</span>
                </div>
                <div className="text-xs text-gray-400">
                  Posted by: {post.authorName} |{" "}
                  {new Date(post.postTime).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
