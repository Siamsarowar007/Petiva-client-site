import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PostCard from "./PostCard";


const Home = () => {
  const [page, setPage] = useState(1);
  const [sortPopular, setSortPopular] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["posts", page, sortPopular],
    queryFn: async () => {
      const res = await axios.get(
        `/posts-all?page=${page}&limit=5&sort=${sortPopular ? "popularity" : "default"}`
      );
      return res.data;
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <h2 className="text-2xl font-bold">All Posts</h2>
        <button
          onClick={() => {
            setSortPopular(!sortPopular);
            setPage(1);
          }}
          className="btn btn-outline btn-sm"
        >
          {sortPopular ? "Sort by Recent" : "Sort by Popularity"}
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid gap-4">
            {data.posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          <div className="flex justify-center gap-3 mt-6">
            <button onClick={() => setPage(page - 1)} disabled={page === 1} className="btn btn-sm">Previous</button>
            <button onClick={() => setPage(page + 1)} disabled={data.totalPosts <= page * 5} className="btn btn-sm">Next</button>
          </div>
        </>
      )}
      <div>
      
      </div>
    </div>
    
  );
};


export default Home;
