import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; //
const FullCard = () => {
  const token = sessionStorage.getItem("User");
  let decoded = {};
  if (token) {
    try {
      decoded = jwtDecode(token);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }

  let { id } = useParams();
  const navigate = useNavigate();
  let allProducts = useSelector((state) => state.posts);

  let thatParticularPost =
    Array.isArray(allProducts) && allProducts.find((post) => post._id === id);
  const deleteBlog = async () => {
    if (!token) {
      toast.error("Unauthorized. Please log in.");
      return;
    }
    try {
      const res = await fetch(
        "http://localhost:5000/api/products/post/delete",
        {
          method: "DELETE",
          body: JSON.stringify({
            id,
          }), // Include image URL in the request
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        toast.success("Blog deleted successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else if (!token) {
        toast.error("Unauthorized. Please log in.");
        // Redirect to login or handle unauthorized error
      } else {
        toast.error("Failed to delete the  blog");
      }
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };
  return (
    <div className="container mt-4 mb-4" style={{ marginTop: "80px" }}>
      <div className="card border-0 shadow-sm">
        {/* Title */}

        {/* Main Image */}
        {thatParticularPost && thatParticularPost.image && (
          <img
            src={thatParticularPost.image}
            className="card-img-top"
            alt="Sample Blog Image"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        )}
        <div className="card-header bg-white border-0">
          <h1 className="card-title">
            {thatParticularPost ? thatParticularPost.title : "Title not found"}
          </h1>
        </div>

        {/* Card Body */}
        <div className="card-body">
          {/* Date */}
          <p className="text-muted">
            {thatParticularPost
              ? thatParticularPost.dateJoined
              : "Date not found"}
          </p>
          <p className="card-text">
            Posted By:{" "}
            {thatParticularPost
              ? thatParticularPost.authorName
              : "Author not found"}
          </p>
          {/* Description */}
          <p className="card-text">
            {thatParticularPost
              ? thatParticularPost.description
              : "Description not found"}
          </p>

          {/* Content */}
          <div className="content">
            <p>
              {thatParticularPost
                ? thatParticularPost.content
                : "Content not found"}
            </p>
          </div>
          {decoded && decoded._id == thatParticularPost.author && (
            <button
              onClick={deleteBlog}
              type="button"
              className="btn btn-danger"
            >
              Delete your post
            </button>
          )}

          {decoded && decoded._id == thatParticularPost.author && (
            <Link
              to={`/post/update/${thatParticularPost._id}`}
              type="button"
              className="btn btn-warning"
              style={{ marginLeft: "70px" }}
            >
              Update your post
            </Link>
          )}

          {/* Additional Images */}
        </div>
      </div>
      <ToastContainer style={{ marginRight: "500px" }} />
    </div>
  );
};

export default FullCard;
