import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AnnouncementList = () => {
  // Fetch announcements
  const { data: announcements = [], isLoading, isError } = useQuery(
    ["announcements"],
    async () => {
      const res = await axios.get("/announcements");
      return res.data;
    }
  );

  if (isLoading) return <p>Loading announcements...</p>;
  if (isError) return <p>Error loading announcements!</p>;

  return (
    <section className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">
        📢 Announcements
      </h2>

      {announcements.length === 0 ? (
        <p className="text-center text-gray-500">No announcements yet.</p>
      ) : (
        announcements.map(({ _id, authorName, title, description, createdAt }) => (
          <div
            key={_id}
            className="mb-6 p-5 border rounded shadow bg-white"
          >
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Posted by:</span> {authorName || "Unknown"}
            </p>
            <h3 className="text-xl font-semibold text-green-700 mb-2">{title}</h3>
            <p className="text-gray-800 mb-3">{description}</p>
            <p className="text-xs text-gray-400">
              Posted on: {new Date(createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </section>
  );
};

export default AnnouncementList;
