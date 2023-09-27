import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ecomm from "../assets/ecomm.png";
import spice from "../assets/spice.jpeg";
import { useParams, useNavigate } from "react-router-dom";
import "./file.css";

const Checkout = () => {
  const [carts, SetCarts] = useState([]);

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { product_id } = useParams();
  const totalCost = carts.reduce((total, cart) => total + cart.price, 0);
  useEffect(() => {
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    axios
      .get("http://localhost:3300/user/cart_listing", {
        headers: customHeaders,
      }) // Replace with your actual category API endpoint
      .then((response) => {
        if (response.status === 200) {
          
          SetCarts(response.data.cartListing);
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
  }, [product_id]);

  useEffect(() => {
    axios
      .get("http://localhost:3300/category/getAll") // Replace with your actual category API endpoint
      .then((response) => {
        if (response.status === 200) {
          // Assuming your API returns an array of categories

          setCategories(response.data.data);
        } else {
          // Handle other status codes if needed
          toast.error("Failed to fetch categories");
        }
      })
      .catch((error) => {
        // Handle network errors or other errors
        console.error("Error:", error);
      });
  }, []);
  const handlecheckout = () => {
    axios
      .post("http://localhost:3300/user/checkOut") // Send the 'cart' object as JSON data
      .then((response) => {
        if (response.status === 200) {
          toast.success("placed the order successfully");
          // You can handle further actions here, such as updating the cart state
          navigate("/placedorder");
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
  const handledeleteall = () => {
   
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    axios
      .delete(`http://localhost:3300/cart/deleteWholeCart`, {
        headers: customHeaders,
      })

      .then((cartResponse) => {  
        if (cartResponse.status === 200) {
          // Both product and cart deletion were successful
          toast.success("Delete  all the order successfully");
        } else {
          toast.error("Failed to delete all cart");
        }
      })
      .catch((error) => {
        toast.error("Faileddd all to delete");
        console.error("Error:", error);
      });
  };

  const handledelete = () => {
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    axios
      .delete(`http://localhost:3300/cart/removeAllCart`, {
        headers: customHeaders,
      })

      .then((cartResponse) => {
        if (cartResponse.status === 200) {
          // Both product and cart deletion were successful
          toast.success("Delete the order successfully");
        } else {
          toast.error("Failed to delete cart");
        }
      })
      .catch((error) => {
        
        console.error("Error:", error);
      });
  };

  return (
    <div>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="50"
              fill="currentColor"
              class="bi bi-cart"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            {carts.length > 0 ? <span>[{carts.length}]</span> : null}
          </div>
        </nav>
      </div>

      <div className="cart-items">

      <div>
      <button className="allitem" onClick={handledeleteall}>Clear items</button>
      </div>
        {carts && carts.length > 0 ? (
          <div>
            {carts.map((cartss, index) => (
              <div className="carts" key={index}>
                <div>
                  <img className="cart-item-images" src={spice} alt="" />
                </div>
                <div className="cart-item-detailss">
                  {categories.map((categoryItems) => {
                    if (cartss.Product.c_id === categoryItems.cat_id) {
                      return (
                        <h5
                          class="cart-category_names"
                          key={categoryItems.cat_id}
                        >
                          Category Name: {categoryItems.Name}
                        </h5>
                      );
                    }
                    return null; // Return null for products without a matching category
                  })}
                  <p className="cart-product_names">
                    Product Name: {cartss.Product.product_name}
                  </p>

                  {carts && carts.length > 0 && (
                    <div>
                      {carts.map((cart, cartIndex) => {
                        if (cartIndex === index) {
                          console.log("caaaart", cart.cart_id);
                          return (
                            <div key={cartIndex}>
                              <p className="cart-quantity_names">
                                Quantity: {cart.quantity}
                              </p>
                              <p className="cart-price_names">
                                Subtotal: {cart.price}
                              </p>
                            </div>
                          );
                        }
                        return null; // Return null for other cart items
                      })}

                      {carts.map((cartes, cartIndexs) => {
                        if (cartIndexs === index) {
                          return (
                            <div className="svg" key={cartIndexs}>
                              <svg
                                onClick={handledelete}
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                className="bi bi-trash"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                              </svg>
                            </div>
                          );
                        }
                        return null; // Return null for other cart items
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No items selected by the user</p>
        )}
      </div>
      <div className="placed">
        <span>TOTAL COST:{totalCost}</span>
        <button onClick={handlecheckout}>Place order</button>
      </div>
    </div>
  );
};
export default Checkout;
