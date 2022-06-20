const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  id: { type: String },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  employee: {
    type: [String],
    default: [],
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;