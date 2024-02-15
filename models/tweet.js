const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
	firstname: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	username: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	picture: String,
	message: { type: String, default: "" },
	like: Number,
});

const Tweet = mongoose.model("tweet", tweetSchema);

module.exports = Tweet;
