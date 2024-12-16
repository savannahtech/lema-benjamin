"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostTemplate = exports.insertPostTemplate = exports.deletePostTemplate = exports.selectPostsTemplate = void 0;
exports.selectPostsTemplate = `
SELECT *
FROM posts
WHERE user_id = ?
`;
exports.deletePostTemplate = `
DELETE 
FROM posts 
WHERE id = ? 
`;
exports.insertPostTemplate = `
INSERT 
INTO posts 
(id, title, body, user_id, created_at) VALUES (?, ?, ?, ?, ?)`;
exports.updatePostTemplate = `
  UPDATE posts 
  SET title = ?, body = ?
  WHERE id = ?
`;
