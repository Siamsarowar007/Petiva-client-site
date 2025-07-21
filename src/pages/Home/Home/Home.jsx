



import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PostCard from "../../AllPost/PostCard";
import { FaSearch } from "react-icons/fa";
import Loader from "../../../shared/Loader/Loader";

const Home = () => {
  const [page, setPage] = useState(1);
  const [sortPopular, setSortPopular] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);

 
  const { data, isLoading } = useQuery({
    queryKey: ["posts", page, sortPopular],
    queryFn: async () => {
      const res = await axios.get(
        `/posts-all?page=${page}&limit=5&sort=${sortPopular ? "popularity" : "default"}`
      );
      return res.data;
    },
  });

  
  const handleTagSearch = async (e) => {
    const tag = e.target.value;
    setSearchText(tag);

    if (!tag) {
      setSearchResults(null);
      return;
    }

    try {
      const res = await axios.get(`/posts/search?tag=${tag}`);
      setSearchResults(res.data.length > 0 ? res.data : []);
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">


      <div className="bg-[#1f1f1f] rounded-full px-6 py-4 relative mb-6">
        <div className="flex items-center space-x-3">
          <FaSearch className="text-blue-400 text-lg" />
          <input
            type="text"
            placeholder="Search for Topics...."
            value={searchText}
            onChange={handleTagSearch}
            className="bg-transparent focus:outline-none text-white w-full placeholder:text-gray-400"
          />
        </div>
        <div className="text-sm text-gray-300 mt-2 pl-7">
          Popular topics:{" "}
          <span
            onClick={() => handleTagSearch({ target: { value: "Helpdesk" } })}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Helpdesk
          </span>
          ,{" "}
          <span
            onClick={() => handleTagSearch({ target: { value: "Introduction" } })}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Introduction
          </span>
          ,{" "}
          <span
            onClick={() => handleTagSearch({ target: { value: "Payment" } })}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Payment
          </span>
        </div>
      </div>

    
      {searchResults && (
        <div className="mb-8">
          {searchResults.length > 0 && (
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              🔍 Search by tag to see posts
            </h3>
          )}

          {searchResults.length > 0 ? (
            <div className="grid gap-4">
              {searchResults.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      )}

    
      {!searchResults && (
        <>
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
            <p className="text-center"><Loader></Loader></p>
          ) : (
            <>
              <div className="grid gap-4">
                {data.posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>

              <div className="flex justify-center gap-3 mt-6">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="btn btn-sm"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={data.totalPosts <= page * 5}
                  className="btn btn-sm"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;


