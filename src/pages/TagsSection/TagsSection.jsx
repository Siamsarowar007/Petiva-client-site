import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

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
      <h2 className="text-2xl font-bold mb-4 text-center">Browse by Tags</h2>

      {/* Tag buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {tags.map((tag) => (
          <button
            key={tag.value}
            onClick={() => handleTagClick(tag.value)}
            className={`px-4 py-2 rounded-full border text-sm transition-all 
              ${
                selectedTag === tag.value
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
              }`}
          >
            {tag.label}
          </button>
        ))}
      </div>

      {/* Show Results */}
      {selectedTag && (
        <>
          <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
            Showing results for: <span className="text-indigo-600">{selectedTag}</span>
          </h3>

          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts found.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="border rounded-lg p-4 shadow hover:shadow-md transition"
                >
                  <h4 className="text-xl font-bold mb-1 text-gray-800">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {post.description.slice(0, 100)}...
                  </p>
                  <p className="text-xs text-gray-500 mb-1">
                    Tag: <span className="text-indigo-500">{post.tag}</span>
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
    </div>
  );
};

export default TagsSection;
