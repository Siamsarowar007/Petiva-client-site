import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "./useAxios";

export const useVotePost = () => {
  const axios = useAxios();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, userId, voteType }) => {
      const res = await axios.patch(`/posts/vote/${postId}`, { userId, voteType });
      return res.data; 
    },
    onSuccess: (_data, variables) => {
      
      qc.invalidateQueries({ queryKey: ["post", variables.postId] });
      
      qc.invalidateQueries({ queryKey: ["all-posts"] });
    },
  });
};
