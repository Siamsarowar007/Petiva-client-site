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

//     import React, { useEffect, useState } from "react";
//     import { Link } from "react-router-dom";
//     import { motion } from "framer-motion";
//     import {
//       FaThumbsUp,
//       FaThumbsDown,
//       FaCommentDots,
//       FaShareAlt,
//       FaSort,
//       FaFilter,
//       FaSearch,
//     } from "react-icons/fa";
//     import axios from "axios";
//     import Loader from "../../shared/Loader/Loader";

//     const AllPost = ({ homeView = false }) => {
//       const [posts, setPosts] = useState([]);
//       const [loading, setLoading] = useState(true);
//       const [currentPage, setCurrentPage] = useState(1);
//       const [sortBy, setSortBy] = useState("newest");
//       const [ascending, setAscending] = useState(false);
//       const [searchText, setSearchText] = useState("");
//       const [tags, setTags] = useState([]);
//       const [selectedTag, setSelectedTag] = useState("all");
//       const postsPerPage = homeView ? 6 : 6;

//       useEffect(() => {
//         fetchPosts();
//       }, []);

//       const fetchPosts = async () => {
//         try {
//           const res = await axios.get("http://localhost:5000/all-posts");
//           const postsWithVotes = res.data.map((post) => ({
//             ...post,
//             upVote: post.votes
//               ? Object.values(post.votes).filter((v) => v === "up").length
//               : 0,
//             downVote: post.votes
//               ? Object.values(post.votes).filter((v) => v === "down").length
//               : 0,
//           }));

//           const commentsPromises = postsWithVotes.map((post) =>
//             axios.get(`http://localhost:5000/comments/${post._id}`)
//           );

//           const commentsResponses = await Promise.all(commentsPromises);

//           const finalPosts = postsWithVotes.map((post, idx) => ({
//             ...post,
//             commentCount: commentsResponses[idx].data.length || 0,
//           }));

//           const allTags = ["all", ...new Set(finalPosts.map((post) => post.tag))];

//           setPosts(finalPosts);
//           setTags(allTags);
//           setLoading(false);
//         } catch (err) {
//           console.error("Error fetching posts:", err);
//           setLoading(false);
//         }
//       };

//       const filteredPosts = posts.filter(
//         (post) =>
//           post.title.toLowerCase().includes(searchText.toLowerCase()) &&
//           (selectedTag === "all" || post.tag === selectedTag)
//       );

//       const sortedPosts = [...filteredPosts].sort((a, b) => {
//         const factor = ascending ? 1 : -1;
//         if (sortBy === "likes") return factor * (a.upVote - b.upVote);
//         if (sortBy === "comments") return factor * (a.commentCount - b.commentCount);
//         if (sortBy === "oldest")
//           return factor * (new Date(a.postTime) - new Date(b.postTime));
//         return factor * (new Date(b.postTime) - new Date(a.postTime));
//       });

//       const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
//       const indexOfLastPost = currentPage * postsPerPage;
//       const indexOfFirstPost = indexOfLastPost - postsPerPage;
//       const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

//       const paginate = (pageNumber) => setCurrentPage(pageNumber);

//       if (loading)
//         return <div className="text-center mt-24 text-xl"><Loader /></div>;

//       return (
//         <div className="min-h-screen w-full mt-16 flex flex-col justify-between px-2 md:px-0">

//           {/* Filter/Sort/Search */}
//           <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4 items-center justify-between mb-6 px-2">
//             <div className="flex gap-2 items-center">
//               <FaSearch className="text-[#4CA3B8]" />
//               <input
//                 type="text"
//                 placeholder="Search title..."
//                 className="border border-[#4CA3B8] px-4 py-2 rounded-lg w-full text-sm focus:outline-[#4CA3B8]"
//                 value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//               />
//             </div>
//             <div className="flex gap-2 items-center">
//               <FaFilter className="text-[#4CA3B8]" />
//               <select
//                 className="border border-[#4CA3B8] px-4 py-2 rounded-lg w-full text-sm focus:outline-[#4CA3B8]"
//                 value={selectedTag}
//                 onChange={(e) => setSelectedTag(e.target.value)}
//               >
//                 {tags.map((tag, i) => (
//                   <option key={i} value={tag}>
//                     {tag === "all" ? "All Tags" : `${tag}`}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex gap-2 items-center justify-between">
//               <FaSort className="text-[#4CA3B8]" />
//               <select
//                 className="border border-[#4CA3B8] px-4 py-2 rounded-lg w-full text-sm focus:outline-[#4CA3B8]"
//                 value={sortBy}
//                 onChange={(e) => {
//                   setSortBy(e.target.value);
//                   setCurrentPage(1);
//                 }}
//               >
//                 <option value="newest">Newest</option>
//                 <option value="oldest">Oldest</option>
//                 <option value="likes">Most Liked</option>
//                 <option value="comments">Most Commented</option>
//               </select>
//               <button
//                 onClick={() => setAscending(!ascending)}
//                 className="text-xs text-white bg-[#4CA3B8] border border-[#4CA3B8] px-3 py-2 rounded-lg hover:bg-[#3d8aa0] transition-all"
//               >
//                 {ascending ? "Asc" : "Desc"}
//               </button>
//             </div>
//           </div>

//           {/* Post List */}
//           {/* <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2">
//             {currentPosts.map((post) => (
//               <motion.div
//                 key={post._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 whileHover={{ scale: 1.02 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Link to={`/post-details/${post._id}`}>
//                   <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg h-[320px] w-full p-6 space-y-4 flex flex-col justify-between transition-all">
//                     <div className="flex items-start gap-4">
//                       <img
//                         className="h-12 w-12 rounded-full object-cover ring-2 ring-[#4CA3B8]"
//                         src={post.authorImage || "https://i.ibb.co/VgY9pJf/avatar.png"}
//                         alt={post.authorName}
//                       />
//                       <div className="flex-1">
//                         <h2 className="text-lg font-semibold break-words line-clamp-2">
//                           {post.title}
//                         </h2>
//                         <p className="text-xs text-[#4CA3B8]">#{post.tag}</p>
//                         <p className="text-sm text-gray-700 line-clamp-3">
//                           {post.description.length > 150 ? (
//                             <>
//                               {post.description.slice(0, 150)}...
//                               <span className="text-[#4CA3B8] font-medium ml-1">
//                                 Read more
//                               </span>
//                             </>
//                           ) : (
//                             post.description
//                           )}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex justify-between items-center text-sm text-gray-600">
//                       <span>
//                         🕒 {new Date(post.postTime).toLocaleDateString()} by{" "}
//                         <span className="font-semibold">{post.authorName}</span>
//                       </span>
//                       <div className="flex items-center gap-4">
//                         <span className="flex items-center gap-1 text-[#4CA3B8]">
//                           <FaThumbsUp /> {post.upVote}
//                         </span>
//                         <span className="flex items-center gap-1 text-red-400">
//                           <FaThumbsDown /> {post.downVote}
//                         </span>
//                         <span className="flex items-center gap-1 text-[#4CA3B8]">
//                           <FaCommentDots /> {post.commentCount}
//                         </span>
//                         <FaShareAlt className="text-gray-500" />
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div> */}
//           <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//   {currentPosts.map((post) => (
//     <motion.div
//       key={post._id}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       whileHover={{ scale: 1.02 }}
//       transition={{ duration: 0.3 }}
//     >
//       <Link to={`/post-details/${post._id}`}>
//         <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 p-5 h-[300px] flex flex-col justify-between group">
//           <div className="flex items-start gap-4">
//             <img
//               className="h-12 w-12 rounded-full object-cover ring-2 ring-[#4CA3B8]"
//               src={post.authorImage || "https://i.ibb.co/VgY9pJf/avatar.png"}
//               alt={post.authorName}
//             />
//             <div className="flex-1">
//               <h2 className="text-md font-semibold text-gray-800 break-words line-clamp-2 group-hover:text-[#4CA3B8] transition-colors duration-200">
//                 {post.title}
//               </h2>
//               <p className="text-xs text-[#4CA3B8] mt-1">#{post.tag}</p>
//               <p className="text-sm text-gray-600 line-clamp-3 mt-1">
//                 {post.description.length > 150 ? (
//                   <>
//                     {post.description.slice(0, 150)}...
//                     <span className="text-[#4CA3B8] font-medium ml-1">
//                       Read more
//                     </span>
//                   </>
//                 ) : (
//                   post.description
//                 )}
//               </p>
//             </div>
//           </div>
//           <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
//             <span className="text-xs">
//               🕒 {new Date(post.postTime).toLocaleDateString()} by{" "}
//               <span className="font-semibold">{post.authorName}</span>
//             </span>
//             <div className="flex items-center gap-3">
//               <span className="flex items-center gap-1 text-[#4CA3B8]">
//                 <FaThumbsUp /> {post.upVote}
//               </span>
//               <span className="flex items-center gap-1 text-red-400">
//                 <FaThumbsDown /> {post.downVote}
//               </span>
//               <span className="flex items-center gap-1 text-[#4CA3B8]">
//                 <FaCommentDots /> {post.commentCount}
//               </span>
//               <FaShareAlt className="text-gray-400 hover:text-[#4CA3B8] cursor-pointer transition-colors" />
//             </div>
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   ))}
// </div>


