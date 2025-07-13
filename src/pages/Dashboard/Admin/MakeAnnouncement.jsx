import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";

const MakeAnnouncement = () => {
  const axios = useAxios();
  const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;

  const [announcement, setAnnouncement] = useState({
    authorName: "",
    title: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const { data: announcements = [], refetch } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axios.get("/announcements");
      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
          formData
        );

        imageUrl = uploadRes?.data?.data?.url;

        if (!imageUrl) {
          return Swal.fire("Image Upload Failed", "Please try again", "error");
        }
      }

      const payload = {
        authorName: announcement.authorName,
        authorImage: imageUrl || "", // ✅ image optional
        title: announcement.title,
        description: announcement.description,
        createdAt: new Date().toISOString(),
      };

      if (editingId) {
        await axios.put(`/announcements/${editingId}`, payload);
        Swal.fire("Updated!", "Announcement updated successfully.", "success");
      } else {
        await axios.post("/announcements", payload);
        Swal.fire("Success!", "Announcement posted successfully.", "success");
      }

      setEditingId(null);
      setAnnouncement({ authorName: "", title: "", description: "" });
      setImageFile(null);
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setAnnouncement({
      authorName: item.authorName,
      title: item.title,
      description: item.description,
    });
    setImageFile(null);
    Swal.fire("Edit Mode", "You're editing the announcement", "info");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`/announcements/${id}`);
      Swal.fire("Deleted!", "Announcement has been deleted.", "success");
      refetch();
    } catch (err) {
      Swal.fire("Error!", "Could not delete.", "error");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setAnnouncement({ authorName: "", title: "", description: "" });
    setImageFile(null);
  };

  const handleImageClick = (url) => {
    Swal.fire({
      imageUrl: url,
      imageAlt: "Author Image",
      showCloseButton: true,
      showConfirmButton: false,
      background: "#fefefe",
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2
        className={`text-3xl font-bold text-center mb-6 ${
          editingId ? "text-yellow-600" : "text-gray-800"
        }`}
      >
        {editingId ? "✏️ Editing Announcement" : "📢 Make Announcement"}
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <div>
          <label className="font-medium block">Your Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={announcement.authorName}
            onChange={(e) =>
              setAnnouncement({ ...announcement, authorName: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="font-medium block">Upload Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <div>
          <label className="font-medium block">Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={announcement.title}
            onChange={(e) =>
              setAnnouncement({ ...announcement, title: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="font-medium block">Description</label>
          <textarea
            className="textarea textarea-bordered w-full min-h-[120px]"
            value={announcement.description}
            onChange={(e) =>
              setAnnouncement({
                ...announcement,
                description: e.target.value,
              })
            }
            required
          ></textarea>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className={`btn w-full ${
              editingId ? "btn-warning" : "btn-primary"
            }`}
          >
            {editingId ? "Update Announcement" : "Post Announcement"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="btn btn-ghost w-full"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Announcements */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">All Announcements</h3>
        {announcements.length === 0 ? (
          <p className="text-gray-500">No announcements yet.</p>
        ) : (
          <div className="space-y-4">
            {announcements.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded shadow border relative flex gap-4 items-start"
              >
                {/* Image (rectangle with click to enlarge) */}
                {item.authorImage && (
                  <img
                    src={item.authorImage}
                    alt="Author"
                    onClick={() => handleImageClick(item.authorImage)}
                    className="w-28 h-20 object-cover border cursor-pointer"
                  />
                )}

                <div className="flex-1">
                  <h4 className="text-lg font-bold">{item.title}</h4>
                  <p className="text-gray-700 mt-1 mb-2">{item.description}</p>
                  <p className="text-sm text-gray-500">
                    Author: {item.authorName} |{" "}
                    {new Date(item.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>

                <div className="absolute top-4 right-4 flex gap-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MakeAnnouncement;
