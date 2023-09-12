import React from "react";
import "../dashboard/file.css";
import { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";
import ecomm from "../assets/ecomm.png";

const Productlisting = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = localStorage.getItem("listing");

    if (userData) {
      // Parse the user data
      const parsedUser = JSON.parse(userData);

      // Set the user data in state
      setUser(parsedUser);
    }
  }, []);

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

        <div className="profile-icon">
          <div className="profile-picture">
            <img
              src={user.profilePicture || "/path/to/default-image.png"}
              alt={`${user.firstName.toUpperCase} ${user.lastName.toUpperCase}`}
            />
          </div>
        </div>
      </nav>

      <div className="button">
        <button className="product">Create product</button>
      </div>
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

export default Productlisting;
