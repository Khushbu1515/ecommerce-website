import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../dashboard/file.css";

const Updateprofile = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState("")
  const [formDatas, setFormDatas] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    EmailAddress: "",
    images: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    EmailAddress: "",
    images: "",
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
        console.log(response)
          setFormDatas(response.data.profile);
         
          
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error("Error fetching products:", error);
      });
  }, [user_id]);
  console.log(formDatas,"....images")
  const handleChange = (e) => {
    // onchange set the data
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setFormDatas((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleupdate = () => {
    const imagename = formDatas.images.name;
  
    if (imagename) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const base64DataUrl = event.target.result;
  
        const updateProduct = {
          firstName: formDatas.firstName,
          lastName: formDatas.lastName,
          EmailAddress: formDatas.EmailAddress,
          password: formDatas.password,
          images: base64DataUrl,
        };
  
        // ... the rest of your code for making the update request
  
        // Send the update request with the updated 'updateProduct'
        const jwtToken = localStorage.getItem("JWTtoken");
        const customHeaders = {
          authorization: `${jwtToken}`,
          "Content-Type": "application/json",
        };
  
        axios
          .put("http://localhost:3300/user/update", updateProduct, {
            headers: customHeaders,
          })
          .then((response) => {
            if (response.status === 200) {
              console.log(response);
              toast.success("Updated successfully");
              setImage(response);
              navigate("/");
            }
          })
          .catch((error) => {
            toast.error(error.response.data.message);
            console.error("Error updating user:", error);
          });
      };
  
      // Read the selected image file as a data URL
      reader.readAsDataURL(formDatas.images);
    } else {
      toast.error("Please select an image for the user.");
    }
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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setErrors((prevErrors) => ({ ...prevErrors, images: "" }));
    setFormDatas((prevData) => ({ ...prevData, images: file }));
    

     // Update the state to store the selected file
     setFormDatas({ ...formDatas, images: file });
  
     // If you also want to display the file name in a text input
     const fileNameInput = document.getElementById('fileNameInput');
     if (fileNameInput) {
      fileNameInput.value = file ? file.name : 'no file selected';
    }
     
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
                          <div className="validation">
                            {errors.EmailAddress}
                          </div>
                        </div>
                        <div className="form-group">
                        <label htmlFor="images"> Image:</label>
                        <input
                          type="file"
                          id="images"
                          className="form-control"
                          name="images"
                          
                          onChange={handleImageChange}
                        />
                        <br />
                        <input
                          type="text"
                          id="fileNameInput"
                          value={formDatas.images && formDatas.images.name ? formDatas.images.name : formDatas.images}
                          className="form-control"
                          readOnly
                        />
                        <div className="validation">{errors.images}</div>
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
