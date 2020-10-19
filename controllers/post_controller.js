const {
  newPost,
  allPosts,
  onePostById
} = require("../utilities/post_utilities");

// create new post
const addNewPost = (req, res) => {
  console.log(req.body);
  let post = newPost(req);
  if (post) {
    res.status(201);
    res.json(post);
  } else {
    res.status(500);
    res.send(`Error: ${req.error}`);
  }
};

//get one post
const getOnePost = (req, res) => {
  onePostById(req.params.id).exec((err, post) => {
    if (err) {
      res.status(500);
      return res.json({ error: err.message });
    }
    res.json(post);
  });
};

// get all posts
const getAllPosts = (req, res) => {
  allPosts(req).exec((err, posts) => {
    if (err) {
      res.status(500);
      return res.json({ error: err.message });
    }
    res.json(posts);
  });
};

module.exports = {
  addNewPost,
  getAllPosts,
  getOnePost
};
