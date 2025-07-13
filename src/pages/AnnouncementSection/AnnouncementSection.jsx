import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const AnnouncementSection = () => {
  const axios = useAxios();

  const { data: announcements = [], isLoading, isError } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axios.get("/announcements");
      return res.data;
    },
  });

  const [expandedId, setExpandedId] = useState(null);

  if (isLoading) return <p className="text-center py-10">Loading announcements...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load announcements.</p>;
  if (announcements.length === 0) return <p className="text-center py-10">No announcements found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-orange-600 text-center">📢 Announcements</h2>

      {/* Horizontal slider */}
      <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-200">
        {announcements.map((item) => (
          <div
            key={item._id}
            className={`flex-shrink-0 w-64 bg-white rounded-lg shadow cursor-pointer border ${
              expandedId === item._id ? "border-orange-500" : "border-transparent"
            }`}
            onClick={() => setExpandedId(expandedId === item._id ? null : item._id)}
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold text-orange-600 mb-1">{item.title}</h3>
              <p className="text-gray-700 line-clamp-3">{item.description}</p>
              <p className="mt-2 text-xs text-gray-400">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded details */}
      {expandedId && (
        <div className="mt-8 bg-white rounded-lg shadow p-6 max-w-4xl mx-auto border border-orange-500">
          {(() => {
            const selected = announcements.find((a) => a._id === expandedId);
            if (!selected) return null;
            return (
              <>
                <h2 className="text-2xl font-bold text-orange-600 mb-2">{selected.title}</h2>
                <p className="text-gray-700 whitespace-pre-line mb-4">{selected.description}</p>
                <p className="text-sm text-gray-500">
                  Posted on {new Date(selected.createdAt).toLocaleString()}
                </p>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default AnnouncementSection;
