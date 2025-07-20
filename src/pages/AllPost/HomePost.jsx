// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios"; 
// import useAuth from "../../hooks/useAuth";
// import useAxios from "../../hooks/useAxios";
// import { Loader } from "lucide-react";
// import { PostCard } from "./AllPost";


// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
// const SITE_URL = import.meta.env.VITE_SITE_URL || "http://localhost:5173"; 

// const HomePost = () => {
//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const { user } = useAuth(); 
//     const privateAxios = useAxios(); 

//     const LIMIT_FOR_HOME = 8; 

//     useEffect(() => {
//         const fetchPosts = async () => {
//             setLoading(true);
//             try {
//                 const res = await axios.get(`${API_BASE}/all-posts`);
//                 const rawPosts = res.data || [];

                
//                 const postsWithDetails = await Promise.all(
//                     rawPosts.map(async (post) => {
//                         const votes = post.votes || {};
//                         const upVote = Object.values(votes).filter((v) => v === "up").length;
//                         const downVote = Object.values(votes).filter((v) => v === "down").length;

//                         let commentCount = 0;
//                         try {
//                             const commentRes = await axios.get(`${API_BASE}/comments/${post._id}`);
//                             commentCount = commentRes.data.length || 0;
//                         } catch (error) {
//                             console.error(`Error fetching comments for post ${post._id}:`, error);
//                         }

//                         return { ...post, votes, upVote, downVote, commentCount }; 
//                     })
//                 );

//                 setPosts(postsWithDetails);
//             } catch (err) {
//                 console.error("Error fetching posts for homepage:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPosts();
//     }, [user]); 

    
//     const handleVote = async (postId, voteType) => {
//         if (!user?.email) {
//             alert("Please login to vote.");
//             return;
//         }
//         try {
//             const res = await privateAxios.patch(`/posts/vote/${postId}`, {
//                 userId: user.email,
//                 voteType,
//             });

//             setPosts((prevPosts) =>
//                 prevPosts.map((p) =>
//                     p._id === postId
//                         ? {
//                             ...p,
//                             upVote: res.data.upVote ?? 0,
//                             downVote: res.data.downVote ?? 0,
//                             votes: {
//                                 ...p.votes, 
//                                 [user.email]: res.data.userVote, 
//                             },
//                         }
//                         : p
//                 )
//             );
//         } catch (err) {
//             console.error("Vote failed:", err);
//             alert("Failed to record vote.");
//         }
//     };

  
//     const displayedPosts = useMemo(() => {
       
//         const sorted = [...posts].sort((a, b) => new Date(b.postTime) - new Date(a.postTime));
//         return sorted.slice(0, LIMIT_FOR_HOME);
//     }, [posts]);

//     if (loading) {
//         return (
//             <div className="text-center py-10">
//                 <Loader />
//             </div>
//         );
//     }

//     return (
//         <div className="container max-w-7xl mx-auto py-8">
//             <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
//                 সাম্প্রতিক পোস্টসমূহ
//             </h2>

//             {displayedPosts.length === 0 ? (
//                 <p className="text-center text-gray-600">এখনও কোনো পোস্ট খুঁজে পাওয়া যায়নি।</p>
//             ) : (
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> 
//                     {displayedPosts.map(post => (
                     
//                         <PostCard key={post._id} post={post} handleVote={handleVote} user={user} SITE_URL={SITE_URL} />
//                     ))}
//                 </div>
//             )}

            
//             {posts.length > LIMIT_FOR_HOME && ( 
//                 <div className="text-center mt-12">
//                     <Link 
//                         to="/all-post" 
//                         className="inline-block bg-[#4CA3B8] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-[#3B8E9B] transition-colors duration-300"
//                     >
//                         সকল পোস্ট দেখুন
//                     </Link>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default HomePost;

// src/components/HomePost.jsx

// import React, { useMemo } from "react";
// import { Link } from "react-router-dom";


// // TanStack Query Imports
// import { useQuery, useQueryClient } from '@tanstack/react-query';

// // Importing PostCard from AllPost.jsx

// import useAuth from "../../hooks/useAuth";
// import useAxios from "../../hooks/useAxios";
// import { Loader } from "lucide-react";
// import { PostCard } from "./AllPost";

// // Environment variables
// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
// const SITE_URL = import.meta.env.VITE_SITE_URL || "http://localhost:5173";

// const HomePost = () => {
//     const { user } = useAuth();
//     const privateAxios = useAxios();
//     const queryClient = useQueryClient(); // For updating TanStack Query cache

//     const LIMIT_FOR_HOME = 8; // Limit for how many posts to show on the homepage

//     // 🔴 Using useQuery for data fetching (shares cache with AllPost)
//     const {
//         data: posts = [],
//         isLoading,
//         isError,
//         error
//     } = useQuery({
//         queryKey: ['allPosts'], // 🔴 Same queryKey as AllPost to share cache
//         queryFn: async () => {
//             const res = await privateAxios.get(`${API_BASE}/all-posts`);
//             const rawPosts = res.data || [];

//             const postsWithDetails = await Promise.all(
//                 rawPosts.map(async (post) => {
//                     const votes = post.votes || {};
//                     const upVote = Object.values(votes).filter((v) => v === "up").length;
//                     const downVote = Object.values(votes).filter((v) => v === "down").length;

