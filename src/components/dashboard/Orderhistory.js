import React, { useState, useEffect } from "react";
import axios from "axios";
import spice from "../assets/spice.jpeg";
import { toast } from "react-toastify";
//import Skeleton from "./Skeleton";
import "./file.css";
const Orderhistory = () => {
  let isScrolling = false;
  const [moreData, setNoMoreData] = useState("");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const totalCost = items.reduce((total, items) => total + items.price, 0);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = (pages = 1) => {
    setIsLoading(true);
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    axios
      .get(`http://localhost:3300/user/profile?page=${pages}&size=${5}`, {
        headers: customHeaders,
      }) // Send the 'cart' object as JSON data
      .then((response) => {
        if (response.status === 200) {
          // You can handle further actions here, such as updating the cart state

          if (response.data.profile.OrderDetails.length > 0) {
            // There's more data to add
            setItems((prevItems) => [
              ...prevItems,
              ...response.data.profile.OrderDetails,
            ]);
            setPage(pages + 1);
          } else {
            // No more data to fetch, notify the user
            toast.info("End of the cart");
            setNoMoreData("no data");
          }
        }
      })
      .catch((error) => {
        // Handle network errors or other errors
        toast.error("Faileddddd to add to cart");
        setIsLoading(false);
        console.error("Error:", error);
      });
    setIsLoading(false);
  };
  const handleScroll = () => {
    if (
      !isScrolling &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight
    ) {
      
        isScrolling = true;
        alert("you  are the bottom of the page ");

        fetchData(page); // Fetch more data when the user scrolls to the bottom of the page
        setTimeout(() => {
          isScrolling = false; // Reset the flag after a delay
        }, 1000); // Adjust the delay as needed
      
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  return (
    <div>
      <nav className="navbarss">
        <h1>Order List</h1>
      </nav>

      <div className="cart-items">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div className="carts" key={index}>
              <div>
                <img className="cart-item-images" src={spice} alt="" />
              </div>
              <div className="cart-item-detailss">
                <p className="cart-category_names">Order id: {item.order_id}</p>

                <p className="cart-category_names">quantity: {item.quantity}</p>
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

      {moreData === "no data" ? (
        <div className="endcart">
          <h1>TOTAL COST: {totalCost}</h1>
          <h2> This is the end of the cart.</h2>
        </div>
      ) : (
        <p>page {page} Loading...</p>
      )}

      {!isLoading && !isScrolling && items.length === 0 && (
        <p>No items in the order history.</p>
      )}
    </div>
  );
};

export default Orderhistory;
