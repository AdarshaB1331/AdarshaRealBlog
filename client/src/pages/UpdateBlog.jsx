import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../firebase"; // Import Firebase Storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage methods
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Keeping your impo
const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("User");
  const allPosts = useSelector((store) => store.posts);
  const [disableButton, setDisableButton] = useState(false);
  let decoded = {};
  if (token) {
    try {
      decoded = jwtDecode(token);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }

  let userPost = [];
  let postToBeUpdated;
  if (Array.isArray(allPosts)) {
    userPost = allPosts.filter((post) => post.author === decoded._id);
    postToBeUpdated = userPost.find((posts) => posts._id === id);
  }

  const [title, setTitle] = useState(
    (postToBeUpdated && postToBeUpdated.title) || ""
  );
  const [description, setDescription] = useState(
    (postToBeUpdated && postToBeUpdated.description) || ""
  );
  const [content, setContent] = useState(
    (postToBeUpdated && postToBeUpdated.content) || ""
  );
  const [image, setImage] = useState(null); // State for image

  const onTitle = (e) => {
    setTitle(e.target.value);
  };

  const onDescription = (e) => {
    setDescription(e.target.value);
  };

  const onContent = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const updateBlog = async () => {
    setDisableButton(true);
    const token = sessionStorage.getItem("User");
    if (!title || !description || !content || !image) {
      toast.error("None of the fields can be empty");
      return;
    }
    if (!token) {
      toast.error("Unauthorized. Please log in.");
      return;
    }
    let imageUrl = "";
    try {
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`); // Create a reference to the image file
        await uploadBytes(imageRef, image); // Upload the image
        imageUrl = await getDownloadURL(imageRef);
      }

      const res = await fetch(
        "https://adarsharealblog.onrender.com/api/products/post/update",
        {
          method: "PATCH",
          body: JSON.stringify({
            id: id,
            title,
            description,
            content,
            image: imageUrl,
          }), // Include image URL in the request
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        toast.success("Blog updated successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (!token) {
        toast.error("Unauthorized. Please log in.");
        setDisableButton(false);
        // Redirect to login or handle unauthorized error
      } else {
        toast.error("Failed to update blog");
        setDisableButton(false);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to update blog");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateBlog();
  };

  return (
    <section className="py-3 py-md-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
            <h2 className="mb-4 display-5 text-center">Update your Blog</h2>
            <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-lg-center">
          <div className="col-12 col-lg-9">
            <div className="bg-white border rounded shadow-sm overflow-hidden">
              <form onSubmit={onSubmit}>
                <div className="row gy-4 gy-xl-5 p-4 p-xl-5">
                  <div className="col-12">
                    <label htmlFor="title" className="form-label">
                      Blog Title <span className="text-danger">*</span>
                    </label>
                    <input
                      value={title}
                      onChange={onTitle}
                      type="text"
                      className="form-control"
                      id="title"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="description" className="form-label">
                      Blog Description <span className="text-danger">*</span>
                    </label>
                    <input
                      value={description}
                      onChange={onDescription}
                      type="text"
                      className="form-control"
                      id="description"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="content" className="form-label">
                      Blog Content <span className="text-danger">*</span>
                    </label>
                    <textarea
                      value={content}
                      onChange={onContent}
                      className="form-control"
                      id="content"
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <label htmlFor="image" className="form-label">
                      Blog Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      onChange={handleImageChange}
                      accept="image/jpeg, image/png, image/gif"
                    />
                  </div>
                  <div className="col-12">
                    <div className="d-grid">
                      <button
                        disabled={disableButton}
                        type="submit"
                        className="btn btn-primary btn-sl"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default UpdateBlog;
