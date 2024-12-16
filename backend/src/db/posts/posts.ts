import { connection } from '../connection';
import {
  deletePostTemplate,
  insertPostTemplate,
  selectPostsTemplate,
  updatePostTemplate,
} from './query-tamplates';
import { Post } from './types';
import ObjectId from 'bson-objectid';

export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    connection.all(selectPostsTemplate, [userId], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results as Post[]);
    });
  });

export const deletePost = (postId: string): Promise<void> =>
  new Promise((resolve, reject) => {
    connection.run(deletePostTemplate, [postId], function (error) {
      if (error) {
        reject(error);
      }
      if (this.changes === 0) {
        reject(new Error('Post not found'));
      }
      resolve();
    });
  });

export const createPost = (
  title: string,
  body: string,
  userId: number
): Promise<Post> =>
  new Promise((resolve, reject) => {
    const created_at = new Date().toISOString();
    const id = ObjectId().toHexString();
    connection.run(
      insertPostTemplate,
      [id, title, body, userId, created_at],
      function (error) {
        if (error) {
          reject(error);
        }
        const newPost: Post = {
          id,
          user_id: userId,
          title,
          body,
          created_at,
        };
        resolve(newPost);
      }
    );
  });

export const updatePost = (
  postId: string,
  title: string,
  body: string
): Promise<void> =>
  new Promise((resolve, reject) => {
    connection.run(
      updatePostTemplate,
      [title, body, postId],
      function (error) {
        if (error) {
          reject(error);
        }
        if (this.changes === 0) {
          reject(new Error('Post not found'));
        }
        resolve();
      }
    );
  });
