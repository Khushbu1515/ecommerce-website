import React, {useState, useEffect } from 'react'
import axios from "axios";
import { toast } from "react-toastify";
import "./file.css";
const Placedorder = () => {
 const [order,setOrder]=useState([])
  useEffect(() => {
    
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    axios
      .get("http://localhost:3300/user/profile",{headers:customHeaders}) // Send the 'cart' object as JSON data
      .then((response) => {
        if (response.status === 200) {
          toast.success("  give  the order successfully");
          // You can handle further actions here, such as updating the cart state
          setOrder(response.data.profile)
        } else {
          // Handle other status codes if needed
          toast.error("Failed to add to cart");
        }
      })
      .catch((error) => {
        // Handle network errors or other errors
        toast.error("Faileddddd to add to cart");
        console.error("Error:", error);
      });
  }, []);
  return (
    <div>
    <nav className="navbarss">
          
          <h1>Order Summary</h1>
        </nav>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" className="check" viewBox="0 0 16 16">
        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
       </svg>
       <h1 className='placed'>Thank you</h1>
       <h1 className='placed'>Successfully Order has been placed</h1>
      
      </div>
      </div>
  
  )
}

export default Placedorder;