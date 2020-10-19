const router = require("express").Router();
const {
  addNewPost,
  getAllPosts,
  getOnePost,
  updateOnePost,
  deletePost
} = require("../controllers/post_controller.js");

//routes for form : router.get("/new", );
router.post("/", addNewPost);
router.get("/", getAllPosts);
router.get("/:id", getOnePost);
router.put("/:id", updateOnePost);
router.delete("/:id", deletePost);

module.exports = router;
