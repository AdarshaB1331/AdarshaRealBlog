import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmail = (e) => {
    setEmail(e.target.value);
  };

  const onPassword = (e) => {
    setPassword(e.target.value);
  };

  const Login = async () => {
    try {
      const res = await fetch("https://adarsharealblog.onrender.com/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem("User", data);

        axios.defaults.headers.common["Authorization"] = `Bearer ${data}`;
        toast.success("Logged in successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (!res.ok) {
        console.log(res);
        toast.error("Login Failed Please write the correct information");
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warn("Please fill in all fields");
      return;
    } else {
      Login();
    }
  };

  return (
    <div className="container" style={{ marginBottom: "300px" }}>
      <div
        className="row justify-content-center align-items-center"
        style={{ height: "100vh", marginBottom: "300px" }}
      >
        <div className="col-4" style={{ marginBottom: "200px" }}>
          <form className="form-signin text-center">
            <h1 className="h3 mb-3 font-weight-normal">Please log in</h1>
            <label htmlFor="inputEmail" className="sr-only">
              Email address
            </label>
            <input
              value={email}
              onChange={onEmail}
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
              style={{ marginBottom: "30px" }}
            />
            <label htmlFor="inputPassword" className="sr-only">
              Password
            </label>
            <input
              value={password}
              onChange={onPassword}
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required
              style={{ marginBottom: "30px" }}
            />

            <button
              onClick={onSubmit}
              className="btn btn-lg btn-primary btn-block"
              type="submit"
            >
              Log In
            </button>
            <p className="mt-5 mb-3 text-muted">© 2024</p>
          </form>
        </div>
      </div>
      <ToastContainer style={{ marginRight: "500px" }} />
    </div>
  );
};

export default Login;
