import React, { useState, useEffect } from "react";
import axios from "axios";
import spice from "../assets/spice.jpeg";
import { toast } from "react-toastify";
//import Skeleton from "./Skeleton";
import "./file.css";
const Orderhistory = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const totalCost = items.reduce((total, items) => total + items.price, 0);
  useEffect(() => {
    fetchData(page);
  }, []);

  const fetchData = (pageNum) => {
    setIsLoading(true);
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    axios
      .get(`http://localhost:3300/user/profile?page=${pageNum}&size=${5}`, {
        headers: customHeaders,
      }) // Send the 'cart' object as JSON data
      .then((response) => {
        if (response.status === 200) {
          // You can handle further actions here, such as updating the cart state

          setItems((prevItems) => [
            ...prevItems,
            ...response.data.profile.OrderDetails,
          ]);
          setPage(pageNum + 1);
        }
      })
      .catch((error) => {
        // Handle network errors or other errors
        toast.error("Faileddddd to add to cart");
        setIsLoading(false);
        console.error("Error:", error);
      });

    //setIsLoading(false); // Set isLoading to false regardless of success or failure
  };
  console.log(items, "itemsss");

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !isLoading
      ) {
        fetchData(page); // Fetch more data when the user scrolls to the bottom of the page
      }
      setIsLoading(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, page]);

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
                  <p className="cart-category_names">Sub total: {item.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No items are selected by the user</p>
          )
        ) : (
          // Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} />)
          null
        )}
      </div>

      {items && items.length > 0 && isLoading ? (
        <div>
          <span className="payment">TOTAL COST: {totalCost}</span>
          <p>This is the end of the cart.</p>
        </div>
      ) : items && items.length === 0 ? (
        <p>No items in the order history.</p>
      ) : (
        <p>Page {page} is loading....</p>
      )}
      
    </div>
  );
};

export default Orderhistory;
