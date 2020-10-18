const Post = require('../models/post_model');

// create
const newPost = function (req) {
    let date = Date.now();
    return new Post(req.body);
}

//read
const allPosts = function (req) {
    return Post.find();
};

// update

// delete

module.exports = {
    newPost,
    allPosts
}