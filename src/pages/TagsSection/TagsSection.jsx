// src/components/TagsSection.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
import useAxios from "../../hooks/useAxios";
import Loader from "../../shared/Loader/Loader";
import { FaTimesCircle } from "react-icons/fa"; // 🔴 Changed to FaTimesCircle for a standard delete look

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
  { value: "accessories", "label": "Accessories" },
  { value: "rescue", label: "Rescue" },
  { value: "nutrition", label: "Nutrition" },
];

const TagsSection = () => {
  const axios = useAxios();
  const [selectedTag, setSelectedTag] = useState("");
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  const { data: posts = [], refetch, isLoading } = useQuery({
    queryKey: ["postsByTag", selectedTag],
    queryFn: async () => {
      const res = await axios.get(`/posts/search?tag=${selectedTag}`);
      return res.data;
    },
    enabled: !!selectedTag,
  });

  const handleTagClick = (tagValue) => {
    setSelectedTag(tagValue);
    refetch();
    setIsMarqueePaused(true);
  };

  const handleClearTag = () => {
    setSelectedTag("");
    setIsMarqueePaused(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-4xl font-extrabold mb-6 text-center text-[#4CA3B8] tracking-wide">
        Browse by Tags
      </h2>

      <div className="mb-10 relative">
        <Marquee
          gradient={true}
          gradientWidth={50}
          gradientColor={[255, 255, 255]}
          speed={30}
          pauseOnHover={true}
          play={!isMarqueePaused}
          onMouseLeave={() => {
            if (!selectedTag) {
              setIsMarqueePaused(false);
            }
          }}
          className="py-2"
        >
          {tags.map((tag) => (
            <button
              key={tag.value}
              onClick={() => handleTagClick(tag.value)}
              className={`
                px-5 py-2 rounded-full border-2 text-sm font-medium transition
                transform duration-300 ease-in-out whitespace-nowrap mx-2
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
        </Marquee>

        {selectedTag && (
          <button
            onClick={handleClearTag}
            className="absolute right-0  top-full mt-2 mr-4 p-2
                       bg-gray-200 text-gray-600 rounded-full shadow-md
                       hover:bg-gray-300 hover:text-gray-800 transition-colors duration-300
                       flex items-center gap-1 z-10"
          >
            <FaTimesCircle className="text-xl" /> 
            <span className="text-sm hidden sm:inline">Clear Tag</span>
          </button>
        )}
      </div>

     
      {selectedTag && (
        <>
          <h3 className="text-xl font-semibold mb-6 text-[#4CA3B8] text-center">
            Showing results for:{" "}
            <span className="text-[#4CA3B8] font-bold">{selectedTag}</span>
          </h3>

          {isLoading ? (
            <p className="text-center text-gray-500 animate-pulse"><Loader /></p>
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

    
      <style>{`
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
      `}</style>
    </div>
  );
};

export default TagsSection;