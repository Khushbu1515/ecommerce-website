import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import spice from "../assets/spice.jpeg";
import ecomm from "../assets/ecomm.png";
import "./file.css";
import { useNavigate, useParams } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [showQuantityControls, setShowQuantityControls] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});

  const { categoryName } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const existingdata = localStorage.getItem("productdata");
    const cartdata = JSON.parse(existingdata);
    setProduct(cartdata);
  }, [categoryName]);

  const toggleQuantityControls = (productId) => {
    setShowQuantityControls(true);
    setSelectedProduct(productId);
  };

  // const handlecheckout = () => {
  //   axios
  //     .post("http://localhost:3300/user/checkOut", cart) // Send the 'cart' object as JSON data
  //     .then((response) => {
  //       if (response.status === 200) {
  //         toast.success("placed the order successfully");
  //         // You can handle further actions here, such as updating the cart state
  //         navigate("/checkout");
  //       } else {
  //         // Handle other status codes if needed
  //         toast.error("Failed to add to cart");
  //       }
  //     })
  //     .catch((error) => {
  //       // Handle network errors or other errors
  //       toast.error("Faileddddd to add to cart");
  //       console.error("Error:", error);
  //     });
  // };
  // Function to increase the quantity for a specific product
  const increaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };
  // Function to decrease the quantity for a specific product

  const decreaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0), // Ensure quantity is non-negative
    }));
  };

  const handleclick = (item, quantities) => {
    const selectedQuantity = quantities[item.product_id] || 1;
    const updatedprice = selectedQuantity * item.price;
    const cart = {
      product_id: item.productId,
      price: updatedprice,
      quantity: selectedQuantity || 1, // Default to 1 if quantity is not set
    };
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    axios
      .post("http://localhost:3300/cart/addToCart", cart, {
        headers: customHeaders,
      }) // Send the 'cart' object as JSON data
      .then((response) => {
        if (response.status === 200) {
          toast.success("add the cart successfully");

          response.data.updatedCart.map((obj) => {
            localStorage.setItem(
              "cartdata",
              JSON.stringify(response.data.updatedCart)
            );
          
            navigate(`/checkout/${obj.cart_id}/${obj.product_id}`);
        

          // You can handle further actions here, such as updating the cart state
        } )}else {
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
              onClick={handleclick}
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="50"
              fill="currentColor"
              class="bi bi-cart"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          </div>
        </nav>
      </div>

      <div className="cart-item">
        {product && product.length > 0 ? (
          <div>
            {product.map((item, index) => (
              <div className="cart" key={index}>
                <div>
                  <img className="cart-item-image" src={spice} alt="" />
                </div>
                <div className="cart-item-details">
                  <p className="cart-category_name">
                    Category Name: {item.categoryName}
                  </p>
                  <p className="cart-product_name">
                    Product Name: {item.productName}
                  </p>
                  <p className="cart-price"> Price:{item.price}</p>
                  <p className="cart-description">
                    {" "}
                    Description:{item.description}
                  </p>

                  {showQuantityControls &&
                  selectedProduct === item.product_id ? (
                    <div className="add">
                      <button onClick={() => decreaseQuantity(item.product_id)}>
                        -
                      </button>
                      <span> {quantities[item.product_id] || 1}</span>
                      <button onClick={() => increaseQuantity(item.product_id)}>
                        +
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        className="add"
                        onClick={() => toggleQuantityControls(item.product_id)}
                      >
                        Add +
                      </button>
                    </div>
                  )}
                  <button
                    className="addcart"
                    onClick={() => handleclick(item, quantities)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No items is selected by user</p>
        )}
      </div>
    </div>
  );
};
export default Cart;
