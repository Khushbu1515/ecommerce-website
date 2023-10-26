import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ecomm from "../assets/ecomm.png";

import { useNavigate } from "react-router-dom";
import "./file.css";

const Checkout = () => {
  const [carts, SetCarts] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [address, SetAddress] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("Checkout");
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({});
  const [formData, setformData] = useState({
  
    address: "",
    state: "",
    city: "",
    zip_code: "",
    country: "",
  });
  const [modalData, setModalData] = useState({
  
    address: "",
    state: "",
    city: "",
    zip_code: "",
    country: "",
  });
  const [errors, setErrors] = useState({
   
    address: "",
    state: "",
    city: "",
    zip_code: "",
    country: "",
  });
  const totalCost = carts.reduce((total, cart) => total + cart.price, 0);
  useEffect(() => {
    getListCarts(); // access all the carts data
  }, []);
  const getListCarts = () => {
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
        }
      })
      .catch((error) => {
        // Handle network errors or other errors
        console.error("Error:", error);
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3300/category/getAll") // Replace with your actual category API endpoint
      .then((response) => {
        if (response.status === 200) {
          // Assuming your API returns an array of categories

          setCategories(response.data.data);
        }
      })
      .catch((error) => {
        // Handle network errors or other errors
        toast.error(error.response.data.message);
        console.error("Error:", error);
      });
  }, []);

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
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error("Error:", error);
      });
  };
  const handleCheckout = () => {
    // Toggle the button text and show payment options
    setButtonText("Placed order");
    setShowPaymentOptions(true);
    if (buttonText === "Placed order") {
      const jwtToken = localStorage.getItem("JWTtoken");
      const customHeaders = {
        Authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
        "Content-Type": "application/json", // Specify the content type if needed
      };
      axios
        .get("http://localhost:3300/user/checkOut", { headers: customHeaders }) // Send the 'cart' object as JSON data
        .then((response) => {
          if (response.status === 200) {
            toast.success(response.message);
            // You can handle further actions here, such as updating the cart state
            const uuids = response.data.uuid;

            navigate(`/orderplaced/${uuids}`);
          }
        })
        .catch((error) => {
          // Handle network errors or other errors
          toast.error(error.response.data.message);
          console.error("Error:", error);
        });
    }
  };
  const handledelete = (ids) => {
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    console.log(ids, "idddd");
    axios
      .delete(`http://localhost:3300/cart/removeAllCart?product_id=${ids}`, {
        headers: customHeaders,
      })

      .then((cartResponse) => {
        if (cartResponse.status === 200) {
          // Both product and cart deletion were successful
          toast.success(cartResponse.message);
          getListCarts();
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error("Error:", error);
      });
  };

  const handleSaveProduct = () => {
    
    if (
      
      !modalData.address ||
      !modalData.state ||
      !modalData.city ||
      !modalData.zip_code ||
      !modalData.country
    ) {

      setErrors({
      
        address: !modalData.address ? "this is required field" : "",
        state: !modalData.state ? "this is required field" : "",
        city: !modalData.city ? "this is required field" : "",
        zip_code: !modalData.zip_code ? "this is required field" : "",
        country: !modalData.country ? "this is required field" : "",
      });
      return;
    }

    else if (
     
      !/^[A-Za-z]+$/.test(modalData.address) ||
      !/^[A-Za-z]+$/.test(modalData.state) ||
      !/^[A-Za-z]+$/.test(modalData.city) ||
      !/^\d{6}$/.test(modalData.zip_code) ||
      !/^[A-Za-z]+$/.test(modalData.country)
    ) {
      setErrors({
       
        address: !/^[^\d]*$/.test(modalData.address)
          ? "address should only contain desired letters"
          : "",
        state: !/^[^\d]*$/.test(
          modalData.state
        )
          ? "Please fill the correct state"
          : "",
        city: !/^[^\d]*$/.test(modalData.city)
          ? "Please fill desired name"
          : "",
        zip_code: !/^\d{6}$/.test(
          modalData.zip_code
        )
          ? "Please fill  the correct zipcode"
          : "",
          country: !/^[^\d]*$/.test(
            modalData.country
          )
            ? "Please fill  the correct name"
            : "",
      });
      return;
    }
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`,
      "Content-Type": "application/json",
    };

    axios
      .post("http://localhost:3300/user/addAddress", modalData, {
        headers: customHeaders,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.message);

          setModalData({
            
            address: "",
            state: "",
            city: "",
            zip_code: "",
            country: "",
          });
          closeModal();
          productGet();
        }
      })

      .catch((error) => {
        toast.error(error.response.data.message);
        console.error("Error:", error);
      });
  };
  useEffect(()=>{
    productGet();
  },[])
  const productGet = () => {
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    axios
      .get(`http://localhost:3300/user/getAddress`, {
        headers: customHeaders,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.message);
          SetAddress(response.data.address);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error("Error fetching products:", error);
      });
  };
  
  useEffect(() => {
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    axios
      .get("http://localhost:3300/user/getuser", {
        headers: customHeaders,
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data.profile);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error("Error fetching products:", error);
      });
  }, []);
  const handleLogin = () => {
    // Perform login logic here
    navigate("/login");
  };
  const handleLogout = () => {
    // Perform logout logic here

    setIsLoggedIn(false); // Set to false when the user logs out
    localStorage.removeItem("JWTtoken");
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // reset the errors when we type
    setModalData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handlezipchange = (zip_code) => {
    const zip = parseInt(zip_code);
    setErrors((prevErrors) => ({ ...prevErrors, zip_code: "" }));
    setModalData((prevData) => ({ ...prevData, zip_code: zip }));
  };
  const handleedit=(addresss)=>
  {
    setIsModalOpen(true)
    setModalData(addresss)
    // const jwtToken = localStorage.getItem("JWTtoken");
    // const customHeaders = {
    //   authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
    //   "Content-Type": "application/json", // Specify the content type if needed
    // };
    // axios
    //   .put("http://localhost:3300/user/updateAddress",modalData, {
    //     headers: customHeaders,
    //   })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       setUser(response.data.profile);
    //     }
    //   })
    //   .catch((error) => {
    //     toast.error(error.response.data.message);
    //     console.error("Error fetching products:", error);
    //   });
  }
   const Handledelete=(id)=>
   {
     const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    axios
      .delete(`http://localhost:3300/user/deleteAddress?address_id=${id}`, {
        headers: customHeaders,
      })
      .then((response) => {
        if (response.status === 200) {
          productGet();
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error("Error fetching products:", error);
      });
   }
  return (
    <div>
      <div>
        <nav className="navbars">
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
              className="bi bi-cart"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            {carts.length > 0 ? (
              <span>[{carts.length}]</span>
            ) : (
              <span>[{carts.length}]</span>
            )}
          </div>
          <div>
            {isLoggedIn && Object.keys(user).length > 0 ? (
              <div>
                {user ? (
                  // If a user exists, render the profile icon and logout button
                  <div className="profile-container">
                    <img
                      className="profileImage"
                      src={user.images} // Replace with the actual image URL property
                      alt="User Profile"
                    />
                    <div className="profile-dialog">
                      <ul>
                        <li onClick={() => navigate(`/update/${user.user_id}`)}>
                          {" "}
                          Profile Update
                        </li>
                        <li onClick={() => navigate("/orderhistory")}>
                          Orders Details
                        </li>
                        <li onClick={handleLogout}> Logout</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  // If no user exists, render login and signup buttons
                  <div>
                    <button
                      className="user-actions"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </button>
                    <button
                      className="user-actions"
                      onClick={() => navigate("/signup")}
                    >
                      Signup
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <button
                  className="user-actions"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </button>
                <button className="user-actions" onClick={handleLogin}>
                  Login
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className="cart-items">
        {carts.length > 0 && (
          <button className="allitem" onClick={handledeleteall}>
            Clear items
          </button>
        )}
        {carts && carts.length > 0 ? (
          <div>
            {carts.map((cartss, index) => (
              <div className="carts" key={index}>
                <div>
                  <img
                    className="cart-item-images"
                    src={cartss.Product.imageUrl}
                    alt=""
                  />
                </div>
                <div className="cart-item-detailss">
                  {categories.map((categoryItems) => {
                    if (cartss.Product.c_id === categoryItems.cat_id) {
                      return (
                        <h5
                          className="cart-category_names"
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
                                onClick={() => handledelete(cartes.product_id)}
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
      {carts.length > 0 ? (
        <div>
          <span>TOTAL COST: {totalCost}</span>
          <button onClick={handleCheckout}>{buttonText}</button>
          {showPaymentOptions && (
            <div className="payment">
              <p>Shipping details:</p>
              {address && (address.length <= 4 || isModalOpen) ? (
                <div>
                  <button
                    className="product"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Create Shipping
                  </button>
                  <ul>
                    {address.length > 0 &&
                      address.map((addresss, index) => (
                        <li key={index}>
                          <label>
                            <input
                              type="radio"
                              name="shippingAddress"
                              value={addresss.id}
                              checked={selectedAddress === addresss.id} 
                              onChange={() => setSelectedAddress(addresss.id)} 
                            />
                            {`${addresss.address}, ${addresss.city}, ${addresss.zip_code},${addresss.state},${addresss.country}`}
                          </label>
                          <button onClick={() => {
                            handleedit(addresss)
                          }}>Edit</button>
                          <button onClick={() => {
                            Handledelete(addresss.id)
                          }}>Delete</button>
                        </li>
                      ))}
                  </ul>
                </div>
              ) : (
                <p>You have too many addresses to display here.</p>
              )}
              <p>Choose Payment Method:</p>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cashOnDelivery"
                />
                Cash on Delivery
              </label>
            </div>
          )}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    
    
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2 className="title">Shipping details</h2>
              <form>
                

                <div className="form-group">
                  <label htmlFor="c_id">Address:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={modalData.address}
                    onChange={handlechange}
                  />
                  <div className="validation">{errors.address}</div>
                </div>
                <div className="form-group">
                  <label htmlFor="c_id">state:</label>
                  <input
                    type="text"
                    id="state"
                    className="form-control"
                    name="state"
                    value={modalData.state}
                    onChange={handlechange}
                  />
                  <div className="validation">{errors.address}</div>
                </div>

                <br />
                <div className="form-group">
                  <label htmlFor="c_id">city:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={modalData.city}
                    onChange={handlechange}
                  />
                  <div className="validation">{errors.city}</div>
                </div>

                <br />
                <div className="form-group">
                  <label htmlFor="c_id">zipCode:</label>
                  <input
                    type="number"
                    id="state"
                    className="form-control"
                    name="zipCode"
                    value={modalData.zip_code}
                    onChange={(e) => handlezipchange(e.target.value)}
                  />
                  <div className="validation">{errors.zip_code}</div>
                </div>

                <br />
                <div className="form-group">
                  <label htmlFor="c_id">Country:</label>
                  <input
                    type="text"
                    id="state"
                    className="form-control"
                    name="country"
                    value={modalData.country}
                    onChange={handlechange}
                  />
                  <div className="validation">{errors.country}</div>
                </div>

                <br />
              </form>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                <button className="btn btn-primary" onClick={handleSaveProduct}>
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Checkout;
