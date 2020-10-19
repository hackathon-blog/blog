const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 9999;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(() => { console.log("Connected to MongoDB!"); })
.catch(err => { console.error("Error connecting to mongoDB", err); });

//post routes
const postRouter = require("./routes/post_routes.js");
app.use("/", postRouter);

app.listen(port, () => {
    console.log( `Express app listening on port ${port}`);
    
});