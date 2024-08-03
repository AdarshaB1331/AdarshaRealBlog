import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onName = (e) => {
    setName(e.target.value);
  };

  const onEmail = (e) => {
    setEmail(e.target.value);
  };

  const onPassword = (e) => {
    setPassword(e.target.value);
  };

  const createAccount = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/create-account", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      if (res.ok) {
        toast.success("User Created Successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (res.status === 409) {
        toast.error("Account with this Email already exists");
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Error creating account");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Error creating account");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.warn("Please fill in all fields");
      return;
    } else {
      createAccount();
    }
  };

  return (
    <div className="container" style={{ marginBottom: "300px" }}>
      <div
        className="row justify-content-center align-items-center"
        style={{ height: "100vh", marginBottom: "300px" }}
      >
        <div className="col-4" style={{ marginBottom: "140px" }}>
          <form className="form-signin text-center" onSubmit={onSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Create an Account</h1>
            <label htmlFor="inputName" className="sr-only">
              Name
            </label>
            <input
              onChange={onName}
              value={name}
              type="text"
              id="inputName"
              className="form-control"
              placeholder="Name"
              required
              autoFocus
              style={{ marginBottom: "30px" }}
            />
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
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Create Account
            </button>
            <p className="mt-5 mb-3 text-muted">© 2024</p>
          </form>
        </div>
      </div>
      <ToastContainer style={{ marginRight: "500px" }} />
    </div>
  );
};

export default CreateAccount;
