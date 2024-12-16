"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.createPost = exports.deletePost = exports.getPosts = void 0;
const connection_1 = require("../connection");
const query_tamplates_1 = require("./query-tamplates");
const bson_objectid_1 = __importDefault(require("bson-objectid"));
const getPosts = (userId) => new Promise((resolve, reject) => {
    connection_1.connection.all(query_tamplates_1.selectPostsTemplate, [userId], (error, results) => {
        if (error) {
            reject(error);
        }
        resolve(results);
    });
});
exports.getPosts = getPosts;
const deletePost = (postId) => new Promise((resolve, reject) => {
    connection_1.connection.run(query_tamplates_1.deletePostTemplate, [postId], function (error) {
        if (error) {
            reject(error);
        }
        if (this.changes === 0) {
            reject(new Error('Post not found'));
        }
        resolve();
    });
});
exports.deletePost = deletePost;
const createPost = (title, body, userId) => new Promise((resolve, reject) => {
    const created_at = new Date().toISOString();
    const id = (0, bson_objectid_1.default)().toHexString();
    connection_1.connection.run(query_tamplates_1.insertPostTemplate, [id, title, body, userId, created_at], function (error) {
        if (error) {
            reject(error);
        }
        const newPost = {
            id,
            user_id: userId,
            title,
            body,
            created_at,
        };
        resolve(newPost);
    });
});
exports.createPost = createPost;
const updatePost = (postId, title, body) => new Promise((resolve, reject) => {
    connection_1.connection.run(query_tamplates_1.updatePostTemplate, [title, body, postId], function (error) {
        if (error) {
            reject(error);
        }
        if (this.changes === 0) {
            reject(new Error('Post not found'));
        }
        resolve();
    });
});
exports.updatePost = updatePost;