//                     let commentCount = 0;
//                     try {
//                         const commentRes = await privateAxios.get(`${API_BASE}/comments/${post._id}`);
//                         commentCount = commentRes.data.length || 0;
//                     } catch (error) {
//                         console.error(`Error fetching comments for post ${post._id}:`, error);
//                     }
//                     return { ...post, votes, upVote, downVote, commentCount };
//                 })
//             );
//             return postsWithDetails;
//         },
//         staleTime: 5 * 60 * 1000, // Data will not be stale for 5 minutes
//         cacheTime: 10 * 60 * 1000, // Data will stay in cache for 10 minutes
//     });

//     // Vote handler (taken from AllPost, customized for TanStack Query cache update)
//     const handleVote = async (postId, voteType) => {
//         if (!user?.email) {
//             alert("Please login to vote.");
//             return;
//         }
//         try {
//             const res = await privateAxios.patch(`/posts/vote/${postId}`, {
//                 userId: user.email,
//                 voteType,
//             });

//             // 🔴 Updating TanStack Query cache directly
//             queryClient.setQueryData(['allPosts'], (oldPosts) => {
//                 if (!oldPosts) return [];
//                 return oldPosts.map((p) =>
//                     p._id === postId
//                         ? {
//                             ...p,
//                             upVote: res.data.upVote ?? p.upVote,
//                             downVote: res.data.downVote ?? p.downVote,
//                             votes: {
//                                 ...p.votes,
//                                 [user.email]: res.data.userVote,
//                             },
//                         }
//                         : p
//                 );
//             });

//         } catch (err) {
//             console.error("Vote failed:", err);
//             alert("Failed to record vote.");
//         }
//     };

//     // Filtering and sorting posts to display only a limited number
//     const displayedPosts = useMemo(() => {
//         const sorted = [...posts].sort((a, b) => new Date(b.postTime) - new Date(a.postTime));
//         return sorted.slice(0, LIMIT_FOR_HOME);
//     }, [posts]);

//     if (isLoading) {
//         return (
//             <div className="text-center py-10">
//                 <Loader />
//             </div>
//         );
//     }

//     if (isError) {
//         return <div className="text-center py-10 text-red-500">Failed to load posts: {error.message}</div>;
//     }

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
//                 Recent Posts
//             </h2>

//             {displayedPosts.length === 0 ? (
//                 <p className="text-center text-gray-600">No posts found yet.</p>
//             ) : (
//                 // 🔴 Using lg:grid-cols-4 for homepage as per your requirement
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {displayedPosts.map(post => (
//                         <PostCard  key={post._id} post={post} handleVote={handleVote} user={user} SITE_URL={SITE_URL} />
//                     ))}
//                 </div>
//             )}

//             {/* "See All Posts" Button */}
//             {posts.length > LIMIT_FOR_HOME && (
//                 <div className="text-center mt-12">
//                     <Link
//                         to="/all-posts"
//                         className="inline-block bg-[#4CA3B8] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-[#3B8E9B] transition-colors duration-300"
//                     >
//                         See All Posts
//                     </Link>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default HomePost;

// src/components/HomePost.jsx

import React, { useMemo } from "react";
import { Link } from "react-router-dom";


// TanStack Query Imports
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import PostCard from "./Post/PostCard";



// Environment variables
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";


const HomePost = () => {
    const { user } = useAuth();
    const privateAxios = useAxios();
   

    const LIMIT_FOR_HOME = 8; 

    const {
        data: posts = [],
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['allPosts'],
        queryFn: async () => {
            const res = await privateAxios.get(`${API_BASE}/all-posts`);
            const rawPosts = res.data || [];

            const postsWithDetails = await Promise.all(
                rawPosts.map(async (post) => {
                    const votes = post.votes || {};
                    const upVote = Object.values(votes).filter((v) => v === "up").length;
                    const downVote = Object.values(votes).filter((v) => v === "down").length;

                    let commentCount = 0;
                    try {
                        const commentRes = await privateAxios.get(`${API_BASE}/comments/${post._id}`);
                        commentCount = commentRes.data.length || 0;
                    } catch (error) {
                        console.error(`Error fetching comments for post ${post._id}:`, error);
                    }
                    return { ...post, votes, upVote, downVote, commentCount };
                })
            );
            return postsWithDetails;
        },
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });


    const displayedPosts = useMemo(() => {
        const sorted = [...posts].sort((a, b) => new Date(b.postTime) - new Date(a.postTime));
        return sorted.slice(0, LIMIT_FOR_HOME);
    }, [posts]);

    if (isLoading) {
        return (
            <div className="text-center py-10">
                <Loader />
            </div>
        );
    }

    if (isError) {
        return <div className="text-center py-10 text-red-500">Failed to load posts: {error.message}</div>;
    }

    return (
        <div className="container max-w-7xl mx-auto  py-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Recent Posts
            </h2>

            {displayedPosts.length === 0 ? (
                <p className="text-center text-gray-600">No posts found yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {displayedPosts.map(post => (
                     
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            )}

            {/* "See All Posts" Button */}
            {posts.length > LIMIT_FOR_HOME && (
                <div className="text-center mt-12">
                    <Link
                        to="/all-post"
                        className="inline-block bg-[#4CA3B8] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-[#3B8E9B] transition-colors duration-300"
                    >
                        See All Posts
                    </Link>
                </div>
            )}
        </div>
    );
};

export default HomePost;