import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Navbar = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("User");
  const onLogOut = () => {
    sessionStorage.removeItem("User");
    toast.success("Logged Out ");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
  return (
    <>
      <div className="container">
        <header className="border-bottom lh-1 py-3">
          <div className="row flex-nowrap justify-content-between align-items-center">
            <div
              style={{
                textAlign: "center",
                marginLeft: "340px",
                fontSize: "35px",
              }}
              className="col-4 text-center"
            >
              <Link
                className="blog-header-logo text-body-emphasis text-decoration-none"
                to="/"
              >
                Adarsha Blogs
              </Link>
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center">
              <Link
                className="btn btn-sm btn-outline-secondary"
                to="/create-account"
              >
                Create Account
              </Link>
              {token ? (
                <Link
                  onClick={onLogOut}
                  style={{ marginLeft: "40px" }}
                  className="btn btn-sm btn-outline-secondary"
                >
                  Log Out
                </Link>
              ) : (
                <Link
                  style={{ marginLeft: "40px" }}
                  className="btn btn-sm btn-outline-secondary"
                  to="/login"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </header>

        <div className="nav-scroller py-1 mb-3 border-bottom">
          <nav className="nav nav-underline justify-content-between">
            <Link className="nav-item nav-link link-body-emphasis" to="/">
              Home
            </Link>
            <Link
              className="nav-item nav-link link-body-emphasis"
              to="/create-blog"
            >
              Create Blog
            </Link>
            <Link
              className="nav-item nav-link link-body-emphasis"
              to="/profile"
            >
              Profile
            </Link>
            <Link
              className="nav-item nav-link link-body-emphasis"
              to="/about-us"
            >
              About Us
            </Link>
            <Link
              className="nav-item nav-link link-body-emphasis"
              to="/contact-us"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
      <ToastContainer style={{ marginRight: "500px" }} />
    </>
  );
};

export default Navbar;
