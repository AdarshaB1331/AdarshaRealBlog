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
