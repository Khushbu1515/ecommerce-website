import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ecomm from "../assets/ecomm.png"
import spice from "../assets/spice.jpeg";
import { useParams } from "react-router-dom";
import "./file.css";

const Checkout = () => {
  const [carts, SetCarts] = useState([]);
  const [products, Setproducts]=useState([])
  const { cart_id,product_id } = useParams();
  useEffect(() => {
    const existingcartdata = localStorage.getItem("cartdata");
    const existingproductdata = localStorage.getItem("productdata");
    const cartsdata = JSON.parse(existingcartdata);
    const productsdata=JSON.parse(existingproductdata);
    SetCarts(cartsdata);
    Setproducts(productsdata)

    
  }, [cart_id,product_id]);
  
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
          </div>
        </nav>
      </div>


        <div className="cart-items">
          {products && products.length > 0 ? (
            <div>
              {products.map((product, index) => (
                <div className="carts" key={index}>
                  <div>
                    <img className="cart-item-images" src={spice} alt="" />
                  </div>
                  <div className="cart-item-detailss">
                    <p className="cart-category_names">
                      Category Name: {product.categoryName}
                    </p>
                    <p className="cart-product_names">
                      Product Name: {product.productName}
                    </p>
                    {carts && carts.length > 0 ? (
                      <div>
                        {carts.map((items, index) => (
                          <div>
                            <div>
                              
                              <p className="cart-quantity_names">
                                Quantity: {items.quantity}
                              </p>
                              <p className="cart-price_names">
                                Price: {items.price}
                              </p>
                            </div>
                            <button className="addcarts"></button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No items in the cart</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No items selected by the user</p>
          )}
        </div>
        </div>
      );
    };
    
    export default Checkout;