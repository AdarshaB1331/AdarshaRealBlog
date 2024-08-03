import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const FullCard = () => {
  let { id } = useParams();
  let allProducts = useSelector((state) => state.posts);

  let thatParticularPost =
    Array.isArray(allProducts) && allProducts.find((post) => post._id === id);

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

          {/* Additional Images */}
        </div>
      </div>
    </div>
  );
};

export default FullCard;
