const router = require("express").Router();
const {
  addNewPost,
  getAllPosts,
  getOnePost
} = require("../controllers/post_controller.js");

router.post("/", addNewPost);
router.get("/", getAllPosts);
router.get("/:id", getOnePost);

module.exports = router;
