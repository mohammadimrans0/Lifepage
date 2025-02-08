'use client'

import { useEffect } from 'react';
import { usePostStore } from '@/stores/usePostStore';
import PostCard from '@/components/post/PostCard';

const PostsPage: React.FC = () => {
  const { posts, fetchPosts } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="px-2 md:px-6 py-1">
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p className="text-gray-500">No posts available.</p>
      )}
    </div>
  );
};

export default PostsPage;
