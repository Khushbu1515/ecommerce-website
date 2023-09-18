import React from 'react'
import axios from "axios";
import {toast} from "react-toastify";
import { useEffect, useState } from "react";
import spice from "../assets/spice.jpeg";
import "./file.css";

const Checkout = () => {
    const [checkout, SetCheckout] =useState([])
  useEffect(() => {
    axios
      .get("http://localhost:3300/cart/getAll") // Replace with your actual category API endpoint
      .then((response) => {
        if (response.status === 200) {
          // Assuming your API returns an array of categories

          SetCheckout(response.data.data);
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
  return (
    <div></div>
  )
}

export default Checkout