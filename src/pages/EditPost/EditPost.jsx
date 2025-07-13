import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const EditPost = () => {
  const { id } = useParams();
  const axios = useAxios();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch post details by ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setPost(res.data);
      } catch (error) {
        Swal.fire("Error", "Failed to load post", "error");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, axios]);

  // Handle form input changes safely
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  // Handle form submission for updating post
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post) return;

    try {
      await axios.patch(`/posts/${id}`, {
        title: post.title,
        description: post.description,
        tag: post.tag,
      });

      Swal.fire("Success", "Post updated successfully!", "success").then(() => {
        navigate("/dashboard/my-posts");
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update post", "error");
    }
  };

  if (loading) return <div className="text-center py-10">Loading post...</div>;

  if (!post) return <div className="text-center py-10">Post not found.</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={post.title || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={post.description || ""}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            placeholder="Description"
            required
          />
        </div>

        {/* Tag */}
        <div>
          <label htmlFor="tag" className="block font-medium mb-1">
            Tag
          </label>
          <input
            id="tag"
            type="text"
            name="tag"
            value={post.tag || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Tag"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPost;
