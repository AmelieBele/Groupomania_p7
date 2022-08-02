const mongoose = require("mongoose");

const postsModels = mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, require: true },
  postText: { type: "string", require: true },
  imageUrl: { type: "string" },
  likes: { type: "string", default: 0 },
});

module.exports = mongoose.model("Posts", postsModels);
