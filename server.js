// we will pul in body-parser cors connect-mongo express-session mongoose-bcyrpt passport passport-local

const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const passport = require("passport");
const app = express();
const port = process.env.PORT || 9991;
require("dotenv").config();




app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
// app.use(express.static("resources"));
app.use(express.static(__dirname + "/resources"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// adding middleware for express-session
app.use(
  expressSession({
    secret: "World is not a fair place",
    resave: false,
    saveUninitialized: true,
    cookie: { expires: 2000000 },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

//getting current user
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

//config local stratagy for passport
require("./middleware/passport");
app.use(passport.initialize());
app.use(passport.session());

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch(err => {
    console.error("Error connecting to mongoDB", err);
  });
app.use(express.json());

app.use(express.json());

//home route

app.get("/", function(req, res) {
  res.render("home", { post: req.post });
});
// app.get("/", function(req, res) {
//   res.render("home");
// });

app.get("/about", function(req, res) {
  res.render("about");
});

//user routes
const userRouter = require("./routes/user_routes");
app.use("/user", userRouter);
//post routes
const postRouter = require("./routes/post_routes.js");
app.use("/post", postRouter);

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});
