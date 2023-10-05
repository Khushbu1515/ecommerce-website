import React, { useState, useEffect } from "react";
import axios from "axios";
import spice from "../assets/spice.jpeg"
import { toast } from "react-toastify";
import "./file.css";
const Placedorder = () => {
  const [order, setOrder] = useState([]);
  
  const [currentPage, setCurrentPage] = useState(1);
 
  const totalCost = order.reduce((total, items) => total + items.price, 0);
  useEffect(() => {
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    axios
      .get("http://localhost:3300/user/profile", { headers: customHeaders }) // Send the 'cart' object as JSON data
      .then((response) => {
        if (response.status === 200) {
          
          // You can handle further actions here, such as updating the cart state
          setOrder(response.data.profile.OrderDetails);
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="160"
          height="160"
          className="check"
          viewBox="0 0 16 16"
        >
          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
        </svg>
        <h1 className="placed">Thank you</h1>
        <h2 className="placedd">Successfully Order has been placed</h2>
        <div className="cart-items">
          {order.length > 0 ? (
            order.map((item,index) => (
              <div className="carts" key={index}>
              <div>
                <img className="cart-item-images" src={spice} alt="" />
              </div>
                <div className="cart-item-detailss">
                
                  <p className="cart-category_names">
                    Order id: {item.order_id}
                  </p>

                  <p className="cart-category_names">
                    quantity: {item.quantity}
                  </p>
                  <p className="cart-category_names">
                    Category Name: {item.Product.Category.Name}
                  </p>
                  <p className="cart-category_names">
                    Product Name: {item.Product.product_name}
                  </p>
                  <p className="cart-category_names">Sub total: {item.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No items are selected by the user</p>
          )}
        </div>
       
        <div className="placed">
        <span>TOTAL COST:{totalCost}</span>
       
      </div>
      </div>
    </div>
  );
};

export default Placedorder;
