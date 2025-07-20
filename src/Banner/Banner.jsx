import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import { FaSearch } from "react-icons/fa";
import Loader from "../shared/Loader/Loader";

const Banner = () => {
  const axios = useAxios();
  const [searchTag, setSearchTag] = useState("");
  const [tagQuery, setTagQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef();

  // Load All Tags
  useEffect(() => {
    const loadTags = async () => {
      try {
        const res = await axios.get("/all-posts");
        const tags = res.data.map((post) => post.tag?.toLowerCase().trim());
        const uniqueTags = [...new Set(tags.filter(Boolean))];
        setAllTags(uniqueTags);
      } catch (err) {
        console.error("Error loading tags", err);
      }
    };
    loadTags();
  }, []);

  // Suggestion Logic
  useEffect(() => {
    if (searchTag.trim()) {
      const match = allTags.filter((tag) =>
        tag.includes(searchTag.toLowerCase())
      );
      setSuggestions(match.slice(0, 5));
    } else {
      setSuggestions([]);
    }
    setActiveIndex(-1);
  }, [searchTag, allTags]);

  // Keyboard Navigation
  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = activeIndex >= 0 ? suggestions[activeIndex] : searchTag;
      setSearchTag(selected);
      setTagQuery(selected);
      setSuggestions([]);
      refetch();
    }
  };

  // Search Query
  const { data: searchResults = [], refetch, isLoading } = useQuery({
    queryKey: ["searchPosts", tagQuery],
    queryFn: async () => {
      const res = await axios.get(`/posts/search?tag=${tagQuery}`);
      return res.data;
    },
    enabled: !!tagQuery,
  });

  return (
    <div>
      {/* Banner */}
      <div
        className="relative bg-cover bg-center lg:min-h-[70vh] text-white py-24 px-4 text-center"
        style={{
          backgroundImage: "url('https://i.ibb.co/m5BbDCjr/240-F-610042095-DC4m-Tiz-VUrn-XB0pdv-Lzht-Wtx-Iq-TXrrrv.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Welcome to Petiva!</h1>
          <p className="text-md text-gray-200 mb-8 px-4">
            Discover and share useful posts on pet care, training, and adoption.
          </p>

          {/* Search Input */}
          <form className="relative max-w-xl mx-auto" onSubmit={e => e.preventDefault()}>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300" />
              
              <input
                type="text"
                placeholder="Search for Topics..."
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={inputRef}
                className="pl-10 pr-10 py-3 rounded-full w-full bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              {/* Clear Button */}
              {searchTag && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTag("");
                    setTagQuery("");
                    setSuggestions([]);
                    inputRef.current.focus();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full w-5 h-5 flex items-center justify-center text-gray-700 hover:bg-gray-400 focus:outline-none"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <ul className="absolute w-full mt-1 bg-black/20 backdrop-blur-sm rounded-lg z-50 text-white shadow-md">
                  {suggestions.map((tag, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setSearchTag(tag);
                        setTagQuery(tag);
                        setSuggestions([]);
                        refetch();
                      }}
                      className={`px-4 py-2 cursor-pointer transition ${
                        i === activeIndex
                          ? "bg-white/20 text-white"
                          : "hover:bg-white/10 rounded-lg text-white"
                      }`}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </form>

          {/* Popular Searches */}
          {allTags.length > 0 && (
            <div className="mt-6 text-center">
              <h3 className="text-white text-sm md:text-base font-semibold mb-3">
                Popular Searches
              </h3>
              <div className="flex justify-center flex-wrap gap-3">
                {allTags.slice(0, 3).map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSearchTag(tag);
                      setTagQuery(tag);
                      setSuggestions([]);
                      refetch();
                    }}
                    className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-full transition backdrop-blur"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Results */}
      {tagQuery && (
        <div className="max-w-5xl mx-auto px-4 py-10">
          {isLoading ? (
            <p className="text-center"><Loader></Loader></p>
          ) : searchResults.length === 0 ? (
            <p className="text-center text-gray-500">No posts found.</p>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                Results for <span className="text-blue-600">"{tagQuery}"</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {searchResults.map((post) => (
                  <div
                    key={post._id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow hover:shadow-lg transition bg-white dark:bg-gray-800"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Banner;
