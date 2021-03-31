let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userDb = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String
});

let User = mongoose.model("user", userDb);

module.exports = User;