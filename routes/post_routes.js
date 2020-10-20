const router = require("express").Router();
const {
  showForm,
  addNewPost,
  getAllPosts,
  getOnePost,
  updateOnePost,
  usersAllPosts,
  deletePost
} = require("../controllers/post_controller.js");

router.get("/new", showForm);
router.post("/new", addNewPost);
router.get("/", getAllPosts);
router.get("/:id", getOnePost);
router.put("/:id", updateOnePost);
router.get("/user/:userId", usersAllPosts);
router.delete("/:id", deletePost);

module.exports = router;
