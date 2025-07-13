import React, { useState, useEffect, useContext } from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { FaBell } from "react-icons/fa";

const AnnouncementNotification = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxios();
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);

  // Fetch announcements + unread count for this user
  const { data, isLoading, refetch } = useQuery(
    ["user-announcements", user?.uid],
    async () => {
      if (!user) return { all: [], unread: [], unreadCount: 0 };
      const res = await axios.get("/user/announcements");
      return res.data;
    },
    {
      enabled: !!user, // only fetch if user exists
      refetchOnWindowFocus: false,
    }
  );

  // Mark given announcements as read
  const markAsRead = async (ids) => {
    if (!ids.length) return;
    try {
      await axios.post("/user/announcements/read", {
        announcementIds: ids,
      });
      // Refetch announcements after marking read
      queryClient.invalidateQueries(["user-announcements", user?.uid]);
    } catch (err) {
      console.error("Failed to mark announcements as read", err);
    }
  };

  // When modal opens, mark all unread as read
  useEffect(() => {
    if (modalOpen && data?.unread?.length) {
      const unreadIds = data.unread.map((a) => a._id);
      markAsRead(unreadIds);
    }
  }, [modalOpen, data]);

  if (!user) return null;

  return (
    <>
      <button
        className="relative btn btn-ghost text-xl"
        title="Notifications"
        onClick={() => setModalOpen(true)}
      >
        <FaBell />
        {data?.unreadCount > 0 && (
          <span className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded-full px-1.5 py-0.5">
            {data.unreadCount}
          </span>
        )}
      </button>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Announcements</h2>

            {isLoading ? (
              <p>Loading...</p>
            ) : data?.all?.length === 0 ? (
              <p>No announcements available.</p>
            ) : (
              <ul className="space-y-4">
                {data.all.map((a) => {
                  const isUnread = data.unread.some(
                    (unread) => unread._id === a._id
                  );
                  return (
                    <li
                      key={a._id}
                      className={`p-3 border rounded cursor-pointer ${
                        isUnread ? "bg-yellow-50 border-yellow-400" : "bg-gray-50 border-gray-300"
                      }`}
                    >
                      <h3 className="font-semibold text-lg">{a.title}</h3>
                      <p className="text-sm text-gray-600 mb-1">{a.description}</p>
                      <p className="text-xs text-gray-400">
                        By: {a.authorName} |{" "}
                        {new Date(a.createdAt).toLocaleString()}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}

            <button
              onClick={() => setModalOpen(false)}
              className="mt-6 btn btn-primary w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnouncementNotification;
