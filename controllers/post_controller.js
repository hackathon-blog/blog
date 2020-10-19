const { newPost, allPosts } = require("../utilities/post_utilities");

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

// const addNewPost = function(req) {
//   let date = Date.now();
//   // Set dates for this new post
//   req.body.create_date = date;
//   req.body.modified_date = date;
//   return new Post(req.body);
// };

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
  getAllPosts
};
