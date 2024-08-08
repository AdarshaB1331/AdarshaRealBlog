import Posts from "../model/postModel.js";
import Message from "../model/messageModel.js";
export const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send("error getting the posts");
  }
};

export const postPosts = async (req, res) => {
  const { title, description, content, image, dateJoined } = req.body;
  const date = new Date(dateJoined);
  const realDate = date.toISOString().split("T")[0];
  try {
    const postObject = new Posts({
      title,
      content,
      description,
      author: req.body.user._id,
      authorName: req.body.user.name,
      image,
      dateJoined: realDate,
    });

    await postObject.save();
    res.status(200).json(postObject);
  } catch (error) {
    res.status(500).json({ message: "error saving the post" });
  }
};
export const contactUs = async (req, res) => {
  const { name, email, phoneNumber, message } = req.body;

  try {
    const messages = new Message({
      name,
      email,
      phoneNumber,
      message,
    });
    await messages.save();
    res.status(200).send("Successfully sent the message...");
  } catch (error) {
    res.status(500).json({ message: "error sending the message" });
  }
};
export const deletePost = async (req, res) => {
  const { id } = req.body;
  try {
    const post = await Posts.findByIdAndDelete(id);
    res.status(200).json({ message: "Successfully deleted the post" });
  } catch (error) {
    res.status(500).send("Error deleting the post");
  }
};
export const updatePost = async (req, res) => {
  const { id, title, content, description, image } = req.body;

  // Check if the ID is provided
  if (!id) {
    return res.status(400).send("Post ID is required");
  }

  try {
    const updatedPost = await Posts.findByIdAndUpdate(id, {
      title: title,
      content: content,
      description: description,
      image: image,
    });

    if (!updatedPost) {
      return res.status(404).send("Post not found");
    }

    res.status(200).send("Successfully updated your blog");
  } catch (error) {
    console.error("Error updating the post:", error);
    res.status(500).send("Error updating the post");
  }
};
