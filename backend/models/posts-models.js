const mongoose = require("mongoose");

const postsModels = mongoose.Schema({
  userId: { type: "string", require: true },
  postText: { type: "string", require: true },
  imageUrl: { type: "string", require: true },
  likes: { type: "string", default: 0 },
});

module.exports = mongoose.model("Posts", postsModels);
