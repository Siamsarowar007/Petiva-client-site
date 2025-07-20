// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import useAxios from "./useAxios";

// export const useVotePost = () => {
//   const axios = useAxios();
//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ postId, userId, voteType }) => {
//       const res = await axios.patch(`/posts/vote/${postId}`, { userId, voteType });
//       return res.data; 
//     },
//     onSuccess: (_data, variables) => {
      
//       qc.invalidateQueries({ queryKey: ["post", variables.postId] });
      
//       qc.invalidateQueries({ queryKey: ["all-posts"] });
//     },
//   });
// };




// hooks/useVotePost.js
// hooks/useVotePost.js (আপনার এই ফাইলটি এডিট করতে হবে)

import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from './useAxios'; // Assuming useAxios returns your private Axios instance

export const useVotePost = () => {
  const privateAxios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, userId, voteType }) => {
      // Send vote to backend
      const res = await privateAxios.patch(`/posts/vote/${postId}`, {
        userId,
        voteType,
      });
      return res.data; // Server should return updated counts and user's new vote status
    },
    // 🔴 FIX 2: Implement optimistic updates for immediate UI feedback
    onMutate: async ({ postId, userId, voteType }) => {
      // Cancel any outgoing refetches for this query
      await queryClient.cancelQueries(['allPosts']);

      // Snapshot the previous value of the 'allPosts' query
      const previousPosts = queryClient.getQueryData(['allPosts']);

      // Optimistically update the cache for 'allPosts'
      queryClient.setQueryData(['allPosts'], (oldPosts) => {
        if (!oldPosts) return [];
        return oldPosts.map((post) => {
          if (post._id === postId) {
            // Calculate new upVote/downVote based on optimistic change
            let newUpVote = post.upVote || 0;
            let newDownVote = post.downVote || 0;
            let newUserVote = voteType; // The new vote status for the user

            const currentVote = post.votes?.[userId]; // User's current vote

            if (voteType === "up") {
              if (currentVote === "up") {
                // Already upvoted, clicking again cancels it
                newUpVote -= 1;
                newUserVote = null;
              } else if (currentVote === "down") {
                // Changing from downvote to upvote
                newDownVote -= 1;
                newUpVote += 1;
              } else {
                // No vote or null, adding upvote
                newUpVote += 1;
              }
            } else if (voteType === "down") {
              if (currentVote === "down") {
                // Already downvoted, clicking again cancels it
                newDownVote -= 1;
                newUserVote = null;
              } else if (currentVote === "up") {
                // Changing from upvote to downvote
                newUpVote -= 1;
                newDownVote += 1;
              } else {
                // No vote or null, adding downvote
                newDownVote += 1;
              }
            }

            return {
              ...post,
              upVote: newUpVote < 0 ? 0 : newUpVote, // Ensure non-negative
              downVote: newDownVote < 0 ? 0 : newDownVote, // Ensure non-negative
              votes: {
                ...post.votes,
                [userId]: newUserVote,
              },
            };
          }
          return post;
        });
      });

      // Return a context object with the snapshot value
      return { previousPosts };
    },
    onError: (err, newVote, context) => {
      // If the mutation fails, use the context to roll back
      if (context?.previousPosts) {
        queryClient.setQueryData(['allPosts'], context.previousPosts);
      }
      console.error("Vote failed:", err);
      alert("Failed to record vote. Please try again."); // User friendly error
    },
    onSettled: () => {
      // Always refetch after error or success: ensures data is in sync with server
      queryClient.invalidateQueries(['allPosts']);
    },
  });
};