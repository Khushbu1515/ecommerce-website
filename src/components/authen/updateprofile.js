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
          // setFormDatas({
          //   ...formDatas,
          //   images: response.data.profile.imageUrl
          // });
          
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
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
      !formDatas.EmailAddress ||
      !formDatas.images
    ) {
      // Set error messages htmlFor empty fields
      setErrors({
        firstName: !formDatas.firstName ? "this is required field" : "",
        lastName: !formDatas.lastName ? "this is required field" : "",
        userName: !formDatas.userName ? "this is required field" : "",
        EmailAddress: !formDatas.EmailAddress ? "this is required field" : "",
        images: !formDatas.images ? "this is required field" : "",
      });
      return; // Prevent form submission
    } else if (
      !/^[A-Za-z]+$/.test(formDatas.firstName) ||
      !/^[A-Za-z]+$/.test(formDatas.lastName) ||
      !/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}/.test(formDatas.EmailAddress)
    ) {
      // Set error messages for invalid names
      setErrors({
        firstName: !/^[A-Za-z]+$/.test(formDatas.firstName)
          ? "First name should only contain  desired letters"
          : "",
        lastName: !/^[A-Za-z]+$/.test(formDatas.lastName)
          ? "Last name should only contain desired letters"
          : "",
        userName: !formDatas.userName ? "Please fill in your username" : "",
        EmailAddress: !/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}/.test(
          formDatas.EmailAddress
        )
          ? "Please fill desired email address"
          : "",
      });
      return; // Prevent form submission
    }
    // Convert the image to Base64 and then submit the form
    const imageFile = formDatas.images;
    if (imageFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        // The event.target.result will contain the Base64 data URL
        const base64DataUrl = event.target.result;

        // Assign the Base64 data URL to your backEndProduct
        const updateProduct = {
          firstName: formDatas.firstName,
          lastName: formDatas.lastName,
          EmailAddress: formDatas.EmailAddress,
          password: formDatas.password,
          images: base64DataUrl,
        };
        axios
          .post("http://localhost:3300/user/update", updateProduct)

          .then((response) => {
            if (response.status === 200) {
              setImage(response)
              navigate("/");
            }
          })
          .catch((error) => {
            toast.error(error.response.data.message);
            console.error("Error fetching products:", error);
          });
      };
      // Read the image file as a Data URL

      // Read the image file as a Data URL
      reader.readAsDataURL(imageFile);
    } else {
      // Handle the case where no image file is selected, if needed
      toast.error("Please select an image for the product.");
    }
    // update the data as we click on the button
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
