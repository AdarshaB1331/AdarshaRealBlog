import React from "react";
import { jwtDecode } from "jwt-decode"; // Keeping your import as is
import { useSelector } from "react-redux";
import HalfCard from "../components/HalfCard";

const Profile = () => {
  const token = sessionStorage.getItem("User");
  const allPosts = useSelector((store) => store.posts);

  let decoded = {};
  if (token) {
    try {
      decoded = jwtDecode(token);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }

  let userPosts = [];
  if (Array.isArray(allPosts)) {
    userPosts = allPosts.filter((post) => post.author === decoded._id);
  }

  return (
    <div>
      {token ? (
        <div style={{ textAlign: "center" }}>
          <h2 style={{ marginTop: "30px" }}>Name:</h2>
          <h3>{decoded.name || "Not available"}</h3>
          <h2 style={{ marginTop: "30px" }}>Email:</h2>
          <h3>{decoded.email || "Not available"}</h3>
          <h2 style={{ marginTop: "30px" }}>Your Posts:</h2>
          <div style={{ marginLeft: "230px" }}>
            <div
              className="container overflow-hidden"
              style={{ marginTop: "90px" }}
            >
              <div className="row gy-4 gy-xxl-5">
                {userPosts.length > 0 ? (
                  userPosts.map((post) => (
                    <HalfCard
                      style={{ marginTop: "40px" }}
                      key={post._id}
                      post={post}
                    />
                  ))
                ) : (
                  <p style={{ marginLeft: "-130px" }}>No posts available</p>
                )}
              </div>
            </div>{" "}
          </div>
        </div>
      ) : (
        <h1 style={{ textAlign: "center", marginTop: "90px" }}>
          Login to view your profile
        </h1>
      )}
    </div>
  );
};

export default Profile;
