
const LocalStrategy = require("passport-local");
const passport = require("passport");
const UserModel = require("../models/user_model");

//authenticated user gets a cookie/session established.
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// whole object/user info retrieved with help of above cookie/key.
passport.deserializeUser((userId, done) => {
  UserModel.findById(userId)
    .then(user => done(null, user))
    .catch(done);
});

//Here we are setting up the local strategy and passing it into passport. 
// The default fields passport-local looks for when logging in a user is username 
// and password but in our example we have email and password so we need to tell passport-local 
// to look for this field instead. Next we have a callback function which verifies the users login 
// credentials. Just like next() in our middleware passport uses done() to move on.
const canLogin = (user, password) => {
  if (user) {
    return user.verifyPasswordSync(password); //mongoose-bcrypt function
  } else {
    return false;
  }
};


const verifyCallback = (email, password, done) => {
  UserModel.findOne({ email })
    .then(user => {
      if (canLogin(user, password)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch(done);
};

const fields = { usernameField: "email" };
passport.use(new LocalStrategy(fields, verifyCallback));
