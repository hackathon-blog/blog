// const {
//   getAllUser,
//   getOneUserById,
//   deleteOneUserById
// } = require("../utilities/user_utilities");
// const passport = require("passport");
// const UserModel = require("../models/user_model");

// const allUsers = (req, res) => {
//   getAllUser().exec((err, users) => {
//     if (err) {
//       res.status(500);
//       return res.json({
//         error: err.message
//       });
//     }
//     res.render("user/users", { users, user: req.user });
//   });
// };

// const oneUser = (req, res) => {
//   getOneUserById(req.params.id).exec((err, user) => {
//     if (err) {
//       res.status(500);
//       return res.json({
//         error: err.message
//       });
//     }
//     res.render("user/user_profile", { user });
//   });
// };

// //current user
// const currentUser = (req, res) => {
//   getOneUserById(req.user._id).exec((err, user) => {
//     if (err) {
//       res.status(500);
//       return res.json({
//         error: err.message
//       });
//     }
//     res.render("user/current_user_profile", { user });
//   });
// };

// const deleteUser = (req, res) => {
//   deleteOneUserById(req.params.id)
//     .then(res.send("Recipe Blogger profile is deleted!"))
//     .catch(err => res.status(400).json("Error:" + err));
// };

// const registrationForm = (req, res) => {
//   res.render("auth/register");
// };

// const createNewRegistration = (req, res, next) => {
//   const newUserHandler = user => {
//     req.login(user, err => {
//       if (err) {
//         next(err);
//       } else {
//         res.redirect("/");
//       }
//     });
//   };

//   const { name, email, password } = req.body;

//   UserModel.create({ name, email, password }).then(newUserHandler);
// };

// const logout = (req, res) => {
//   req.session.destroy(() => {
//     res.redirect("/");
//   });
// };

// const loginForm = (req, res) => {
//   res.render("auth/login");
// };

// const login = (req, res, next) => {
//   const loginFunc = passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/users/login"
//   });
//   loginFunc(req, res, next);
// };

// module.exports = {
//   allUsers,
//   oneUser,
//   currentUser,
//   deleteUser,
//   registrationForm,
//   createNewRegistration,
//   logout,
//   loginForm,
//   login
// };
