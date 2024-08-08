import React, { useEffect, useState } from "react";
import HalfCard from "../components/HalfCard";
import { setPosts } from "../../store/postSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const [postss, setPostss] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    const token = sessionStorage.getItem("User");

    try {
      // Retrieve the token from session storage

      // Make the request to the server with the Authorization header
      const res = await fetch(
        "https://adarsharealblog.onrender.com/api/products/posts/getPosts",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure 'Bearer ' is followed by the token
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }

      const posts = await res.json();

      setPostss(posts);
      dispatch(setPosts(posts));
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  return (
    <div>
      <div className="container overflow-hidden" style={{ marginTop: "90px" }}>
        <div className="row gy-4 gy-xxl-5">
          {postss.length > 0 ? (
            postss.map((post) => <HalfCard key={post._id} post={post} />)
          ) : (
            <h1 style={{ textAlign: "center" }}>No posts....</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
