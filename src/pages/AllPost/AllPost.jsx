// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   FaThumbsUp,
//   FaThumbsDown,
//   FaCommentDots,
//   FaShareAlt,
//   FaSort,
//   FaFilter,
//   FaSearch,
// } from "react-icons/fa";
// import axios from "axios";
// import Loader from "../../shared/Loader/Loader";

// const AllPost = ({ homeView = false }) => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortBy, setSortBy] = useState("newest");
//   const [ascending, setAscending] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [tags, setTags] = useState([]);
//   const [selectedTag, setSelectedTag] = useState("all");
//   const postsPerPage = homeView ? 6 : 6;

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/all-posts");
//       const postsWithVotes = res.data.map((post) => ({
//         ...post,
//         upVote: post.votes
//           ? Object.values(post.votes).filter((v) => v === "up").length
//           : 0,
//         downVote: post.votes
//           ? Object.values(post.votes).filter((v) => v === "down").length
//           : 0,
//       }));

//       const commentsPromises = postsWithVotes.map((post) =>
//         axios.get(`http://localhost:5000/comments/${post._id}`)
//       );

//       const commentsResponses = await Promise.all(commentsPromises);

//       const finalPosts = postsWithVotes.map((post, idx) => ({
//         ...post,
//         commentCount: commentsResponses[idx].data.length || 0,
//       }));

//       const allTags = ["all", ...new Set(finalPosts.map((post) => post.tag))];

//       setPosts(finalPosts);
//       setTags(allTags);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching posts:", err);
//       setLoading(false);
//     }
//   };

//   const filteredPosts = posts.filter(
//     (post) =>
//       post.title.toLowerCase().includes(searchText.toLowerCase()) &&
//       (selectedTag === "all" || post.tag === selectedTag)
//   );

//   const sortedPosts = [...filteredPosts].sort((a, b) => {
//     const factor = ascending ? 1 : -1;
//     if (sortBy === "likes") return factor * (a.upVote - b.upVote);
//     if (sortBy === "comments") return factor * (a.commentCount - b.commentCount);
//     if (sortBy === "oldest")
//       return factor * (new Date(a.postTime) - new Date(b.postTime));
//     return factor * (new Date(b.postTime) - new Date(a.postTime));
//   });

//   const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   if (loading)
//     return <div className="text-center mt-24 text-xl"><Loader /></div>;

//   return (
//     <div className="min-h-screen w-full mt-16 flex flex-col justify-between px-2 md:px-0">
//       {/* Filter/Sort/Search */}
//       <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4 items-center justify-between mb-6 px-2">
//         <div className="flex gap-2 items-center">
//           <FaSearch className="text-gray-500" />
//           <input
//             type="text"
//             placeholder="Search title..."
//             className="border px-4 py-2 rounded-lg w-full text-sm focus:outline-none"
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//         </div>
//         <div className="flex gap-2 items-center">
//           <FaFilter className="text-gray-500" />
//           <select
//             className="border px-4 py-2 rounded-lg w-full text-sm"
//             value={selectedTag}
//             onChange={(e) => setSelectedTag(e.target.value)}
//           >
//             {tags.map((tag, i) => (
//               <option key={i} value={tag}>
//                 {tag === "all" ? "All Tags" : `${tag}`}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="flex gap-2 items-center justify-between">
//           <FaSort className="text-gray-500" />
//           <select
//             className="border px-4 py-2 rounded-lg w-full text-sm"
//             value={sortBy}
//             onChange={(e) => {
//               setSortBy(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="newest">Newest</option>
//             <option value="oldest">Oldest</option>
//             <option value="likes">Most Liked</option>
//             <option value="comments">Most Commented</option>
//           </select>
//           <button
//             onClick={() => setAscending(!ascending)}
//             className="text-xs text-gray-700 border px-3 py-2 rounded-lg hover:bg-gray-100"
//           >
//             {ascending ? "Asc" : "Desc"}
//           </button>
//         </div>
//       </div>

