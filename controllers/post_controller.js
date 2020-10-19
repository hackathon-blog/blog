const { newPost,allPosts } = require("../utilities/post_utilities");

const addNewPost = (req, res) => {
  newPost(req).save((err, post) => {
    if (err) {
        res.status(500);
        return res.json({
            error: err.message
        });
    }
    res.status(201);
    res.send(post);
})
}

const getAllPosts = (req, res) => {
   allPosts(req).exec((err, posts) => {
     if(err){
       res.status(500)
       return res.json ({ error: err.message })
     }
     res.json(posts)
   });
}

module.exports = {
    addNewPost,
    getAllPosts
}