import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useParams } from "react-router-dom";
import spice from "../assets/spice.jpeg";
import { toast } from "react-toastify";
import "./file.css";

const Orderplaced = () => {
  const [items, setItems] = useState([]);
 const {uuids}=useParams();
  useEffect(() => {
    fetchData();
  }, []);
   // initially fetch the data with unique uuid
  const fetchData = () => {
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`,
      "Content-Type": "application/json",
    };

    axios
      .get(`http://localhost:3300/orderDetails/getOrderDetails?uuid=${uuids}`, {
        headers: customHeaders,
      })
      .then((response) => {
        if (response.status === 200) {
          
          
          setItems(response.data.data);
        }
      })
      .catch((error) => {
        toast.error("Failed to fetch orderss");

        console.error("Error:", error);
      });
  };
  
   const totalCost = items.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <nav className="navbarss">
        <h1>Order Summary</h1>
      </nav>

      {items.length > 0 ? (
        <div className="centered-container">
          <h1>Thank you</h1>
          <h1>Your order has been successfully placed</h1>
        </div>
      ) : null}

      <div className="cart-items">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div className="carts" key={index}>
              <div>
                <img className="cart-item-images" src={spice} alt="" />
              </div>
              <div className="cart-item-detailss">
                <p className="cart-category_names">
                  {" "}
                  Order id: {item.order_id}
                </p>
                <p className="cart-category_names">
                  {" "}
                  Category Name: {item.Product.Category.Name}
                </p>

                <p className="cart-category_names">
                  {" "}
                  Product Name: {item.Product.product_name}
                </p>
               
                <p className="cart-category_names">
                  {" "}
                  Quantity: {item.quantity}
                </p>

                <p className="cart-category_names">Sub total: {item.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No items are selected by the user</p>
        )}
      </div>

      {items && items.length > 0 ? (
        <div>
          <span className="payment">TOTAL COST: {totalCost}</span>
        </div>
      ) : (
        <p>No data to display.</p>
      )}
    </div>
  );
};

export default Orderplaced;
