import React, { useMemo, useState } from "react";
import {
  FaSort,
  FaFilter,
  FaSearch,
} from "react-icons/fa";

import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Loader from "../../shared/Loader/Loader";
import PostCard from "./Post/PostCard";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";


const DEFAULT_PER_PAGE = 6;
const FULL_PER_PAGE = 6;


const PRIMARY_COLOR_CLASS = "text-[#4CA3B8]";
const PRIMARY_BG_COLOR_CLASS = "bg-[#4CA3B8]";
const PRIMARY_BORDER_COLOR_CLASS = "border-[#4CA3B8]";
const PRIMARY_HOVER_COLOR_CLASS = "hover:text-[#3B8E9B]";
const PRIMARY_HOVER_BG_COLOR_CLASS = "hover:bg-[#3B8E9B]";
const PRIMARY_FOCUS_OUTLINE_CLASS = "focus:outline-[#4CA3B8]";


const AllPost = ({ homeView = false }) => {
  const [tags, setTags] = useState(["all"]); 
  const [searchText, setSearchText] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [ascending, setAscending] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = homeView ? DEFAULT_PER_PAGE : FULL_PER_PAGE;

  const { user } = useAuth();
  const privateAxios = useAxios();
  const queryClient = useQueryClient();

  const {
    data: posts = [],
    isLoading,
    isError,
    error,
    
  } = useQuery({
    queryKey: ['allPosts'],
    queryFn: async () => {
      const res = await privateAxios.get(`${API_BASE}/all-posts`);
      const rawPosts = res.data || [];

      const postsWithDetails = await Promise.all(
        rawPosts.map(async (post) => {
          const votes = post.votes || {};
          const upVote = Object.values(votes).filter((v) => v === "up").length;
          const downVote = Object.values(votes).filter((v) => v === "down").length;

          let commentCount = 0;
          try {
            const commentRes = await privateAxios.get(`${API_BASE}/comments/${post._id}`);
            commentCount = commentRes.data.length || 0;
          } catch (error) {
            console.error(`Error fetching comments for post ${post._id}:`, error);
          }
          return { ...post, votes, upVote, downVote, commentCount };
        })
      );


      const fetchedTags = new Set(["all"]); 
      postsWithDetails.forEach((p) => {
        if (p.tag) fetchedTags.add(p.tag); 
      });
      setTags(Array.from(fetchedTags)); 

      return postsWithDetails;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });


  const filteredPosts = useMemo(() => {
    const s = searchText.trim().toLowerCase();
    return posts.filter((post) => {
      const matchText = !s || post.title.toLowerCase().includes(s);
      const matchTag = selectedTag === "all" || post.tag === selectedTag;
      return matchText && matchTag;
    });
  }, [posts, searchText, selectedTag]);

  const sortedPosts = useMemo(() => {
    const factor = ascending ? 1 : -1;

    return [...filteredPosts].sort((a, b) => {
      switch (sortBy) {
        case "likes": {
          return factor * (a.upVote - b.upVote);
        }
        case "comments": {
          return factor * (a.commentCount - b.commentCount);
        }
        case "oldest": {
          return factor * (new Date(a.postTime) - new Date(b.postTime));
        }
        case "popular": {
          const aScore = a.upVote * 2 + a.commentCount;
          const bScore = b.upVote * 2 + b.commentCount;
          return factor * (aScore - bScore);
        }
        case "newest":
        default: {
          return factor * (new Date(b.postTime) - new Date(a.postTime));
        }
      }
    });
  }, [filteredPosts, sortBy, ascending]);

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage) || 1;
  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    return sortedPosts.slice(start, end);
  }, [sortedPosts, currentPage, postsPerPage]);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="text-center mt-24 text-xl">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <div className="text-center mt-24 text-red-500">Failed to load posts: {error.message}</div>;
  }

  return (
    <div className="min-h-screen w-full mt-16 flex flex-col justify-between px-2 md:px-0">
      <title>All Posts || Petiva</title>
      {/* Filter / Sort / Search */}
      {!homeView && (
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4 items-center justify-between mb-6 px-2">
          {/* Search */}
          <div className="flex gap-2 items-center">
            <FaSearch className={`text-xl ${PRIMARY_COLOR_CLASS}`} />
            <input
              type="text"
              placeholder="Search title..."
              className={`border ${PRIMARY_BORDER_COLOR_CLASS} px-4 py-2 rounded-lg w-full text-sm ${PRIMARY_FOCUS_OUTLINE_CLASS}`}
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Tag Filter */}
          <div className="flex gap-2 items-center">
            <FaFilter className={`text-xl ${PRIMARY_COLOR_CLASS}`} />
            <select
              className={`border ${PRIMARY_BORDER_COLOR_CLASS} px-4 py-2 rounded-lg w-full text-sm ${PRIMARY_FOCUS_OUTLINE_CLASS}`}
              value={selectedTag}
              onChange={(e) => {
                setSelectedTag(e.target.value);
                setCurrentPage(1);
              }}
            >
              {/* This map correctly populates the dropdown with tags */}
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag === "all" ? "All Tags" : tag}
                </option>
              ))}
            </select>
          </div>

          {/* Sort + Direction */}
          <div className="flex gap-2 items-center justify-between">
            <FaSort className={`text-xl ${PRIMARY_COLOR_CLASS}`} />
            <select
              className={`border ${PRIMARY_BORDER_COLOR_CLASS} px-4 py-2 rounded-lg w-full text-sm ${PRIMARY_FOCUS_OUTLINE_CLASS}`}
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="popular">Popular</option>
              <option value="likes">Most Liked</option>
              <option value="comments">Most Commented</option>
            </select>
            <button
              onClick={() => setAscending((v) => !v)}
              className={`text-xs text-white ${PRIMARY_BG_COLOR_CLASS} ${PRIMARY_BORDER_COLOR_CLASS} px-3 py-2 rounded-lg ${PRIMARY_HOVER_BG_COLOR_CLASS} transition-all`}
            >
              {ascending ? "Asc" : "Desc"}
            </button>
          </div>
        </div>
      )}

      {/* Post Grid */}
      <div className={`max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 ${homeView ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} px-2`}>
        {currentPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {!homeView && (
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto px-4 py-10 gap-3">
          <p className="text-sm text-gray-500 text-center sm:text-left">
            Showing {currentPosts.length} of {sortedPosts.length} posts
          </p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <button
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
              className={`text-sm px-4 py-2 rounded border ${PRIMARY_BORDER_COLOR_CLASS} bg-white ${PRIMARY_COLOR_CLASS} ${PRIMARY_HOVER_BG_COLOR_CLASS} hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              « Previous
            </button>
            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => paginate(num + 1)}
                className={`px-3 py-2 rounded text-sm border ${PRIMARY_BORDER_COLOR_CLASS} ${
                  currentPage === num + 1
                    ? `${PRIMARY_BG_COLOR_CLASS} text-white`
                    : `bg-white ${PRIMARY_COLOR_CLASS} hover:bg-blue-100`
                }`}
              >
                {num + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
              className={`text-sm px-4 py-2 rounded border ${PRIMARY_BORDER_COLOR_CLASS} bg-white ${PRIMARY_COLOR_CLASS} ${PRIMARY_HOVER_BG_COLOR_CLASS} hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
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