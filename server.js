const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const exphbs  = require('express-handlebars');
const app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const port = process.env.PORT || 9999;

const uri = process.env.ATLAS_URI;
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true 
    })
    .then(() => { console.log("Connected to MongoDB!"); })
    .catch(err => { console.error("Error connecting to mongoDB", err);
});

//home route
app.get('/', function (req, res) {
    res.render('home');
});

//post routes
const postRouter = require("./routes/post_routes.js");
app.use("/post", postRouter);

app.listen(port, () => {
    console.log( `Express app listening on port ${port}`);
    
});