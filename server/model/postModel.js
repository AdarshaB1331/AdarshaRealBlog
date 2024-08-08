import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  image: {
    type: String,
    default:
      "https://bootstrapbrain.com/demo/components/blogs/blog-6/assets/img/blog-image-1.jpg",
  },
  dateJoined: {
    type: String,
    default: "4th June 2004",
  },
  author: String,
  authorName: String,
});

const Posts = mongoose.model("BlogPosts", postSchema);

export default Posts;
