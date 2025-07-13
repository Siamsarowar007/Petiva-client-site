import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const CommentCount = ({ postTitle }) => {
  const { data } = useQuery({
    queryKey: ["commentCount", postTitle],
    queryFn: async () => {
      const res = await axios.get(`/comments/count/${postTitle}`);
      return res.data.count;
    },
  });

  return <span>💬 {data || 0} Comments</span>;
};

const PostCard = ({ post }) => {
  return (
    <div className="border p-4 rounded shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <img src={post.authorImage} className="w-10 h-10 rounded-full" />
        <div>
          <h2 className="font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-500">{post.tag}</p>
          <p className="text-xs text-gray-400">
            {new Date(post.postTime).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="text-sm flex gap-4 mt-2 text-gray-600">
        <span>👍 {post.upVote}</span>
        <span>👎 {post.downVote}</span>
        <span>Total: {post.upVote - post.downVote}</span>
        <CommentCount postTitle={post.title} />
      </div>
    </div>
  );
};

export default PostCard;
