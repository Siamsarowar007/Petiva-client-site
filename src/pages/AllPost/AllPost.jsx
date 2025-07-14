// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FaThumbsUp,
//   FaThumbsDown,
//   FaCommentDots,
//   FaFacebook,
//   FaWhatsapp,
// } from "react-icons/fa";
// import { FacebookShareButton, WhatsappShareButton } from "react-share";

// const AllPost = () => {
//   const [posts, setPosts] = useState([]);
//   const [comments, setComments] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [commentToggle, setCommentToggle] = useState({});
//   const [commentText, setCommentText] = useState("");
//   const postsPerPage = 5;
//   const userEmail = localStorage.getItem("userEmail");

//   useEffect(() => {
//     fetchPosts();
//     const interval = setInterval(fetchPosts, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/all-posts");
//       setPosts(res.data);

//       // fetch comments for all posts
//       const commentData = {};
//       for (const post of res.data) {
//         const cm = await axios.get(`http://localhost:5000/comments/${post._id}`);
//         commentData[post._id] = cm.data.slice(-5); // latest 5
//       }
//       setComments(commentData);
//     } catch (err) {
//       console.error("Failed to load posts/comments", err);
//     }
//   };

//   const handleVote = async (id, type) => {
//     try {
//       await axios.patch(`http://localhost:5000/vote/${id}`, {
//         userEmail,
//         type,
//       });
//       fetchPosts();
//     } catch (error) {
//       console.error("Voting failed", error);
//     }
//   };

//   const toggleCommentBox = (id) => {
//     setCommentToggle((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleCommentSubmit = async (id) => {
//     if (!commentText.trim()) return;

//     try {
//       await axios.post("http://localhost:5000/comments", {
//         postId: id,
//         text: commentText,
//         time: new Date().toISOString(),
//         authorName: "Anonymous",
//         authorEmail: userEmail,
//       });
//       setCommentText("");
//       fetchPosts();
//     } catch (err) {
//       console.error("Comment failed", err);
//     }
//   };

//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
//   const totalPages = Math.ceil(posts.length / postsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const formatDateTime = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleString("en-BD", {
//       dateStyle: "medium",
//       timeStyle: "short",
//     });
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold text-center mb-6">📝 All User Posts</h2>

//       {posts.length === 0 ? (
//         <p className="text-center text-gray-500">No posts found.</p>
//       ) : (
//         <div className="flex flex-col gap-6">
//           {currentPosts.map((post) => (
//             <div
//               key={post._id}
//               className="w-full bg-white border rounded-lg overflow-hidden flex flex-col transition hover:shadow-md"
//             >
//               <div className="flex items-center gap-3 px-5 pt-5">
//                 <img
//                   src={post.authorPhoto || "https://i.ibb.co/ypkgK0X/default-user.png"}
//                   className="w-12 h-12 rounded-full border"
//                   alt="Author"
//                 />
//                 <div>
//                   <p className="font-semibold text-gray-800">{post.authorName}</p>
//                   <p className="text-sm text-gray-500">{formatDateTime(post.postTime)}</p>
//                 </div>
//               </div>

//               <div className="px-5 py-4 flex-grow">
//                 <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
//                 <p className="text-sm text-gray-700 mb-2">{post.description}</p>
//                 <span className="badge badge-outline">#{post.tag}</span>
//               </div>

//               <div className="border-t px-5 py-3 bg-gray-100 flex items-center justify-between">
//                 <div className="flex gap-4 text-gray-600">
//                   <button
//                     onClick={() => handleVote(post._id, "up")}
//                     className="flex items-center gap-1 hover:text-green-600 text-sm"
//                   >
//                     <FaThumbsUp /> {post.upVote?.length || 0}
//                   </button>
//                   <button
//                     onClick={() => handleVote(post._id, "down")}
//                     className="flex items-center gap-1 hover:text-red-500 text-sm"
//                   >
//                     <FaThumbsDown /> {post.downVote?.length || 0}
//                   </button>
//                   <button
//                     onClick={() => toggleCommentBox(post._id)}
//                     className="flex items-center gap-1 text-sm"
//                   >
//                     <FaCommentDots /> Comment
//                   </button>
//                 </div>

//                 <div className="flex gap-2">
//                   <FacebookShareButton url={`https://your-site.com/post/${post._id}`}>
//                     <FaFacebook size={20} className="text-blue-600" />
//                   </FacebookShareButton>
//                   <WhatsappShareButton url={`https://your-site.com/post/${post._id}`}>
//                     <FaWhatsapp size={20} className="text-green-500" />
//                   </WhatsappShareButton>
//                 </div>
//               </div>

