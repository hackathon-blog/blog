const express = require("express");
const router = express.Router();
const {
  allUsers,
  oneUser,
  deleteUser,
  currentUser,
  updateOneUser,
  registrationForm,
  createNewRegistration,
  logout,
  loginForm,
  login
} = require("../controllers/user_controller");

//routes for pages
//alway pass the dynamic object key, value into the routes

router.get("/", (req, res) => {
  // console.log(req.user);
  res.render("home", { user: req.user });
});


//all :id routes needs to stay at the bottom of other routes.

router.get("/register", registrationForm);
router.post("/register", createNewRegistration);
router.get("/logout", logout);
router.get("/login", loginForm);
router.post("/login", login);
router.get("/user_profile", currentUser);
router.get("/all_users", allUsers);
router.put("/:id", updateOneUser);
router.get("/:id", oneUser);
router.delete("/:id", deleteUser);

module.exports = router;
