const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true, bcrypt: true  }
});


User.plugin(require("mongoose-bcrypt"), { 
    fields: ['password'] 
  });

// User.plugin(require("mongoose-bcrypt"))
module.exports = mongoose.model("User", User);
