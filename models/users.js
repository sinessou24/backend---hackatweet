const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	firstname: { type: String, required: true },
	secondname: { type: String, required: true },
	password: { type: String, required: true },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
