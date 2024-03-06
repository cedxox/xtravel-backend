const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    profile: {type: String, default: "https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png"},

}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)