//           {/* Pagination */}
//           <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto px-4 py-10 gap-3">
//             <p className="text-sm text-gray-500 text-center sm:text-left">
//               Showing {currentPosts.length} of {posts.length} posts
//             </p>
//             <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
//               <button
//                 disabled={currentPage === 1}
//                 onClick={() => paginate(currentPage - 1)}
//                 className="text-sm px-4 py-2 rounded border border-[#4CA3B8] bg-white text-[#4CA3B8] hover:bg-[#4CA3B8] hover:text-white transition-all disabled:opacity-50"
//               >
//                 « Previous
//               </button>
//               {[...Array(totalPages).keys()].map((num) => (
//                 <button
//                   key={num}
//                   onClick={() => paginate(num + 1)}
//                   className={`px-3 py-2 rounded text-sm border ${
//                     currentPage === num + 1
//                       ? "bg-[#4CA3B8] text-white"
//                       : "bg-white text-[#4CA3B8] border-[#4CA3B8] hover:bg-[#4CA3B8]/10"
//                   }`}
//                 >
//                   {num + 1}
//                 </button>
//               ))}
//               <button
//                 disabled={currentPage === totalPages}
//                 onClick={() => paginate(currentPage + 1)}
//                 className="text-sm px-4 py-2 rounded border border-[#4CA3B8] bg-white text-[#4CA3B8] hover:bg-[#4CA3B8] hover:text-white transition-all disabled:opacity-50"
//               >
//                 Next »
//               </button>
//             </div>
//           </div>
//         </div>
//       );
//     };

//     export default AllPost;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Loader from "../../shared/Loader/Loader";
// import PostCard from "./Post/PostCard";


// const AllPost = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/all-posts");
//       const postsWithVotes = res.data.map((post) => {
//         const votes = post.votes || {};
//         const upVote = Object.values(votes).filter((v) => v === "up").length;
//         const downVote = Object.values(votes).filter((v) => v === "down").length;
//         return { ...post, upVote, downVote };
//       });
//       setPosts(postsWithVotes);
//     } catch (err) {
//       console.error("Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="mt-16 max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//       {posts.map((post) => (
//         <Link key={post._id} to={`/post-details/${post._id}`}>
//           <PostCard post={post} />
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default AllPost;



// ******************************************
// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Loader from "../../shared/Loader/Loader";
// import PostCard from "./Post/PostCard";


// const POSTS_PER_PAGE = 6;

// const AllPost = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/all-posts");
//       const postsWithVotes = res.data.map((post) => {
//         const votes = post.votes || {};
//         const upVote = Object.values(votes).filter((v) => v === "up").length;
//         const downVote = Object.values(votes).filter((v) => v === "down").length;
//         return { ...post, upVote, downVote };
//       });
//       setPosts(postsWithVotes);
//     } catch (err) {
//       console.error("Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Pagination derived values
//   const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

//   const currentPosts = useMemo(() => {
//     const start = (currentPage - 1) * POSTS_PER_PAGE;
//     const end = start + POSTS_PER_PAGE;
//     return posts.slice(start, end);
//   }, [posts, currentPage]);

//   const paginate = (pageNumber) => {
//     if (pageNumber < 1 || pageNumber > totalPages) return;
//     setCurrentPage(pageNumber);
//     // পেজ চেঞ্জে স্ক্রল টপে নিয়ে যাও (UX)
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="mt-16 w-full">
//       {/* Cards */}
//       <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2">
//         {currentPosts.map((post) => (
//           <Link key={post._id} to={`/post-details/${post._id}`}>
//             <PostCard post={post} fixedHeight /> {/* fixedHeight prop নিচে দেখানো আছে */}
//           </Link>
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
//             className="text-sm px-4 py-2 rounded border border-[#4CA3B8] bg-white text-[#4CA3B8] hover:bg-[#4CA3B8] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             « Previous
//           </button>
//           {[...Array(totalPages).keys()].map((num) => (
//             <button
//               key={num}
//               onClick={() => paginate(num + 1)}
//               className={`px-3 py-2 rounded text-sm border ${
//                 currentPage === num + 1
//                   ? "bg-[#4CA3B8] text-white border-[#4CA3B8]"
//                   : "bg-white text-[#4CA3B8] border-[#4CA3B8] hover:bg-[#4CA3B8]/10"
//               }`}
//             >
//               {num + 1}
//             </button>
//           ))}
//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => paginate(currentPage + 1)}
//             className="text-sm px-4 py-2 rounded border border-[#4CA3B8] bg-white text-[#4CA3B8] hover:bg-[#4CA3B8] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Next »
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllPost;


// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   FaThumbsUp,
//   FaThumbsDown,
//   FaCommentDots,
//   FaSort,
//   FaFilter,
//   FaSearch,
//   FaShareAlt,
// } from "react-icons/fa";
// import axios from "axios";
// import Loader from "../../shared/Loader/Loader";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// const DEFAULT_PER_PAGE = 6;
// const FULL_PER_PAGE = 6;

// const AllPost = ({ homeView = false }) => {
//   const [posts, setPosts] = useState([]);
//   const [tags, setTags] = useState(["all"]);
//   const [loading, setLoading] = useState(true);

//   const [searchText, setSearchText] = useState("");
//   const [selectedTag, setSelectedTag] = useState("all");

//   const [sortBy, setSortBy] = useState("newest");
//   const [ascending, setAscending] = useState(false);

//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = homeView ? DEFAULT_PER_PAGE : FULL_PER_PAGE;

//   useEffect(() => {
//     const fetchPosts = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(`${API_BASE}/all-posts`);
//         const rawPosts = res.data || [];

//         const postsWithVotes = rawPosts.map((post) => {
//           const votes = post.votes || {};
//           const upVote = Object.values(votes).filter((v) => v === "up").length;
//           const downVote = Object.values(votes).filter((v) => v === "down").length;
//           return { ...post, upVote, downVote };
//         });

//         const commentPromises = postsWithVotes.map((p) =>
//           axios
//             .get(`${API_BASE}/comments/${p._id}`)
//             .then((r) => r.data.length || 0)
//             .catch(() => 0)
//         );
//         const commentCounts = await Promise.all(commentPromises);

//         const finalPosts = postsWithVotes.map((p, idx) => ({
//           ...p,
//           commentCount: commentCounts[idx],
//         }));

//         const tagSet = new Set(["all"]);
//         finalPosts.forEach((p) => {
//           if (p.tag) tagSet.add(p.tag);
//         });

//         setPosts(finalPosts);
//         setTags(Array.from(tagSet));
//       } catch (err) {
//         console.error("Error fetching posts:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const filteredPosts = useMemo(() => {
//     const s = searchText.trim().toLowerCase();
//     return posts.filter((post) => {
//       const matchText = !s || post.title.toLowerCase().includes(s);
//       const matchTag = selectedTag === "all" || post.tag === selectedTag;
//       return matchText && matchTag;
//     });
//   }, [posts, searchText, selectedTag]);

//   const sortedPosts = useMemo(() => {
//     const factor = ascending ? 1 : -1;

//     return [...filteredPosts].sort((a, b) => {
//       switch (sortBy) {
//         case "likes": {
//           return factor * (a.upVote - b.upVote);
//         }
//         case "comments": {
//           return factor * (a.commentCount - b.commentCount);
//         }
//         case "oldest": {
//           return factor * (new Date(a.postTime) - new Date(b.postTime));
//         }
//         case "popular": {
//           const aScore = a.upVote * 2 + a.commentCount;
//           const bScore = b.upVote * 2 + b.commentCount;
//           return factor * (aScore - bScore);
//         }
//         case "newest":
//         default: {
//           return factor * (new Date(b.postTime) - new Date(a.postTime));
//         }
//       }
//     });
//   }, [filteredPosts, sortBy, ascending]);

//   const totalPages = Math.ceil(sortedPosts.length / postsPerPage) || 1;
//   const currentPosts = useMemo(() => {
//     const start = (currentPage - 1) * postsPerPage;
//     const end = start + postsPerPage;
//     return sortedPosts.slice(start, end);
//   }, [sortedPosts, currentPage, postsPerPage]);

