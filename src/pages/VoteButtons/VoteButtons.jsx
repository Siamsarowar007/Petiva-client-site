import React from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const VoteButtons = ({ post, refetch, user }) => {
  const axios = useAxios();

  const handleVote = async (type) => {
    try {
      await axios.patch(`/vote/${post._id}`, {
        userEmail: user?.email,
        type,
      });
      refetch();
      Swal.fire({
        icon: "success",
        title: "Thanks for your vote!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Vote failed",
        text: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => handleVote("up")}
        className="flex items-center gap-1 text-green-600 font-semibold"
      >
        <FaThumbsUp /> {post.upVote?.length || 0}
      </button>
      <button
        onClick={() => handleVote("down")}
        className="flex items-center gap-1 text-red-500 font-semibold"
      >
        <FaThumbsDown /> {post.downVote?.length || 0}
      </button>
    </div>
  );
};

export default VoteButtons;
