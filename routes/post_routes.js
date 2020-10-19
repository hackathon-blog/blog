const router = require("express").Router();
const { 
  addNewPost,
  getAllPosts } = require ("../controllers/post_controller.js");

router.post("/", addNewPost);
router.get("/", getAllPosts);


module.exports = router;