const express = require("express");
const mongoose = require("mongoose");
const exphbs  = require('express-handlebars');


const app = express();
const port = process.env.PORT || 9991;
require("dotenv").config();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('resources'))

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

//home route
app.get('/', function (req, res) {
    res.render('home');
});

app.get('/about', function (req, res) {
  res.render('about');
});

//post routes
const postRouter = require("./routes/post_routes.js");
app.use("/post", postRouter);

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});
