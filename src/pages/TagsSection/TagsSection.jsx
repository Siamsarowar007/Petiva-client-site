
import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../shared/Loader/Loader";

const tags = [
  { value: "cat", label: "Cat" },
  { value: "dog", label: "Dog" },
  { value: "bird", label: "Bird" },
  { value: "vet", label: "Vet" },
  { value: "food", label: "Food" },
  { value: "training", label: "Training" },
  { value: "grooming", label: "Grooming" },
  { value: "adoption", label: "Adoption" },
  { value: "pet-care", label: "Pet Care" },
  { value: "illness", label: "Illness" },
  { value: "vaccination", label: "Vaccination" },
  { value: "behavior", label: "Behavior" },
  { value: "accessories", label: "Accessories" },
  { value: "rescue", label: "Rescue" },
  { value: "nutrition", label: "Nutrition" },
];

const TagsSection = () => {
  const axios = useAxios();
  const [selectedTag, setSelectedTag] = useState("");

  const { data: posts = [], refetch, isLoading } = useQuery({
    queryKey: ["postsByTag", selectedTag],
    queryFn: async () => {
      const res = await axios.get(`/posts/search?tag=${selectedTag}`);
      return res.data;
    },
    enabled: !!selectedTag,
  });

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    refetch();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <title>Tag Section || Petiva</title>
      <h2 className="text-3xl font-extrabold mb-6 text-center text-[#4CA3B8] tracking-wide">
        Browse by Tags
      </h2>

      {/* Tag buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {tags.map((tag) => (
          <button
            key={tag.value}
            onClick={() => handleTagClick(tag.value)}
            className={`
              px-5 py-2 rounded-full border-2 text-sm font-medium transition 
              transform duration-300 ease-in-out
              ${
                selectedTag === tag.value
                  ? "bg-[#4CA3B8] border-[#4CA3B8] text-white shadow-lg shadow-[#4CA3B8]/50 scale-105"
                  : "bg-white border-gray-300 text-[#4CA3B8] hover:bg-[#4CA3B8] hover:border-[#4CA3B8] hover:text-white hover:shadow-md hover:shadow-[#4CA3B8]/40"
              }
              hover:-translate-y-1
            `}
          >
            {tag.label}
          </button>
        ))}
      </div>

      {/* Show Results */}
      {selectedTag && (
        <>
          <h3 className="text-xl font-semibold mb-6 text-gray-700 text-center">
            Showing results for:{" "}
            <span className="text-[#4CA3B8] font-bold">{selectedTag}</span>
          </h3>

          {isLoading ? (
            <p className="text-center text-gray-500 animate-pulse"><Loader></Loader></p>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-400 italic">No posts found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
                  style={{ animation: "fadeInUp 0.5s ease forwards" }}
                >
                  <h4 className="text-2xl font-semibold mb-2 text-[#1E293B]">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 mb-3 line-clamp-3">
                    {post.description}
                  </p>
                  <p className="text-sm text-[#4CA3B8] font-medium mb-1">
                    Tag: <span className="text-[#1C7CA1]">{post.tag}</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Posted by: {post.authorName} |{" "}
                    {new Date(post.postTime).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
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

        /* For truncating description to 3 lines */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Responsive tweaks */
        @media (max-width: 640px) {
          h2 {
            font-size: 1.75rem;
          }
          h4 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TagsSection;

