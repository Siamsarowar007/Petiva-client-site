// AddPost.jsx

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2"; // ✅ SweetAlert2 import

const AddPost = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axios = useAxios();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: null,
  });

  const tagOptions = [
    { value: "pet-care", label: "Pet Care" },
    { value: "adoption", label: "Adoption" },
    { value: "nutrition", label: "Nutrition" },
    { value: "training", label: "Training" },
  ];

  // ✅ Fetch user’s post count using TanStack Query
  const {
    data: postCountData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["postCount", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/posts/count?email=${user.email}`);
      return res.data.count;
    },
    enabled: !!user?.email,
  });

  const postCount = postCountData || 0;

  // ✅ Submit Handler with SweetAlert2
  const handleSubmit = async (e) => {
    e.preventDefault();

    const post = {
      authorName: user.displayName,
      authorEmail: user.email,
      authorImage: user.photoURL,
      title: formData.title,
      description: formData.description,
      tag: formData.tag?.value,
      upVote: 0,
      downVote: 0,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axios.post("/posts", post);
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Post Added!",
          text: "Your post was submitted successfully.",
          icon: "success",
          confirmButtonText: "Okay",
        });
        navigate("/dashboard/my-posts");
      }
    } catch (error) {
      console.error("Failed to add post", error);
      Swal.fire({
        title: "Error!",
        text: "Post submission failed. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // ✅ Loading / Error / Post Limit Message
  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load post count</p>;

  if (postCount >= 5) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
          You’ve reached the limit of 5 posts.
        </h2>
        <button
          onClick={() => navigate("/membership")}
          className="btn btn-warning"
        >
          Become a Member
        </button>
      </div>
    );
  }

  // ✅ Post Form Rendering
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Post</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Author Image */}
        <div>
          <label className="font-medium">Author Image</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={user?.photoURL}
            disabled
          />
        </div>

        {/* Author Name */}
        <div>
          <label className="font-medium">Author Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={user?.displayName}
            disabled
          />
        </div>

        {/* Author Email */}
        <div>
          <label className="font-medium">Author Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={user?.email}
            disabled
          />
        </div>

        {/* Post Title */}
        <div>
          <label className="font-medium">Post Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        {/* Tag Dropdown */}
        <div>
          <label className="font-medium">Select Tag</label>
          <Select
            options={tagOptions}
            onChange={(selected) => setFormData({ ...formData, tag: selected })}
            value={formData.tag}
            required
          />
        </div>

        {/* Description */}
        <div className="lg:col-span-2">
          <label className="font-medium">Description</label>
          <textarea
            className="textarea textarea-bordered w-full min-h-[120px]"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          ></textarea>
        </div>

        {/* Upvote / Downvote Preview (not editable) */}
        <div>
          <label className="font-medium">UpVote (default)</label>
          <input type="number" className="input input-bordered w-full" value={0} disabled />
        </div>
        <div>
          <label className="font-medium">DownVote (default)</label>
          <input type="number" className="input input-bordered w-full" value={0} disabled />
        </div>

        {/* Submit Button */}
        <div className="lg:col-span-2 text-right">
          <button type="submit" className="btn btn-primary">
            Submit Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