//               {commentToggle[post._id] && (
//                 <div className="px-5 py-3 border-t bg-gray-50">
//                   <textarea
//                     className="textarea textarea-bordered w-full mb-2"
//                     placeholder="Write a comment..."
//                     value={commentText}
//                     onChange={(e) => setCommentText(e.target.value)}
//                   ></textarea>
//                   <button
//                     onClick={() => handleCommentSubmit(post._id)}
//                     className="btn btn-sm btn-primary"
//                   >
//                     Post Comment
//                   </button>
//                 </div>
//               )}

//               {/* Show 5 latest comments */}
//               {comments[post._id]?.length > 0 && (
//                 <div className="px-5 py-2 border-t bg-white">
//                   <p className="text-sm font-semibold mb-2 text-gray-600">Recent Comments:</p>
//                   <ul className="space-y-1">
//                     {comments[post._id].map((cmt, idx) => (
//                       <li key={idx} className="text-sm text-gray-700 border-b pb-1">
//                         <strong>{cmt.authorName || "Anonymous"}:</strong> {cmt.text}
//                         <p className="text-xs text-gray-400">
//                           {formatDateTime(cmt.time)}
//                         </p>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-10">
//           <p className="text-sm text-gray-500">
//             Showing {currentPosts.length} of {posts.length} posts
//           </p>

//           <div className="flex items-center gap-2">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => paginate(currentPage - 1)}
//               className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
//             >
//               « Previous
//             </button>

//             {[...Array(totalPages).keys()].map((num) => (
//               <button
//                 key={num}
//                 onClick={() => paginate(num + 1)}
//                 className={`px-3 py-1 rounded text-sm font-medium ${
//                   currentPage === num + 1
//                     ? "bg-orange-500 text-white"
//                     : "bg-gray-200 text-gray-700"
//                 }`}
//               >
//                 {num + 1}
//               </button>
//             ))}

//             <button
//               disabled={currentPage === totalPages}
//               onClick={() => paginate(currentPage + 1)}
//               className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
//             >
//               Next »
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllPost;

// ******

// import { useEffect, useState } from "react";
// import axios from "axios";
// import PostCard from "./PostCard";

// const AllPost = () => {
//   const [posts, setPosts] = useState([]);
//   const [comments, setComments] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 5;
//   const userEmail = localStorage.getItem("userEmail");

//   useEffect(() => {
//     fetchPosts();
//     const interval = setInterval(fetchPosts, 30000); // auto refresh every 30s
//     return () => clearInterval(interval);
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/all-posts");
//       setPosts(res.data);

//       // fetch latest 5 comments for each post
//       const commentData = {};
//       for (const post of res.data) {
//         const cm = await axios.get(`http://localhost:5000/comments/${post._id}`);
//         commentData[post._id] = cm.data.slice(-5);
//       }
//       setComments(commentData);
//     } catch (err) {
//       console.error("Failed to load posts/comments", err);
//     }
//   };

//   const handleVote = async (id, type) => {
//     try {
//       await axios.patch(`http://localhost:5000/vote/${id}`, {
//         userEmail,
//         type,
//       });
//       fetchPosts();
//     } catch (error) {
//       console.error("Voting failed", error);
//     }
//   };

//   const handleAddComment = async (postId, commentText) => {
//     if (!commentText.trim()) return;

//     try {
//       await axios.post("http://localhost:5000/comments", {
//         postId,
//         text: commentText.trim(),
//         time: new Date().toISOString(),
//         authorName: "Anonymous",
//         authorEmail: userEmail,
//       });
//       fetchPosts();
//     } catch (err) {
//       console.error("Comment failed", err);
//     }
//   };

//   // Pagination logic
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
//   const totalPages = Math.ceil(posts.length / postsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold text-center mb-6">📝 All User Posts</h2>

//       {posts.length === 0 ? (
//         <p className="text-center text-gray-500">No posts found.</p>
//       ) : (
//         <div className="flex flex-col gap-6">
//           {currentPosts.map((post) => (
//             <PostCard
//               key={post._id}
//               post={{ ...post, comments: comments[post._id] || [] }}
//               onLike={() => handleVote(post._id, "up")}
//               onUnlike={() => handleVote(post._id, "down")}
//               onAddComment={handleAddComment}
//             />
//           ))}
//         </div>
//       )}

//       {/* Pagination Buttons */}
//       {totalPages > 1 && (
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-10">
//           <p className="text-sm text-gray-500">
//             Showing {currentPosts.length} of {posts.length} posts
//           </p>

//           <div className="flex items-center gap-2">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => paginate(currentPage - 1)}
//               className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
//             >
//               « Previous
//             </button>

//             {[...Array(totalPages).keys()].map((num) => (
//               <button
//                 key={num}
//                 onClick={() => paginate(num + 1)}
//                 className={`px-3 py-1 rounded text-sm font-medium ${
//                   currentPage === num + 1
//                     ? "bg-orange-500 text-white"
//                     : "bg-gray-200 text-gray-700"
//                 }`}
//               >
//                 {num + 1}
//               </button>
//             ))}

