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
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 text-[#4CA3B8]">
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