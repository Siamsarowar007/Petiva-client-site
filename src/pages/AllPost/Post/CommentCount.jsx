import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";


const CommentCount = ({ postId }) => {
  const axios = useAxios();

  const { data } = useQuery({
    queryKey: ["commentCount", postId],
    enabled: !!postId,
    queryFn: async () => {
      const res = await axios.get(`/comments/${postId}`);
      return Array.isArray(res.data) ? res.data.length : 0;
    },
  });

  return <span>{data ?? 0}</span>;
};

export default CommentCount;
