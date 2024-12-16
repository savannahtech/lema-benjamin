import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createPost,
  deletePostById,
  fetchPostsByUserId,
  updatePost,
} from '../services';
import { PostType } from '../types/posts';
import toast from 'react-hot-toast';

interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
  };
}

export const useFetchPosts = (userId: string) => {
  return useQuery({
    queryKey: ['userPosts', userId],
    queryFn: () => fetchPostsByUserId(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPost: PostType) => createPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      toast.success('Post created successfully');
    },
    onError: (error: ApiError) => {
      const message = error?.response?.data?.error || 'Failed to create post';
      toast.error(message);
    },
  });
};

interface UpdatePostParams {
  postId: string;
  post: PostType;
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, post }: UpdatePostParams) =>
      updatePost(postId, post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      toast.success('Post updated successfully');
    },
    onError: (error: ApiError) => {
      const message = error?.response?.data?.error || 'Failed to update post';
      toast.error(message);
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => deletePostById(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      toast.success('Post deleted successfully');
    },
    onError: (error: ApiError) => {
      const message = error?.response?.data?.error || 'Failed to delete post';
      toast.error(message);
    },
  });
};
