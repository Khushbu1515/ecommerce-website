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
    images: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    EmailAddress: "",
    password: "",
    images: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setFormData({ ...formData, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setErrors((prevErrors) => ({ ...prevErrors, images: "" }));
    setFormData((prevData) => ({ ...prevData, images: file }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.EmailAddress ||
      !formData.password ||
      !formData.images
    ) {
      // Set error messages htmlFor empty fields
      setErrors({
        firstName: !formData.firstName ? "This is a required field" : "",
        lastName: !formData.lastName ? "This is a required field" : "",
        EmailAddress: !formData.EmailAddress ? "This is a required field" : "",
        password: !formData.password ? "This is a required field" : "",
        images: !formData.images ? "This is a required field" : "",
      });
      return; // Prevent form submission
    } else if (
      !/^[A-Za-z]+$/.test(formData.firstName) ||
      !/^[A-Za-z]+$/.test(formData.lastName) ||
      !/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}/.test(formData.EmailAddress) ||
      !/^(?=.*[A-Z])(?=.*[!@#\$%^&*])(?=.*[0-9]).{8,}$/g.test(formData.password)
    ) {
      // Set error messages for invalid names
      setErrors({
        firstName: !/^[A-Za-z]+$/.test(formData.firstName)
          ? "First name should only contain  desired letters"
          : "",
        lastName: !/^[A-Za-z]+$/.test(formData.lastName)
          ? "Last name should only contain desired letters"
          : "",
        password: !/^(?=.*[A-Z])(?=.*[!@#\$%^&*])(?=.*[0-9]).{8,}$/g.test(
          formData.password
        )
          ? "Please fill the  strong password"
          : "",
        EmailAddress: !/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}/.test(
          formData.EmailAddress
        )
          ? "Please fill desired email address"
          : "",
      });
      return; // Prevent form submission
    }
   

    // Convert the image to Base64 and then submit the form
    const imageFile = formData.images;

    if (imageFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        // The event.target.result will contain the Base64 data URL
        const base64DataUrl = event.target.result;

        // Assign the Base64 data URL to your backEndProduct
        const signupProduct = {
        
          firstName: formData.firstName,
          lastName: formData.lastName,
          EmailAddress: formData.EmailAddress,
          password: formData.password,
          images: base64DataUrl,
        };
        axios
          .post("http://localhost:3300/user/signUp", signupProduct)
          .then((response) => {
            if (response.status === 200) {
              toast.success("create product successfully");

              // Reset the form data to empty values
              setFormData({
                firstName: "",
                lastName: "",
                EmailAddress: "",
                password: "",
                images: "",
              });
              
            } 
          })
          // Read the image file as a Data URL

          .catch((error) => {
            // Handle network errors or other errors
            toast.error(error.response.data.message);
            console.error("Error:", error);
          });
      };
      // Read the image file as a Data URL
      reader.readAsDataURL(imageFile);
    } else {
      // Handle the case where no image file is selected, if needed
      toast.error("Please select an image for the product.");
    }
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
                          <label
                            className="form-label"
                            htmlFor="form2Example11"
                          >
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
                          <div className="validation">{errors.firstName}</div>
                          <div />
                          <br />
                          <div className="fields">
                            <label
                              className="form-label"
                              htmlFor="form2Example11"
                            >
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
                            <div className="validation">{errors.lastName}</div>
                            <div />
                            <br />

                            <div className="fields">
                              <label
                                className="form-label"
                                htmlFor="form2Example11"
                              >
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
                              <div className="validation">
                                {errors.EmailAddress}
                              </div>
                            </div>

                            <div className="fields">
                              <label
                                className="form-label"
                                htmlFor="form2Example11"
                              >
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
                              <div className="validation">
                                {errors.password}
                              </div>
                            </div>

                            <br />
                            <div className="form-group">
                              <label htmlFor="c_id"> Image:</label>
                              <input
                                type="file"
                                id="images"
                                className="form-control"
                                name="images"
                                onChange={handleImageChange}
                              />
                              <div className="validation">{errors.images}</div>
                            </div>
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
