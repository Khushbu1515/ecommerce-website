import React from "react";
import "./file.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ecomm from "../assets/ecomm.png";
const Homepage = () => {
 const navigate=useNavigate();

   const handleclick=()=>
  {

toast.error("please first login")
  }
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
          <button className="user-actions" onClick={() => navigate("/signup")}>Signup</button>
          <button className="user-actions" onClick={() => navigate("/login")}>Login</button>
        </div>
      </nav>

      <div className="button">
        <button className="product" onClick={handleclick}>Create product</button>
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

export default Homepage;
