// const express = require("express");
// const router = express.Router();
// const {
//   allUsers,
//   oneUser,
//   deleteUser,
//   currentUser,
//   registrationForm,
//   createNewRegistration,
//   logout,
//   loginForm,
//   login
// } = require("../controllers/user_controller");

// //routes for pages
// //alway pass the dynamic object key, value into the routes

// router.get("/", (req, res) => {
//   // console.log(req.user);
//   res.render("home", { user: req.user });
// });

// router.get("/about", (req, res) => {
//   res.render("about", { title: "ABOUT RECIPE BLOG", user: req.user });
// });

// router.get("/contact", (req, res) => {
//   res.render("contact", { title: "Contact us", user: req.user });
// });

// //all :id routes needs to stay at the bottom of other routes.

// router.get("/register", registrationForm);
// router.post("/register", createNewRegistration);
// router.get("/logout", logout);
// router.get("/login", loginForm);
// router.post("/login", login);
// router.get("/user_profile", currentUser);
// router.get("/users", allUsers);
// router.get("/:id", oneUser);
// router.delete("/:id", deleteUser);

// module.exports = router;
