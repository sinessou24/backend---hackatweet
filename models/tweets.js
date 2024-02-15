const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	message: { type: String},
	like: {type: Number},
	date: {type: Date},
	hashtag: [{type: String}]
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;


