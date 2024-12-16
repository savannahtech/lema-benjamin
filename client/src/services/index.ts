import { PostType } from '../types/posts';
import api from './api';

export const fetchUsers = async (pageNumber: number, pageSize: number) => {
  const { data } = await api.get(
    `/users?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
  return data;
};

export const fetchUsersCount = async () => {
  const { data } = await api.get('/users/count');
  return data;
};

export const fetchPostsByUserId = async (userId: string) => {
  const { data } = await api.get(`/posts?userId=${userId}`);
  return data;
};

export const deletePostById = async (postId: string) => {
  await api.delete(`/posts/${postId}`);
};

export const createPost = async (post: PostType) => {
  const { data } = await api.post('/posts', post);
  return data;
};

export const updatePost = async (postId: string, post: PostType) => {
  const { data } = await api.put(`/posts/${postId}`, post);
  return data;
};