//       {/* Post List */}
//       <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2">
//         {currentPosts.map((post) => (
//           <motion.div
//             key={post._id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             whileHover={{ scale: 1.02 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Link to={`/post-details/${post._id}`}>
//               <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg h-full p-6 space-y-4 flex flex-col justify-between">
//                 <div className="flex items-start gap-4">
//                   <img
//                     className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-500"
//                     src={post.authorImage || "https://i.ibb.co/VgY9pJf/avatar.png"}
//                     alt={post.authorName}
//                   />
//                   <div className="flex-1">
//                     <h2 className="text-lg font-semibold break-words line-clamp-2">
//                       {post.title}
//                     </h2>
//                     <p className="text-xs text-blue-500">#{post.tag}</p>
//                     <p className="text-sm text-gray-700 line-clamp-3">
//                       {post.description.length > 150 ? (
//                         <>
//                           {post.description.slice(0, 150)}...
//                           <span className="text-blue-600 font-medium ml-1">
//                             Read more
//                           </span>
//                         </>
//                       ) : (
//                         post.description
//                       )}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex justify-between items-center text-sm text-gray-600">
//                   <span>
//                     🕒 {new Date(post.postTime).toLocaleDateString()} by{" "}
//                     <span className="font-semibold">{post.authorName}</span>
//                   </span>
//                   <div className="flex items-center gap-4">
//                     <span className="flex items-center gap-1 text-green-600">
//                       <FaThumbsUp /> {post.upVote}
//                     </span>
//                     <span className="flex items-center gap-1 text-red-500">
//                       <FaThumbsDown /> {post.downVote}
//                     </span>
//                     <span className="flex items-center gap-1 text-blue-500">
//                       <FaCommentDots /> {post.commentCount}
//                     </span>
//                     <FaShareAlt className="text-gray-500" />
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </motion.div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto px-4 py-10 gap-3">
//         <p className="text-sm text-gray-500 text-center sm:text-left">
//           Showing {currentPosts.length} of {posts.length} posts
//         </p>
//         <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => paginate(currentPage - 1)}
//             className="text-sm px-4 py-2 rounded border bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
//           >
//             « Previous
//           </button>
//           {[...Array(totalPages).keys()].map((num) => (
//             <button
//               key={num}
//               onClick={() => paginate(num + 1)}
//               className={`px-3 py-2 rounded text-sm border ${
//                 currentPage === num + 1
//                   ? "bg-blue-500 text-white"
//                   : "bg-white text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               {num + 1}
//             </button>
//           ))}
//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => paginate(currentPage + 1)}
//             className="text-sm px-4 py-2 rounded border bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
//           >
//             Next »
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllPost;

    import React, { useEffect, useState } from "react";
    import { Link } from "react-router-dom";
    import { motion } from "framer-motion";
    import {
      FaThumbsUp,
      FaThumbsDown,
      FaCommentDots,
      FaShareAlt,
      FaSort,
      FaFilter,
      FaSearch,
    } from "react-icons/fa";
    import axios from "axios";
    import Loader from "../../shared/Loader/Loader";

    const AllPost = ({ homeView = false }) => {
      const [posts, setPosts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [currentPage, setCurrentPage] = useState(1);
      const [sortBy, setSortBy] = useState("newest");
      const [ascending, setAscending] = useState(false);
      const [searchText, setSearchText] = useState("");
      const [tags, setTags] = useState([]);
      const [selectedTag, setSelectedTag] = useState("all");
      const postsPerPage = homeView ? 6 : 6;

      useEffect(() => {
        fetchPosts();
      }, []);

      const fetchPosts = async () => {
        try {
          const res = await axios.get("http://localhost:5000/all-posts");
          const postsWithVotes = res.data.map((post) => ({
            ...post,
            upVote: post.votes
              ? Object.values(post.votes).filter((v) => v === "up").length
              : 0,
            downVote: post.votes
              ? Object.values(post.votes).filter((v) => v === "down").length
              : 0,
          }));

          const commentsPromises = postsWithVotes.map((post) =>
            axios.get(`http://localhost:5000/comments/${post._id}`)
          );

          const commentsResponses = await Promise.all(commentsPromises);

          const finalPosts = postsWithVotes.map((post, idx) => ({
            ...post,
            commentCount: commentsResponses[idx].data.length || 0,
          }));

          const allTags = ["all", ...new Set(finalPosts.map((post) => post.tag))];

          setPosts(finalPosts);
          setTags(allTags);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching posts:", err);
          setLoading(false);
        }
      };

      const filteredPosts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchText.toLowerCase()) &&
          (selectedTag === "all" || post.tag === selectedTag)
      );

      const sortedPosts = [...filteredPosts].sort((a, b) => {
        const factor = ascending ? 1 : -1;
        if (sortBy === "likes") return factor * (a.upVote - b.upVote);
        if (sortBy === "comments") return factor * (a.commentCount - b.commentCount);
        if (sortBy === "oldest")
          return factor * (new Date(a.postTime) - new Date(b.postTime));
        return factor * (new Date(b.postTime) - new Date(a.postTime));
      });

      const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

      const paginate = (pageNumber) => setCurrentPage(pageNumber);

      if (loading)
        return <div className="text-center mt-24 text-xl"><Loader /></div>;

      return (
        <div className="min-h-screen w-full mt-16 flex flex-col justify-between px-2 md:px-0">

          {/* Filter/Sort/Search */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4 items-center justify-between mb-6 px-2">
            <div className="flex gap-2 items-center">
              <FaSearch className="text-[#4CA3B8]" />
              <input
                type="text"
                placeholder="Search title..."
                className="border border-[#4CA3B8] px-4 py-2 rounded-lg w-full text-sm focus:outline-[#4CA3B8]"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center">
              <FaFilter className="text-[#4CA3B8]" />
              <select
                className="border border-[#4CA3B8] px-4 py-2 rounded-lg w-full text-sm focus:outline-[#4CA3B8]"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                {tags.map((tag, i) => (
                  <option key={i} value={tag}>
                    {tag === "all" ? "All Tags" : `${tag}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 items-center justify-between">
              <FaSort className="text-[#4CA3B8]" />
              <select
                className="border border-[#4CA3B8] px-4 py-2 rounded-lg w-full text-sm focus:outline-[#4CA3B8]"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="likes">Most Liked</option>
                <option value="comments">Most Commented</option>
              </select>
              <button
                onClick={() => setAscending(!ascending)}
                className="text-xs text-white bg-[#4CA3B8] border border-[#4CA3B8] px-3 py-2 rounded-lg hover:bg-[#3d8aa0] transition-all"
              >
                {ascending ? "Asc" : "Desc"}
              </button>
            </div>
          </div>

          {/* Post List */}
          {/* <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2">
            {currentPosts.map((post) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Link to={`/post-details/${post._id}`}>
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg h-[320px] w-full p-6 space-y-4 flex flex-col justify-between transition-all">
                    <div className="flex items-start gap-4">
                      <img
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-[#4CA3B8]"
                        src={post.authorImage || "https://i.ibb.co/VgY9pJf/avatar.png"}
                        alt={post.authorName}
                      />
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold break-words line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-xs text-[#4CA3B8]">#{post.tag}</p>
                        <p className="text-sm text-gray-700 line-clamp-3">
                          {post.description.length > 150 ? (
                            <>
                              {post.description.slice(0, 150)}...
                              <span className="text-[#4CA3B8] font-medium ml-1">
                                Read more
                              </span>
                            </>
                          ) : (
                            post.description
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>
                        🕒 {new Date(post.postTime).toLocaleDateString()} by{" "}
                        <span className="font-semibold">{post.authorName}</span>
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-[#4CA3B8]">
                          <FaThumbsUp /> {post.upVote}
                        </span>
                        <span className="flex items-center gap-1 text-red-400">
                          <FaThumbsDown /> {post.downVote}
                        </span>
                        <span className="flex items-center gap-1 text-[#4CA3B8]">
                          <FaCommentDots /> {post.commentCount}
                        </span>
                        <FaShareAlt className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div> */}
          <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  {currentPosts.map((post) => (
    <motion.div
      key={post._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/post-details/${post._id}`}>
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 p-5 h-[300px] flex flex-col justify-between group">
          <div className="flex items-start gap-4">
            <img
              className="h-12 w-12 rounded-full object-cover ring-2 ring-[#4CA3B8]"
              src={post.authorImage || "https://i.ibb.co/VgY9pJf/avatar.png"}
              alt={post.authorName}
            />
            <div className="flex-1">
              <h2 className="text-md font-semibold text-gray-800 break-words line-clamp-2 group-hover:text-[#4CA3B8] transition-colors duration-200">
                {post.title}
              </h2>
              <p className="text-xs text-[#4CA3B8] mt-1">#{post.tag}</p>
              <p className="text-sm text-gray-600 line-clamp-3 mt-1">
                {post.description.length > 150 ? (
                  <>
                    {post.description.slice(0, 150)}...
                    <span className="text-[#4CA3B8] font-medium ml-1">
                      Read more
                    </span>
                  </>
                ) : (
                  post.description
                )}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
            <span className="text-xs">
              🕒 {new Date(post.postTime).toLocaleDateString()} by{" "}
              <span className="font-semibold">{post.authorName}</span>
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[#4CA3B8]">
                <FaThumbsUp /> {post.upVote}
              </span>
              <span className="flex items-center gap-1 text-red-400">
                <FaThumbsDown /> {post.downVote}
              </span>
              <span className="flex items-center gap-1 text-[#4CA3B8]">
                <FaCommentDots /> {post.commentCount}
              </span>
              <FaShareAlt className="text-gray-400 hover:text-[#4CA3B8] cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  ))}
</div>


          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto px-4 py-10 gap-3">
            <p className="text-sm text-gray-500 text-center sm:text-left">
              Showing {currentPosts.length} of {posts.length} posts
            </p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <button
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
                className="text-sm px-4 py-2 rounded border border-[#4CA3B8] bg-white text-[#4CA3B8] hover:bg-[#4CA3B8] hover:text-white transition-all disabled:opacity-50"
              >
                « Previous
              </button>
              {[...Array(totalPages).keys()].map((num) => (
                <button
                  key={num}
                  onClick={() => paginate(num + 1)}
                  className={`px-3 py-2 rounded text-sm border ${
                    currentPage === num + 1
                      ? "bg-[#4CA3B8] text-white"
                      : "bg-white text-[#4CA3B8] border-[#4CA3B8] hover:bg-[#4CA3B8]/10"
                  }`}
                >
                  {num + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => paginate(currentPage + 1)}
                className="text-sm px-4 py-2 rounded border border-[#4CA3B8] bg-white text-[#4CA3B8] hover:bg-[#4CA3B8] hover:text-white transition-all disabled:opacity-50"
              >
                Next »
              </button>
            </div>
          </div>
        </div>
      );
    };

    export default AllPost;
