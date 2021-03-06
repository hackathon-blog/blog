const {
  newPost,
  allPosts,
  onePostById,
  updateOnePostById,
  getUsersAllPosts,
  deleteOnePost
} = require("../utilities/post_utilities");

// form function
const showForm = (req, res) => {
  res.render("post/newForm", { user: req.user });
};

// create new post
const addNewPost = (req, res) => {
  newPost(req)
    .then(post => {
      console.log(post);
      console.log("saved", post);
      res.redirect(`/post/${post._id}`);
    })
    .catch(err => {
      res.render("post/singlePost", { error: err.message, user: req.user });
    });
};

//get one post
const getOnePost = (req, res) => {
  onePostById(req.params.id).exec((err, post) => {
    if (err) {
      res.status(500);
      return res.json({ error: err.message });
    }
    // res.render("onepost", { post });
    // res.json(post);
    res.render("post/singlePost", { post: post, user: req.user });
  });
};

//get one users posts
const usersAllPosts = (req, res) => {
  getUsersAllPosts(req.params.userId).exec((err, posts) => {
    if (err) {
      res.status(500);
      return res.json({ error: err.message });
    }
    res.render("post/allPosts", { posts: posts, user: req.user });
  });
};

//current users all posts
const currentUsersAllPosts = (req, res) => {
  console.log(req.user);
  getUsersAllPosts(req.user._id).exec((err, posts) => {
    if (err) {
      res.status(500);
      return res.json({ error: err.message });
    }
    res.render("post/allPosts", { posts: posts, user: req.user });
  });
};

// get all posts
const getAllPosts = (req, res) => {
  allPosts(req).exec((err, posts) => {
    if (err) {
      res.status(500);
      return res.json({ error: err.message });
    }
    res.render("post/allPosts", { posts: posts, user: req.user });
  });
};

//recent posts - for home page
// const getRecentPosts = (req, res) => {
//   allPosts(req).exec((err, posts) => {
//     if (err) {
//       res.status(500);
//       return res.json({ error: err.message });
//     }
//     // res.render("posts", { posts: posts });
//     // res.json(posts);
//     res.render("/", { posts: posts });
//   });
// };

//update one post
const updateOnePost = (req, res) => {
  let updatedPost = updateOnePostById(req.params.id).then(post => {
    post.title = req.body.title;
    post.description = req.body.description;

    post
      .save()
      .then(() => res.json(post))
      .catch(err => res.status(500).json(`error: ${err}`));
  });

  if (updatedPost) {
    res.status(201);
    // render the updated post here
    res.json(updatedPost);
  } else {
    res.status(500);
    res.send(`Error: error while updating post ${req.error}`);
  }
};

//delete post
const deletePost = (req, res) => {
  deleteOnePost(req)
    .then(res.send("Post is deleted!"))
    .catch(err => res.status(400).json("Error:" + err));
};

module.exports = {
  showForm,
  addNewPost,
  getAllPosts,
  getOnePost,
  updateOnePost,
  usersAllPosts,
  currentUsersAllPosts,
  deletePost
};
