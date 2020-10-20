const {
  newPost,
  allPosts,
  onePostById,
  updateOnePostById,
  deleteOnePost
} = require("../utilities/post_utilities");

// form function
const showForm = (req, res) => {
  res.render("post/newForm");
};

// create new post
const addNewPost = (req, res) => {
  console.log(req.body);
  let post = newPost(req);
  if (post) {
    res.status(201);
    // res.render("onepost", { post: post });
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
    // res.render("onepost", { post });
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
    // res.render("posts", { posts: posts });
    // res.json(posts);
    res.render("post/allPosts", { posts: posts });
  });
};

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
  deletePost
};
