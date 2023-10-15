const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: { type: String, unique: true, require: true, index: true, maxLength: 100 },
    email: { type: String, unique: true, require: true, maxLength: 50 },
    password: { type: String, require: true, maxLength: 50 }
});
const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };
