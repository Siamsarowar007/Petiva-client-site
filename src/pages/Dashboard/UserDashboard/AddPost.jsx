import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";

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
  const isLimitReached = postCount >= 5;

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
      postTime: new Date().toISOString(),
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

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load post count</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col items-center gap-2 mb-8">
        <img
          src={user?.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-primary object-cover"
        />
        <h3 className="text-xl font-semibold text-gray-800">{user?.displayName}</h3>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center">Add New Post</h2>

      {isLimitReached && (
        <div className="mb-6 text-center text-red-500 font-medium">
          ⚠️ You’ve reached the limit of 5 posts.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
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

        <div>
          <label className="font-medium">Select Tag</label>
          <Select
            options={tagOptions}
            onChange={(selected) => setFormData({ ...formData, tag: selected })}
            value={formData.tag}
            required
          />
        </div>

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

        <div>
          <label className="font-medium">UpVote (default)</label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={0}
            disabled
          />
        </div>
        <div>
          <label className="font-medium">DownVote (default)</label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={0}
            disabled
          />
        </div>

        <div className="lg:col-span-2 w-full">
          {isLimitReached ? (
            <button
              type="button"
              onClick={() => navigate("/membership")}
              className="btn btn-warning w-full"
            >
              Become a Member
            </button>
          ) : (
            <button type="submit" className="btn btn-primary w-full">
              Submit Post
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddPost;
