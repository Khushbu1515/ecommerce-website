import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../dashboard/file.css";

const Updateprofile = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();

  const [formDatas, setFormDatas] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    EmailAddress: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    EmailAddress: "",
  });
  // initially call the api to fetch the user details
  useEffect(() => {
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    axios
      .get("http://localhost:3300/user/getuser", {
        headers: customHeaders,
      })
      .then((response) => {
        if (response.status === 200) {
          setFormDatas(response.data.profile);
        } else {
          toast.error("Category not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [user_id]);

  const handleChange = (e) => {
    // onchange set the data
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setFormDatas((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleupdate = (e) => {
    e.preventDefault();

    if (
      !formDatas.firstName ||
      !formDatas.lastName ||
      !formDatas.userName ||
      !formDatas.EmailAddress
    ) {
      // Set error messages htmlFor empty fields
      setErrors({
        firstName: !formDatas.firstName ? "this is required field" : "",
        lastName: !formDatas.lastName ? "this is required field" : "",
        userName: !formDatas.userName ? "this is required field" : "",
        EmailAddress: !formDatas.EmailAddress ? "this is required field" : "",
      });
      return; // Prevent form submission
    }
    else if (!/^[A-Za-z]+$/.test(formDatas.firstName) || !/^[A-Za-z]+$/.test(formDatas.lastName)||!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}/.test(formDatas.EmailAddress)) {
      // Set error messages for invalid names
      setErrors({
        firstName: !/^[A-Za-z]+$/.test(formDatas.firstName)
          ? "First name should only contain  desired letters"
          : "",
        lastName: !/^[A-Za-z]+$/.test(formDatas.lastName)
          ? "Last name should only contain desired letters"
          : "",
        userName: !formDatas.userName ? "Please fill in your username" : "",
        EmailAddress: !/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}/.test(formDatas.EmailAddress)
          ? "Please fill desired email address"
          : "",
      });
      return; // Prevent form submission
    }
    
    
    
    // update the data as we click on the button
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    axios
      .put("http://localhost:3300/user/update", formDatas, {
        headers: customHeaders, // pass the authorization to update the data
      })
      .then((response) => {
        if (response.status === 200) {
         
          navigate("/");
        } else {
          toast.error(" not updated");
        }
      })
      .catch((error) => {
        toast.error(" not updated enter valid data");
        console.error("Error fetching products:", error);
      });
  };
  // function for delete one item
  const handledelete = () => {
    const jwtToken = localStorage.getItem("JWTtoken"); // delete the user when we click on the button
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    axios
      .delete("http://localhost:3300/user/deleteUser", {
        headers: customHeaders,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("delete the user successfully");
          localStorage.removeItem("JWTtoken");
          navigate("/");
        } else {
          toast.error(" not deleted");
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  return (
    <div>
      <section className="gradient-form">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div>
              <div>
                <div>
                  <div className="col-lg-6">
                    <div className="container">
                      <form className="form">
                        <p className="head">Update Profile</p>
                        <br />

                        <div className="fields">
                          <label
                            className="form-label"
                            htmlFor="form2Example11"
                          >
                            First Name:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            name="firstName"
                            value={formDatas.firstName}
                            onChange={handleChange}
                          />
                          <div className="validation">{errors.firstName}</div>
                        </div>
                        <br />

                        <div className="fields">
                          <label
                            className="form-label"
                            htmlFor="form2Example11"
                          >
                            Last Name:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            name="lastName"
                            value={formDatas.lastName}
                            onChange={handleChange}
                          />
                          <div className="validation">{errors.lastName}</div>
                        </div>
                        <br />

                        <div className="fields">
                          <label
                            className="form-label"
                            htmlFor="form2Example11"
                          >
                            User Name:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            name="userName"
                            value={formDatas.userName}
                            onChange={handleChange}
                          />
                          <div className="validation">{errors.userName}</div>
                        </div>
                        <br />

                        <div className="fields">
                          <label
                            className="form-label"
                            htmlFor="form2Example11"
                          >
                            Email Address:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="EmailAddress"
                            name="EmailAddress"
                            value={formDatas.EmailAddress}
                            onChange={handleChange}
                          />
                          <div className="validation">{errors.EmailAddress}</div>
                        </div>

                        <br />
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <button
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="button"
                            onClick={handledelete}
                          >
                            delete
                          </button>
                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <button
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="button"
                            onClick={handleupdate}
                          >
                            Update
                          </button>
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
    </div>
  );
};

export default Updateprofile;
