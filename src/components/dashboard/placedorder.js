import React, { useState, useEffect } from "react";
import axios from "axios";
import spice from "../assets/spice.jpeg";
import { toast } from "react-toastify";
import Skeleton from "./Skeleton";
import "./file.css";
const Placedorder = () => {
  //const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const totalCost = items.reduce((total, items) => total + items.price, 0);

  const fetchData = (page) => {
    setTimeout(() => {
      setIsLoading(true);
      const jwtToken = localStorage.getItem("JWTtoken");
      const customHeaders = {
        authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
        "Content-Type": "application/json", // Specify the content type if needed
      };
      axios
        .get(`http://localhost:3300/user/profile?page=${page}&size=${5}`, {
          headers: customHeaders,
        }) // Send the 'cart' object as JSON data
        .then((response) => {
          if (response.status === 200) {
            // You can handle further actions here, such as updating the cart state

            setItems((prevItems) => [
              ...prevItems,
              ...response.data.profile.OrderDetails,
            ]);
            setPage((prevPage) => prevPage + 1);
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
    }, 3000); // Simulating a 3-second delay 
    setIsLoading(false);            // Set isLoading to false regardless of success or failure
  };
  
  console.log(items, "itemmmm");
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      // Fetch more data when the user scrolls to the bottom of the page
      fetchData(page + 1); // Increment the page to load the next page of data
    }
  };

  useEffect(() => {
    fetchData(page); // Initial fetch with page 1
    
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  return (
    <div>
      <nav className="navbarss">
        <h1>Order List</h1>
      </nav>
     
        <div className="cart-items">
          {isLoading ? (
            items.length > 0 ? (
              items.map((item, index) => (
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
                    <p className="cart-category_names">
                      Sub total: {item.price}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No items are selected by the user</p>
            )
          ) : (
            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} />
            ))
          )}
        </div>
        <div className="cart-items">
          {items.length > 0 ? (
            items.map((item, index) => (
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
            null
          )}
        </div>
        {items && items.length > 0 ? (
          isLoading ? (
            <p>Page {page} Loading...</p>
          ) : (
            <div>
              <span>TOTAL COST: {totalCost}</span>
              <p>This is the end of the cart.</p>
            </div>
          )
        ) : (
          null
        )}
        
      </div>
    
  );
};

export default Placedorder;
