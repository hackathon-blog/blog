const {
  getAllUser,
  updateOneUserById,
  getOneUserById,
  deleteOneUserById
} = require("../utilities/user_utilities");
// log ina nd log out are passport functions
const passport = require("passport");
const UserModel = require("../models/user_model");

const allUsers = (req, res) => {
  getAllUser().exec((err, users) => {
    if (err) {
      res.status(500);
      return res.json({
        error: err.message
      });
    }
    res.render("user/users", { users, user: req.user });
  });
};

//a single user by id
const oneUser = (req, res) => {
  getOneUserById(req.params.id).exec((err, user) => {
    if (err) {
      res.status(500);
      return res.json({
        error: err.message
      });
    }
    res.render("user/user_profile", { user });
  });
};

//current user
const currentUser = (req, res) => {
  getOneUserById(req.user._id).exec((err, user) => {
    if (err) {
      res.status(500);
      return res.json({
        error: err.message
      });
    }
    res.render("user/current_user_profile", { user });
  });
};

const updateOneUser = (req, res) => {
    let updateUser = updateOneUserById(req.params.id).then(user => {
      user.name = req.body.name;
      user.password = req.body.password;
      user.email = req.body.email;
  
      user
        .save()
        .then(() => res.json(user))
        .catch(err => res.status(500).json(`error: ${err}`));
    });
  
    if (updateUser) {
      res.status(201);
      // render needs to be completed - page not created yet
      res.json(updateUser);
    } else {
      res.status(500);
      res.send(`Error: error while updating user ${req.error}`);
    }
  };

const deleteUser = (req, res) => {
  deleteOneUserById(req.params.id)
    .then(res.send("Profile is deleted!"))
    .catch(err => res.status(400).json("Error:" + err));
};

const registrationForm = (req, res) => {
  res.render("auth/register");
};

const createNewRegistration = (req, res, next) => {
  const newUserHandler = user => {
    req.login(user, err => {
      if (err) {
        next(err);
      } else {
        res.redirect("/");
      }
    });
  };

  const { name, email, password } = req.body;

  UserModel.create({ name, email, password }).then(newUserHandler);
};

//destroying session
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

const loginForm = (req, res) => {
  res.render("auth/login");
};

const login = (req, res, next) => {
  const loginFunc = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login"
  });
  loginFunc(req, res, next);
};

module.exports = {
  allUsers,
  oneUser,
  currentUser,
  updateOneUser,
  deleteUser,
  registrationForm,
  createNewRegistration,
  logout,
  loginForm,
  login
};