//             <button
//               disabled={currentPage === totalPages}
//               onClick={() => paginate(currentPage + 1)}
//               className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
//             >
//               Next »
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllPost;


import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
// import HeartLoader from "../../components/LoadingSpinner/HeartLoader";
// import Loader from '../../shared/Loader/Loader'
import axios from "axios";

const AllPost = ({ homeView = false }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [ascending, setAscending] = useState(false);
  const postsPerPage = homeView ? 6 : 5;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/all-posts");
      const postsWithVotes = res.data.map((post) => ({
        ...post,
        upVote: post.upVote?.length || 0,
        downVote: post.downVote?.length || 0,
      }));

      const commentsPromises = postsWithVotes.map((post) =>
        axios.get(`http://localhost:5000/comments/${post._id}`)
      );

      const commentsResponses = await Promise.all(commentsPromises);

      const finalPosts = postsWithVotes.map((post, idx) => ({
        ...post,
        commentCount: commentsResponses[idx].data.length || 0,
      }));

      setPosts(finalPosts);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setLoading(false);
    }
  };

  const sortedPosts = [...posts].sort((a, b) => {
    const factor = ascending ? 1 : -1;
    if (sortBy === "likes") return factor * (a.upVote - b.upVote);
    if (sortBy === "comments") return factor * (a.commentCount - b.commentCount);
    if (sortBy === "oldest") return factor * (new Date(a.postTime) - new Date(b.postTime));
    return factor * (new Date(b.postTime) - new Date(a.postTime));
  });

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="text-center mt-24 text-xl">
        {/* <HeartLoader /> */}
        {/* <Loader></Loader> */}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full mt-12 flex flex-col justify-between px-2 md:px-0">
      {/* Sort Section */}
      <div className="max-w-6xl mx-auto flex items-center justify-end gap-4 mb-6 px-2">
        <select
          className="border rounded px-3 py-1 text-sm bg-base-300"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="newest">🆕 Newest</option>
          <option value="oldest">📅 Oldest</option>
          <option value="likes">❤️ Most Liked</option>
          <option value="comments">💬 Most Commented</option>
        </select>
        <button
          onClick={() => setAscending(!ascending)}
          className="px-3 py-1 border rounded bg-base-300 hover:bg-green-600 text-sm"
        >
          {ascending ? "⬆️ Asc" : "⬇️ Desc"}
        </button>
      </div>

      {/* Post Grid */}
      <div
        className={`grid ${homeView
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          : "grid-cols-1 gap-6 max-w-4xl mx-auto"
          }`}
      >
        {currentPosts.map((post) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <Link to={`/dashboard/post/${post._id}`}>
              <div className="w-full h-auto overflow-hidden bg-base-300 rounded-xl shadow-md hover:shadow-xl transition-shadow px-8 py-8 space-y-4 border border-gray-200 hover:border-transparent hover:bg-gradient-to-r from-orange-500 to-green-400">
                <div className="flex items-start gap-4">
                  <img
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-green-300 flex-shrink-0"
                    src={post.authorPhoto || "https://i.ibb.co/VgY9pJf/avatar.png"}
                    alt={post.authorName}
                  />
                  <div className="flex-1 min-w-0">
                    <h2 className={`text-xl font-semibold break-words ${homeView ? "line-clamp-2" : ""}`}>
                      {post.title}
                    </h2>
                    <div className="text-xs text-blue-600 mt-1 font-medium">#{post.tag}</div>
                    <p className={`text-sm break-words ${homeView ? "line-clamp-2" : "line-clamp-1"}`}>
                      {post.description}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm flex-wrap gap-2">
                  <span className="whitespace-nowrap">
                    🕒 {new Date(post.postTime).toLocaleDateString()} by{' '}
                    <span className="font-medium">{post.authorName}</span>
                  </span>
                  <div className="flex gap-4">
                    <span>💬 {post.commentCount || 0}</span>
                    <span className="text-green-600 font-bold">⬆️ {post.upVote}</span>
                    <span className="text-red-600 font-bold">⬇️ {post.downVote}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto px-4 pb-10 gap-1 sm:gap-0 mt-5">
        <p className="text-sm text-gray-400 text-center sm:text-left w-full sm:w-auto">
          Showing {currentPosts.length} of {posts.length} posts
        </p>
        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 w-full sm:w-auto">
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full disabled:opacity-50"
          >
            « Previous
          </button>

          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => paginate(num + 1)}
              className={`px-4 py-2 rounded-full text-sm font-bold ${currentPage === num + 1
                ? "bg-orange-600 text-white"
                : "bg-gray-800 text-gray-300"
                }`}
            >
              {num + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full disabled:opacity-50"
          >
            Next »
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllPost;
