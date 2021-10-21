const express = require("express");
const route = express.Router();
const Controller = require("../controllers/controller");

route.get('/', Controller.listPosts)
route.get('/add-post', Controller.addPostForm)
route.post('/add-post', Controller.addPost)
route.get('/:PostId', Controller.commentForm) 
route.post('/:PostId', Controller.commentPost) 

route.get('/:PostId/like', Controller.likePost)
route.get('/:PostId/dislike', Controller.dislikePost)
route.get('/:PostId/like/:CommentId', Controller.likeComment)
route.get('/:PostId/dislike/:CommentId', Controller.dislikeComment)

route.get('/mypost/:UserId', Controller.myPost)
route.get('/mypost/:UserId/delete/:PostId', Controller.myPostDelete)

module.exports = route