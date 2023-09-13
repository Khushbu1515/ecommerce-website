import React from "react";
import "./file.css";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import ecomm from "../assets/ecomm.png";
const Homepage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
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
  const handleSaveProduct = () => {
    
    closeModal();
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
                    <label htmlFor="category">Categories</label>
                    <input type="text" id="categories" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="c_id">c_id</label>
                    <input type="text" id="c_id" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product_name">product_name</label>
                    <input type="text" id="product_name" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="c_id">C_ID</label>
                    <input type="text" id="c_id" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="c_id">C_ID</label>
                    <input type="text" id="c_id" className="form-control" />
                  </div>
                  
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
