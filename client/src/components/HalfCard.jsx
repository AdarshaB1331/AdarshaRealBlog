import React from "react";
import { Link } from "react-router-dom";

const HalfCard = ({ post }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 d-flex">
      <article className="d-flex">
        <div
          className="card border border-dark"
          style={{
            "--bs-card-border-radius": 0,
            "--bs-card-inner-border-radius": 0,
          }}
        >
          <figure className="card-img-top m-0 overflow-hidden bsb-overlay-hover">
            <Link to={`/post/${post._id}`} href="#!">
              <img
                className="img-fluid bsb-scale bsb-hover-scale-up"
                loading="lazy"
                src={post && post.image}
                alt={post.title || "Image"}
              />
            </Link>
            <figcaption>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-eye text-white bsb-hover-fadeInLeft"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
              </svg>
              <h4 className="h6 text-white bsb-hover-fadeInRight mt-2">
                Read More
              </h4>
            </figcaption>
          </figure>
          <div className="card-body border-0 bg-white p-4">
            <div className="entry-header mb-3">
              <ul className="entry-meta list-unstyled d-flex mb-2">
                <li>
                  <a
                    className="link-dark link-opacity-75 link-opacity-100-hover text-decoration-none"
                    href="#!"
                  >
                    <span
                      style={{ fontSize: "17px", fontWeight: "bolder" }}
                      className="fs-7"
                    >
                      {post.dateJoined}
                    </span>
                  </a>
                </li>
              </ul>
              <h2 className="card-title entry-title h4 mb-0">
                <a
                  className="link-dark link-opacity-100 link-opacity-75-hover text-decoration-none"
                  href="#!"
                >
                  {post.title}
                </a>
              </h2>
            </div>
            <p className="card-text entry-summary text-secondary m-0 p-0">
              {post.description}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default HalfCard;
