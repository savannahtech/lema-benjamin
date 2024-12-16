"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_1 = require("../db/posts/posts");
const users_1 = require("../db/users/users");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.query.userId) === null || _a === void 0 ? void 0 : _a.toString();
    if (!userId) {
        res.status(400).send({ error: 'userId is required' });
        return;
    }
    const posts = yield (0, posts_1.getPosts)(userId);
    res.send(posts);
}));
router.delete('/:postId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    if (!postId) {
        res.status(400).send({ error: 'Invalid post ID' });
        return;
    }
    try {
        yield (0, posts_1.deletePost)(postId);
        res.status(200).send({ message: 'Post deleted successfully' });
    }
    catch (error) {
        res.status(500).send({
            error: error instanceof Error ? error.message : 'Internal Server Error',
        });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, body, userId } = req.body;
        if (!title || !body || !userId) {
            res.status(400).send({ error: 'Title, body, and user id are required' });
            return;
        }
        const userExists = yield (0, users_1.getUserById)(userId);
        if (!userExists) {
            res.status(400).send({ error: 'User not found' });
            return;
        }
        const newPost = yield (0, posts_1.createPost)(title, body, userId);
        res.status(201).send(newPost);
    }
    catch (error) {
        res.status(500).send({
            error: error instanceof Error ? error.message : 'Internal Server Error',
        });
    }
}));
router.put('/:postId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const { title, body, userId } = req.body;
    if (!postId) {
        res.status(400).send({ error: 'Invalid post ID' });
        return;
    }
    if (!title || !body) {
        res.status(400).send({ error: 'Title and body are required' });
        return;
    }
    try {
        yield (0, posts_1.updatePost)(postId, title, body);
        res.status(200).send({ message: 'Post updated successfully' });
    }
    catch (error) {
        if (error instanceof Error &&
            error.message === 'Post not found or unauthorized') {
            res.status(404).send({ error: error.message });
        }
        else {
            res.status(500).send({
                error: error instanceof Error ? error.message : 'Internal Server Error',
            });
        }
    }
}));
exports.default = router;
