const mongoose = require("mongoose");

const friendSchema = mongoose.Schema({
	friend1: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	friend2: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	bestFriends: { type: Boolean, default: false },
	favQuote: { type: String, default: "" },
});

const Friend = mongoose.model("friends", friendSchema);

module.exports = Friend;
