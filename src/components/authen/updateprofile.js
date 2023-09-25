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

  useEffect(() => {
    // Retrieve the data for the book with the given id from localStorage
    const userData = JSON.parse(localStorage.getItem("listing"));
    const userToEdit = userData.find(
      (datas) => datas.user_id === parseInt(user_id)
    );

    if (userToEdit) {
      // If the user with the given id exists, set the form data to its values
      setFormDatas(userToEdit);
    } else {
      // If the book with the given id does not exist, navigate back to the homepage or handle it as needed
      navigate("/");
    }
  }, [user_id, navigate]);
  const handleChange = (e) => {  // onchange set the data
    const { name, value } = e.target;
    setFormDatas((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleupdate = () => { // update the data as we click on the button
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    axios
      .put("http://localhost:3300/user/update", formDatas, {  
        headers: customHeaders,    // pass the authorization to update the data
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("update the data successfully");
        } else {
          toast.error(" not updated");
        }
      })
      .catch((error) => {
        toast.error(" not updatedddd");
        console.error("Error fetching products:", error);
      });
  };

  const handledelete = () => {   
    const jwtToken = localStorage.getItem("JWTtoken");   // delete the user when we click on the button
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
        } else {
          toast.error(" not deleted");
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }; 
    //   update form
  return (
    <div>
      <section className="gradient-form">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div >
              <div >
                <div >
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
