const Post = require("../models/post_model");

// create
const newPost = function(req) {
  //   let date = Date.now();
  //   return new Post({ ...req.body, ...{ date: date } }).save();
  const title = req.body.title;
  const author = req.body.author;
  const authorId = req.body.authorId;
  const description = req.body.description;
  const date = Date.parse(req.body.date);
  const newPost = new Post({
    title,
    author,
    authorId,
    description,
    date
  });

  return newPost.save();
};

//read
const allPosts = function(req) {
  return Post.find();
};

// update

// delete

module.exports = {
  newPost,
  allPosts
};