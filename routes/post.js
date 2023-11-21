const express = require('express');
const routes = express.Router();
const path = require('path');
const post = require('../models/postModel');
const PostController = require('../controller/postController');
const { create } = require('domain');

routes.get('/' ,PostController.post);
routes.post('/post_data',post.uploadImagePath,PostController.post_data);
routes.get('/view_post',PostController.view_post);
routes.get('/deletePost/:id',PostController.deletePost);
routes.get('/updatePost/:id',PostController.updatePost);
routes.get('/edit_post',post.uploadImagePath,PostController.edit_post);

module.exports = routes;