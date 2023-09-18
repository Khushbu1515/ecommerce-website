import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import spice from "../assets/spice.jpeg";
import "./file.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate=useNavigate();
  const [cart, SetCart] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3300/cart/getAll") // Replace with your actual category API endpoint
      .then((response) => {
        if (response.status === 200) {
          // Assuming your API returns an array of categories

          SetCart(response.data.data);
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
  const handlecheckout = () => {
    axios
      .post("http://localhost:3300/user/checkOut", cart) // Send the 'cart' object as JSON data
      .then((response) => {
        if (response.status === 200) {
          toast.success("placed the order successfully");
          // You can handle further actions here, such as updating the cart state
          navigate("/checkout");
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
  };

  return (
    <div className="cart-item">
      {cart && cart.length > 0 ? (
        <div>
          {cart.map((item, index) => (
            <div className="cart" key={index}>
              <div className="cart-item-image">
                <img src={spice} alt="" />
              </div>
              <div className="cart-item-details">
                <h5 className="cart-title">Product ID: {item.product_id}</h5>
                <p className="cart-description">Description: {item.price}</p>
                <p className="cart-price">Quantity: {item.quantity}</p>
                <button onClick={handlecheckout}>place order</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No items in the cart.</p>
      )}
    </div>
  );
};

export default Cart;
