const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 9991;
require("dotenv").config();

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
//post routes
const postRouter = require("./routes/post_routes.js");
app.use("/", postRouter);

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});
