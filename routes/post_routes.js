const router = require("express").Router();
const {
  addNewPost,
  getAllPosts,
  getOnePost,
  updateOnePost
} = require("../controllers/post_controller.js");

router.post("/", addNewPost);
router.get("/", getAllPosts);
router.get("/:id", getOnePost);
router.put("/:id", updateOnePost);

module.exports = router;
