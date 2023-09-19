import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import spice from "../assets/spice.jpeg";
import "./file.css";
import { useNavigate, useParams } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [showQuantityControls, setShowQuantityControls] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [category, setCategory] = useState([]);

  // const { product_id } = useParams();
  const { c_id,product_id} = useParams();
  console.log("dddddddddddddddddddddddddddd",c_id,product_id)
  const [product, setProduct] = useState([]);
  
  
  useEffect(() => {
    axios
      .get("http://localhost:3300/category/getAll") // Replace with your actual category API endpoint
      .then((response) => {
        if (response.status === 200) {
          // Assuming your API returns an array of categories

          setCategory(response.data.data);
        } else {
          // Handle other status codes if needed
          toast.error("Failed to fetch category");
        }
      })
      .catch((error) => {
        // Handle network errors or other errors
        console.error("Error:", error);
        toast.error("Failed to fetch category");
      });
  }, [c_id]);
  useEffect(() => {
    axios
      .get("http://localhost:3300/product/getAll") // Replace with your actual category API endpoint
      .then((response) => {
        if (response.status === 200) {
          // Assuming your API returns an array of categories

          setProduct(response.data.data);
        } else {
          // Handle other status codes if needed
          toast.error("Failed to fetch product");
        }
      })
      .catch((error) => {
        // Handle network errors or other errors
        console.error("Error:", error);
        toast.error("Failed to fetch product");
      });
  }, [c_id,product_id]);
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
  const handleclicked = ()=>{
    console.log("ddddddddddddddddddddddddddddd");
  }
  const handleclick = (item,quantities) => {
    const selectedQuantity = quantities[item.product_id] || 1;
    const updatedprice = selectedQuantity * item.price;
    const cart = {
      product_id: item.product_id,
      price: updatedprice,
      quantity: selectedQuantity || 1, // Default to 1 if quantity is not set
    };
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    axios
      .post("http://localhost:3300/cart/addToCart", cart,{headers:customHeaders}) // Send the 'cart' object as JSON data
      .then((response) => {
        if (response.status === 200) {
          toast.success("add the cart successfully");
          // You can handle further actions here, such as updating the cart state
         
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

  console.log("fffffffffffffffffffff",product)
  return (
    <div className="cart-item">
      {product && product.length > 0 ? (
        <div>
          {product.map((item, index) => (
            <div className="cart" key={index}>
              <div className="cart-item-image">
                <img src={spice} alt="" />
              </div>
              <div className="cart-item-details">
              {category.map((categoryItem) => {
                if (item.c_id === categoryItem.cat_id) {
                  return (
                    <h5 class="card-title" key={categoryItem.cat_id}>
                      Category: {categoryItem.Name}
                    </h5>
                  );
                }
                return null; // Return null for products without a matching category
              })}
                <p className="cart-product_name">Product Name: {item.product_name}</p>
                <p className="cart-price"> Price:{item.price}</p>
                <p className="cart-description"> Description:{item.description}</p>

                {showQuantityControls && selectedProduct === item.product_id ? (
                  <div>
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
                      onClick={() => toggleQuantityControls(item.product_id)}
                    >
                      Add +
                    </button>
                  </div>
                )}
                <button onClick={handleclick(item, quantities)}>
                  Add to cart
                </button>
                <button onClick={handleclicked(item, quantities)}>
                  Add to cartssssss
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No items is selected by user</p>
      )}
    </div>
  );
};

export default Cart;
