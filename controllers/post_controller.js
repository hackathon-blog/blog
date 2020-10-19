const {
  newPost,
  allPosts,
  onePostById,
  updateOnePostById
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

//update one post
const updateOnePost = (req, res) => {
  updateOnePostById(req.params.id).then(post => {
    post.title = req.body.title;
    post.description = req.body.description;

    post
      .save()
      .then(() => res.json(post))
      .catch(err => res.status(500).json(`error: ${err}`));
  });
};

module.exports = {
  addNewPost,
  getAllPosts,
  getOnePost,
  updateOnePost
};
