import React from "react";
import "./file.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import ecomm from "../assets/ecomm.png";
const Homepage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [modalData, setModalData] = useState({
    category: "",

    product_name: "",
    description: "",
    price: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize with false for not logged in

  // Function to handle login. This would typically set isLoggedIn to true.
  const handleLogin = () => {
    // Perform login logic here
    navigate("/login");
  };

  // Function to handle logout. This would typically set isLoggedIn to false.
  const handleLogout = () => {
    // Perform logout logic here

    setIsLoggedIn(false); // Set to false when the user logs out
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (modalData.length > 0) {
      axios
        .get("http://localhost:3300/product/add_product") // Replace with your actual category API endpoint
        .then((response) => {
          if (response.status === 200) {
            // Assuming your API returns an array of categories

            setProduct(response.data.data);
            setIsModalOpen(false);
          } else {
            // Handle other status codes if needed
            toast.error("Failed to fetch product");
          }
        })
        .catch((error) => {
          // Handle network errors or other errors
          console.error("Error:", error);
          toast.error("Failed to fetch product");
        });
    }

    setIsModalOpen(false);
  };

  useEffect(() => {
    const userData = localStorage.getItem("listing");

    if (userData) {
      try {
        setUser(JSON.parse(userData));
        setIsLoggedIn(true);
      } catch (error) {
        console.error("verification failed", error);
        toast.error("verification failed");
      }
    }
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3300/category/getAll") // Replace with your actual category API endpoint
      .then((response) => {
        if (response.status === 200) {
          // Assuming your API returns an array of categories

          setCategory(response.data.data);
        } else {
          // Handle other status codes if needed
          toast.error("Failed to fetch categories");
        }
      })
      .catch((error) => {
        // Handle network errors or other errors
        console.error("Error:", error);
        toast.error("Failed to fetch categories");
      });
  }, []);
  const handleSaveProduct = () => {
    axios
      .post("http://localhost:3300/product/add_product", modalData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("create product successfully");

          // Reset the form data to empty values
          setModalData({
            category: "",

            product_name: "",
            description: "",
            price: "",
          });
          closeModal();
        } else {
          // Handle other status codes if needed
          toast.error("signup failed");
        }
      })
      .catch((error) => {
        // Handle network errors or other errors
        console.error("Error:", error);
      });
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };
  const handlepricechange = (e) => {
    const { name, value } = e.target;
    const price = parseInt(value);
    setModalData({ ...modalData, [name]: price });
  };
  const handleclick = () => {
    toast.error("please first login");
  };

  return (
    <div>
      <nav className="navbar">
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
          {isLoggedIn ? ( // Conditionally render based on the login status
            <>
              {user.map((item, index) => (
                <div key={index}>
                  <input
                    className="profileImage"
                    type="text"
                    value={`${item.firstName
                      .charAt(0)
                      .toUpperCase()} ${item.lastName.charAt(0).toUpperCase()}`}
                  />
                </div>
              ))}

              <button className="user-actions" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="user-actions"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
              <button className="user-actions" onClick={handleLogin}>
                Login
              </button>
            </>
          )}
        </div>
      </nav>
      {isLoggedIn ? (
        <div className="button">
          <button className="product" onClick={openModal}>
            Create product
          </button>

          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h2>Create Product</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select
                      id="category"
                      className="form-control"
                      name="category"
                      value={modalData.category}
                      onChange={handlechange}
                    >
                      <option value="">Select a category</option>

                      {category && category.length > 0 ? (
                        category.map((categories, index) => {
                          if (categories.c_id === null) {
                            return (
                              <option key={index} value={categories.c_id}>
                                {categories.Name}
                              </option>
                            );
                          }
                        })
                      ) : (
                        <option value="">no categories available</option>
                      )}
                    </select>
                  </div>
                  <br />

                  <div className="form-group">
                    <label htmlFor="product_name">product_name:</label>
                    <input
                      type="text"
                      id="product_name"
                      className="form-control"
                      name="product_name"
                      value={modalData.product_name}
                      onChange={handlechange}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="description">description:</label>
                    <input
                      type="text"
                      id="description"
                      className="form-control"
                      name="description"
                      value={modalData.description}
                      onChange={handlechange}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="c_id">price:</label>
                    <input
                      type="number"
                      id="price"
                      className="form-control"
                      name="price:"
                      value={modalData.price}
                      onChange={handlepricechange}
                    />
                  </div>
                  <br />
                </form>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={closeModal}>
                    Close
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSaveProduct}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="button">
          <button className="product" onClick={handleclick}>
            Create product
          </button>
        </div>
      )}

      {product && product.length > 0 ? (
        <div>
          {product.map((item, index) => (
            <div class="card" key={index}>
              <img src={item.imageURL} class="card-img-top" alt="" />
              <div class="card-body">
                <h5 class="card-title">categories: {item.category}</h5>
                <h5 class="card-title">Product Name: {item.product_name}</h5>
                <p class="card-text">Description: {item.description}</p>
                <p class="card-text">Price: {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
      <footer>
        <div class="footer-content">
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

export default Homepage;