//   const paginate = (pageNumber) => {
//     if (pageNumber < 1 || pageNumber > totalPages) return;
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   if (loading) {
//     return (
//       <div className="text-center mt-24 text-xl">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-full mt-16 flex flex-col justify-between px-2 md:px-0">
//       {/* Filter / Sort / Search */}
//       <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4 items-center justify-between mb-6 px-2">
//         {/* Search */}
//         <div className="flex gap-2 items-center">
//           <FaSearch className="text-[#4CA3B8]" />
//           <input
//             type="text"
//             placeholder="Search title..."
//             className="border border-[#4CA3B8] px-4 py-2 rounded-lg w-full text-sm focus:outline-[#4CA3B8]"
//             value={searchText}
//             onChange={(e) => {
//               setSearchText(e.target.value);
//               setCurrentPage(1);
//             }}
//           />
//         </div>

//         {/* Tag Filter */}
//         <div className="flex gap-2 items-center">
//           <FaFilter className="text-[#4CA3B8]" />
//           <select
//             className="border border-[#4CA3B8] px-4 py-2 rounded-lg w-full text-sm focus:outline-[#4CA3B8]"
//             value={selectedTag}
//             onChange={(e) => {
//               setSelectedTag(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             {tags.map((tag) => (
//               <option key={tag} value={tag}>
//                 {tag === "all" ? "All Tags" : tag}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Sort + Direction */}
//         <div className="flex gap-2 items-center justify-between">
//           <FaSort className="text-[#4CA3B8]" />
//           <select
//             className="border border-[#4CA3B8] px-4 py-2 rounded-lg w-full text-sm focus:outline-[#4CA3B8]"
//             value={sortBy}
//             onChange={(e) => {
//               setSortBy(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="newest">Newest</option>
//             <option value="oldest">Oldest</option>
//             <option value="popular">Popular (Likes + Comments)</option>
//             <option value="likes">Most Liked</option>
//             <option value="comments">Most Commented</option>
//           </select>
//           <button
//             onClick={() => setAscending((v) => !v)}
//             className="text-xs text-white bg-[#4CA3B8] border border-[#4CA3B8] px-3 py-2 rounded-lg hover:bg-[#3d8aa0] transition-all"
//           >
//             {ascending ? "Asc" : "Desc"}
//           </button>
//         </div>
//       </div>

//       {/* Post Grid */}
//       <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2">
//         {currentPosts.map((post) => (
//           <motion.div
//             key={post._id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             whileHover={{ scale: 1.02 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Link to={`/post-details/${post._id}`}>
//               <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 p-5 h-[300px] flex flex-col justify-between group">
//                 <div className="flex items-start gap-4">
//                   <img
//                     className="h-12 w-12 rounded-full object-cover ring-2 ring-[#4CA3B8]"
//                     src={post.authorImage || "https://i.ibb.co/VgY9pJf/avatar.png"}
//                     alt={post.authorName}
//                   />
//                   <div className="flex-1">
//                     <h2 className="text-md font-semibold text-gray-800 break-words line-clamp-2 group-hover:text-[#4CA3B8] transition-colors duration-200">
//                       {post.title}
//                     </h2>
//                     <p className="text-xs text-[#4CA3B8] mt-1">#{post.tag}</p>
//                     <p className="text-sm text-gray-600 line-clamp-3 mt-1">
//                       {post.description.length > 150
//                         ? `${post.description.slice(0, 150)}...`
//                         : post.description}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
//                   <span className="text-xs">
//                     🕒 {new Date(post.postTime).toLocaleDateString()} by{" "}
//                     <span className="font-semibold">{post.authorName}</span>
//                   </span>
//                   <div className="flex items-center gap-3">
//                     <span className="flex items-center gap-1 text-[#4CA3B8]">
//                       <FaThumbsUp /> {post.upVote}
//                     </span>
//                     <span className="flex items-center gap-1 text-red-400">
//                       <FaThumbsDown /> {post.downVote}
//                     </span>
//                     <span className="flex items-center gap-1 text-[#4CA3B8]">
//                       <FaCommentDots /> {post.commentCount}
//                     </span>
//                     <span className="flex items-center gap-1 text-[#4CA3B8]">
//                       <FaShareAlt/> 
//                     </span>
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
//           Showing {currentPosts.length} of {sortedPosts.length} posts
//         </p>
//         <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => paginate(currentPage - 1)}
//             className="text-sm px-4 py-2 rounded border border-[#4CA3B8] bg-white text-[#4CA3B8] hover:bg-[#4CA3B8] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             « Previous
//           </button>
//           {[...Array(totalPages).keys()].map((num) => (
//             <button
//               key={num}
//               onClick={() => paginate(num + 1)}
//               className={`px-3 py-2 rounded text-sm border ${
//                 currentPage === num + 1
//                   ? "bg-[#4CA3B8] text-white border-[#4CA3B8]"
//                   : "bg-white text-[#4CA3B8] border-[#4CA3B8] hover:bg-[#4CA3B8]/10"
//               }`}
//             >
//               {num + 1}
//             </button>
//           ))}
//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => paginate(currentPage + 1)}
//             className="text-sm px-4 py-2 rounded border border-[#4CA3B8] bg-white text-[#4CA3B8] hover:bg-[#4CA3B8] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Next »
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllPost;


import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaCommentDots,
  FaSort,
  FaFilter,
  FaSearch,
  FaShareAlt,
} from "react-icons/fa";
import axios from "axios"; // Using standard axios for initial fetch
import useAxios from "../../hooks/useAxios"; // Custom hook for authenticated axios
import useAuth from "../../hooks/useAuth"; // Custom hook for authentication
import Loader from "../../shared/Loader/Loader";

