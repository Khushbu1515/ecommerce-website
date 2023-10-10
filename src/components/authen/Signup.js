import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import "../dashboard/file.css";
import { useNavigate } from "react-router-dom";
import ecomm from "../assets/ecomm.png";
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    EmailAddress: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the form data to the backend using Axios
    axios
      .post("http://localhost:3300/user/signUp", formData)
      .then((response) => {
        if (response.status === 200) {
          // Signup was successful
          // You can show a success message to the user
          toast.success("Signup successful");
          // Reset the form data to empty values
          setFormData({
            firstName: "",
            lastName: "",
            EmailAddress: "",
            password: "",
          });
        } else {
          // Handle other status codes if needed
          toast.error("Signup failed");
        }
      })
      .catch((error) => {
        // Handle network errors or other errors
        console.error("Error:", error);
        alert("Signup failed");
      });
  };

  return (
    <div>
      <nav className="navbars">
        <div>
          <img className="logo" src={ecomm} alt=""></img>
        </div>
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
        <div>
          <button className="user-actions" onClick={() => navigate("/signup")}>
            Signup
          </button>
          <button className="user-actions" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </nav>
      <section className="gradient-form">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="container">
                      <form className="form">
                        <p className="head">Sign UP</p>

                        <br />

                        <div className="fields">
                          <label className="form-label" for="form2Example11">
                            firstName:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="firstname"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                          />
                          <div />
                          <br />
                          <div className="fields">
                            <label className="form-label" for="form2Example11">
                              lastName:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="lastname"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                            />
                            <div />
                            <br />

                            <div className="fields">
                              <label className="form-label" for="form2Example11">
                                EmailAddress:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="email"
                                name="EmailAddress"
                                value={formData.EmailAddress}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="fields">
                              <label className="form-label" for="form2Example11">
                                password:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="password"
                                placeholder="password"
                                value={formData.password}
                                onChange={handleChange}
                              />
                            </div>

                            <br />
                            <div className="d-flex align-items-center justify-content-center pb-4">
                              <button
                              className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                type="button"
                                onClick={handleSubmit}
                              >
                                Signup
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="footer-content">
          <p>@copy; 2023 MATRIX MEDIA SOLUTION PVT. LTD.</p>
          <ul>
            <li>
              <a href="/">Privacy Policy</a>
            </li>
            <li>
              <a href="/">Terms of Service</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};
export default SignUp;