// react-share components
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

// Environment variables
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const SITE_URL = import.meta.env.VITE_SITE_URL || "http://localhost:5173"; // Your frontend site URL

const DEFAULT_PER_PAGE = 6;
const FULL_PER_PAGE = 6;

// Custom primary color (Tailwind-compatible format)
const PRIMARY_COLOR_CLASS = "text-[#4CA3B8]"; // Your custom primary color
const PRIMARY_BG_COLOR_CLASS = "bg-[#4CA3B8]"; // For backgrounds
const PRIMARY_BORDER_COLOR_CLASS = "border-[#4CA3B8]"; // For borders
const PRIMARY_HOVER_COLOR_CLASS = "hover:text-[#3B8E9B]"; // A slightly darker shade for hover
const PRIMARY_HOVER_BG_COLOR_CLASS = "hover:bg-[#3B8E9B]"; // A slightly darker shade for hover background
const PRIMARY_FOCUS_OUTLINE_CLASS = "focus:outline-[#4CA3B8]"; // For outline on focus

// New Sub-Component for individual Post Card with Share functionality
const PostCard = ({ post, handleVote, user, SITE_URL }) => {
  const [showShare, setShowShare] = useState(false);
  const shareRef = useRef(null);

  // Close share menu on outside click
  const handleClickOutside = useCallback((e) => {
    if (shareRef.current && !shareRef.current.contains(e.target)) {
      setShowShare(false);
    }
  }, []);

  useEffect(() => {
    if (showShare) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showShare, handleClickOutside]);

  const shareUrl = `${SITE_URL}/post-details/${post._id}`;
  const shareTitle = post.title;

  // Safely access post.votes[user.email] using optional chaining
  const currentVote = post.votes?.[user?.email];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="h-[320px] sm:h-[350px] md:h-[380px] lg:h-[400px] xl:h-[420px] flex" // Standardized fixed height for cards, responsive
    >
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 p-6 h-full flex flex-col justify-between group overflow-hidden relative"> {/* Modern card styling */}
        <Link to={`/post-details/${post._id}`} className="block flex-grow">
          <div className="flex items-start gap-4 mb-4">
            <img
              className="h-14 w-14 rounded-full object-cover ring-2 ring-offset-2 ring-[#4CA3B8] shadow-md" 
              src={post.authorImage || "https://i.ibb.co/VgY9pJf/avatar.png"}
              alt={post.authorName}
            />
            <div className="flex-1">
              <h2 className={`text-xl font-bold text-gray-800 break-words line-clamp-2 group-hover:${PRIMARY_COLOR_CLASS} transition-colors duration-200`}>
                {post.title}
              </h2>
              <p className={`text-sm ${PRIMARY_COLOR_CLASS} mt-1 font-medium`}>#{post.tag}</p>
              <p className="text-sm text-gray-700 line-clamp-3 mt-2">
                {post.description.length > 180 
                  ? `${post.description.slice(0, 180)}...`
                  : post.description}
              </p>
            </div>
          </div>
        </Link>
        <div className="flex justify-between items-center text-sm text-gray-600 mt-4 pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            🕒 {new Date(post.postTime).toLocaleDateString()} by{" "}
            <span className="font-semibold text-gray-700">{post.authorName}</span>
          </span>
          <div className="flex items-center gap-5"> {/* Increased gap between icons */}
            {/* Upvote Button */}
            <button
              onClick={() => handleVote(post._id, "up")}
              className={`flex items-center gap-1 text-2xl transition-transform hover:scale-115 focus:outline-none ${
                currentVote === "up" ? "text-green-500 font-semibold" : `${PRIMARY_COLOR_CLASS} hover:text-green-500`
              }`}
              title="Upvote"
            >
              <FaThumbsUp /> <span className="text-base font-medium">{post.upVote}</span>
            </button>
            {/* Downvote Button */}
            <button
              onClick={() => handleVote(post._id, "down")}
              className={`flex items-center gap-1 text-2xl transition-transform hover:scale-115 focus:outline-none ${
                currentVote === "down" ? "text-red-500 font-semibold" : "text-gray-500 hover:text-red-500" 
              }`}
              title="Downvote"
            >
              <FaThumbsDown /> <span className="text-base font-medium">{post.downVote}</span>
            </button>
            {/* Comments Link */}
            <Link
              to={`/post-details/${post._id}#comments`} 
              className={`flex items-center gap-1 text-2xl ${PRIMARY_COLOR_CLASS} hover:scale-115 transition-transform focus:outline-none`}
              title="Comments"
            >
              <FaCommentDots /> <span className="text-base font-medium">{post.commentCount}</span>
            </Link>

            {/* Share Icon with Popover */}
            <div className="relative" ref={shareRef}>
              <button
                type="button"
                onClick={() => setShowShare((s) => !s)}
                title="Share this post"
                className={`flex items-center gap-1 text-2xl ${PRIMARY_COLOR_CLASS} hover:scale-115 transition-transform focus:outline-none`}
              >
                <FaShareAlt />
              </button>

              {showShare && (
                <div
                  className="absolute right-0 bottom-full mb-3 z-10 flex items-center gap-4 bg-white border border-gray-200 rounded-xl shadow-xl p-4 transform origin-bottom-right animate-fade-in-up" // Enhanced popover design
                >
                  <FacebookShareButton
                    url={shareUrl}
                    quote={shareTitle}
                    hashtag="#YourWebsiteName" // Change this hashtag
                    className="outline-none focus:outline-none"
                  >
                    <FacebookIcon size={38} round /> {/* Slightly larger icons */}
                  </FacebookShareButton>

                  <WhatsappShareButton
                    url={shareUrl}
                    title={shareTitle}
                    separator=" - "
                    className="outline-none focus:outline-none"
                  >
                    <WhatsappIcon size={38} round /> {/* Slightly larger icons */}
                  </WhatsappShareButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


const AllPost = ({ homeView = false }) => {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState(["all"]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  const [sortBy, setSortBy] = useState("newest");
  const [ascending, setAscending] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = homeView ? DEFAULT_PER_PAGE : FULL_PER_PAGE;

  const { user } = useAuth(); // Using useAuth hook
  const privateAxios = useAxios(); // Using custom axios hook for authenticated requests

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/all-posts`);
        const rawPosts = res.data || [];

        // Process votes and comment counts for each post
        const postsWithDetails = await Promise.all(
          rawPosts.map(async (post) => {
            const votes = post.votes || {}; // Ensure votes is an object, not undefined
            const upVote = Object.values(votes).filter((v) => v === "up").length;
            const downVote = Object.values(votes).filter((v) => v === "down").length;

            let commentCount = 0;
            try {
              const commentRes = await axios.get(`${API_BASE}/comments/${post._id}`);
              commentCount = commentRes.data.length || 0;
            } catch (error) {
              console.error(`Error fetching comments for post ${post._id}:`, error);
            }

            return { ...post, votes, upVote, downVote, commentCount }; // Include 'votes' object in the post state
          })
        );

        const tagSet = new Set(["all"]);
        postsWithDetails.forEach((p) => {
          if (p.tag) tagSet.add(p.tag);
        });

        setPosts(postsWithDetails);
        setTags(Array.from(tagSet));
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]); // Re-fetch when user changes to update vote status


  // Vote handler for AllPost component
  const handleVote = async (postId, voteType) => {
    if (!user?.email) {
      alert("Please login to vote.");
      return;
    }
    try {
      const res = await privateAxios.patch(`/posts/vote/${postId}`, {
        userId: user.email,
        voteType,
      });

      // Update the specific post in the state
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p._id === postId
            ? {
                ...p,
                upVote: res.data.upVote ?? 0,
                downVote: res.data.downVote ?? 0,
                // Update the 'votes' object directly in the post for current user's vote status
                votes: {
                  ...p.votes, 
                  [user.email]: res.data.userVote, 
                },
              }
            : p
        )
      );
    } catch (err) {
      console.error("Vote failed:", err);
      alert("Failed to record vote.");
    }
  };

  const filteredPosts = useMemo(() => {
    const s = searchText.trim().toLowerCase();
    return posts.filter((post) => {
      const matchText = !s || post.title.toLowerCase().includes(s);
      const matchTag = selectedTag === "all" || post.tag === selectedTag;
      return matchText && matchTag;
    });
  }, [posts, searchText, selectedTag]);

  const sortedPosts = useMemo(() => {
    const factor = ascending ? 1 : -1;

    return [...filteredPosts].sort((a, b) => {
      switch (sortBy) {
        case "likes": {
          return factor * (a.upVote - b.upVote);
        }
        case "comments": {
          return factor * (a.commentCount - b.commentCount);
        }
        case "oldest": {
          return factor * (new Date(a.postTime) - new Date(b.postTime));
        }
        case "popular": {
          const aScore = a.upVote * 2 + a.commentCount; 
          const bScore = b.upVote * 2 + b.commentCount;
          return factor * (aScore - bScore);
        }
        case "newest":
        default: {
          return factor * (new Date(b.postTime) - new Date(a.postTime));
        }
      }
    });
  }, [filteredPosts, sortBy, ascending]);

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage) || 1;
  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    return sortedPosts.slice(start, end);
  }, [sortedPosts, currentPage, postsPerPage]);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="text-center mt-24 text-xl">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full mt-16 flex flex-col justify-between px-2 md:px-0">
      {/* Filter / Sort / Search */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4 items-center justify-between mb-6 px-2">
        {/* Search */}
        <div className="flex gap-2 items-center">
          <FaSearch className={`text-xl ${PRIMARY_COLOR_CLASS}`} /> {/* Larger icon, primary color */}
          <input
            type="text"
            placeholder="Search title..."
            className={`border ${PRIMARY_BORDER_COLOR_CLASS} px-4 py-2 rounded-lg w-full text-sm ${PRIMARY_FOCUS_OUTLINE_CLASS}`} // Adjusted colors
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Tag Filter */}
        <div className="flex gap-2 items-center">
          <FaFilter className={`text-xl ${PRIMARY_COLOR_CLASS}`} /> {/* Larger icon, primary color */}
          <select
            className={`border ${PRIMARY_BORDER_COLOR_CLASS} px-4 py-2 rounded-lg w-full text-sm ${PRIMARY_FOCUS_OUTLINE_CLASS}`} // Adjusted colors
            value={selectedTag}
            onChange={(e) => {
              setSelectedTag(e.target.value);
              setCurrentPage(1);
            }}
          >
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag === "all" ? "All Tags" : tag}
              </option>
            ))}
          </select>
        </div>

        {/* Sort + Direction */}
        <div className="flex gap-2 items-center justify-between">
          <FaSort className={`text-xl ${PRIMARY_COLOR_CLASS}`} /> {/* Larger icon, primary color */}
          <select
            className={`border ${PRIMARY_BORDER_COLOR_CLASS} px-4 py-2 rounded-lg w-full text-sm ${PRIMARY_FOCUS_OUTLINE_CLASS}`} // Adjusted colors
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Popular</option>
            <option value="likes">Most Liked</option>
            <option value="comments">Most Commented</option>
          </select>
          <button
            onClick={() => setAscending((v) => !v)}
            className={`text-xs text-white ${PRIMARY_BG_COLOR_CLASS} ${PRIMARY_BORDER_COLOR_CLASS} px-3 py-2 rounded-lg ${PRIMARY_HOVER_BG_COLOR_CLASS} transition-all`} // Adjusted colors
          >
            {ascending ? "Asc" : "Desc"}
          </button>
        </div>
      </div>

      {/* Post Grid */}
      <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2">
        {currentPosts.map((post) => (
          <PostCard key={post._id} post={post} handleVote={handleVote} user={user} SITE_URL={SITE_URL} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto px-4 py-10 gap-3">
        <p className="text-sm text-gray-500 text-center sm:text-left">
          Showing {currentPosts.length} of {sortedPosts.length} posts
        </p>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className={`text-sm px-4 py-2 rounded border ${PRIMARY_BORDER_COLOR_CLASS} bg-white ${PRIMARY_COLOR_CLASS} ${PRIMARY_HOVER_BG_COLOR_CLASS} hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed`} // Adjusted colors
          >
            « Previous
          </button>
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => paginate(num + 1)}
              className={`px-3 py-2 rounded text-sm border ${PRIMARY_BORDER_COLOR_CLASS} ${
                currentPage === num + 1
                  ? `${PRIMARY_BG_COLOR_CLASS} text-white` 
                  : `bg-white ${PRIMARY_COLOR_CLASS} hover:bg-blue-100`
              }`}
            >
              {num + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className={`text-sm px-4 py-2 rounded border ${PRIMARY_BORDER_COLOR_CLASS} bg-white ${PRIMARY_COLOR_CLASS} ${PRIMARY_HOVER_BG_COLOR_CLASS} hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed`} // Adjusted colors
          >
            Next »
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllPost;