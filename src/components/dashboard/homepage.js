import React from "react";
import "./file.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import ecomm from "../assets/ecomm.png";
import spice from "../assets/spice.jpeg";


const Homepage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [cartlist , setCartList]= useState([])

   


  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [modalData, setModalData] = useState({
    category: "",
    product_name: "",
    description: "",
    price: "",
  });
  // State to track whether to show quantity controls
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize with false for not logged in

  

  // Function to handle login. This would typically set isLoggedIn to true.
  const handleLogin = () => {
    // Perform login logic here
    navigate("/login");
  };
  

  // Function to handle logout. This would typically set isLoggedIn to false.
  const handleLogout = () => {
    // Perform logout logic here

    setIsLoggedIn(false); // Set to false when the user logs out
    localStorage.removeItem("JWTtoken")
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3300/category/getAll")
      .then((response) => {
        if (response.status === 200) {
          setCategory(response.data.data);
         
        } else {
          toast.error("Category not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3300/product/getAll")
      .then((response) => {
        if (response.status === 200) {
          setProduct(response.data.data);
          setIsLoggedIn(true);

        } else {
          toast.error("product not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  useEffect(() => {
    // const cartsDatas = JSON.parse(localStorage.getItem("cartsdata"));
    // setCartList(cartsDatas)
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    axios
      .get("http://localhost:3300/cart/getAll", {
        headers: customHeaders,
      }) // Replace with your actual category API endpoint
      .then((response) => {
        if (response.status === 200) {
          setCartList(response.data.data);
          setIsLoggedIn(true);
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

  
  useEffect(() => {
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    axios
      .get("http://localhost:3300/user/getuser",{
        headers: customHeaders,
      })
      .then((response) => {
        if (response.status === 200) {
          
          setUser(response.data.profile);
          setIsLoggedIn(true);
        } else {
          toast.error("user not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
console.log("userrrr",user)
  const handleSaveProduct = () => {
    const filteredCategories = category.find(
      (categories) => categories.Name === modalData.category
    );

    const catIds = filteredCategories.cat_id;

    if (catIds) {
      modalData.category = catIds;
    }
    const backEndProduct = {};
    backEndProduct.c_id = modalData.category;
    backEndProduct.product_name = modalData.product_name;
    backEndProduct.price = modalData.price;
    backEndProduct.description = modalData.description;
    axios
      .post("http://localhost:3300/product/add_product", backEndProduct)
      .then((response) => {
        if (response.status === 200) {
          toast.success("create product successfully");

          // Reset the form data to empty values
          setModalData({
            category: "",

            product_name: "",
            description: "",
            price: "",
          });
          closeModal();
        } else {
          // Handle other status codes if needed
          toast.error(" failed");
        }
      })
      .catch((error) => {
        // Handle network errors or other errors
        toast.error("failed");
        console.error("Error:", error);
      });
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setModalData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handlepricechange = (price) => {
    const cost = parseInt(price);
    setModalData((prevData) => ({ ...prevData, price: cost }));
  };
  const handleclick = () => {
    toast.error("please first login");
  };
  
  const handleBuyNow = (item) => {
  
    navigate(`/cart/${item.product_id}`);
  };
  
  
  return (
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
        
        {isLoggedIn && product.length > 0 && ( // Check if cartlist is not empty
        <>
          <svg
            onClick={() => navigate(`/checkout/${product[0].product_id}`)}
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="50"
            fill="currentColor"
            className="bi bi-cart"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          {cartlist && cartlist.length > 0 ? (
            <span>[{cartlist.length}]</span>
          ) : (
            <span>[0]</span>
          )}
        </>
      )}
      


        
      </div>
      <div>
  {isLoggedIn && Object.keys(user).length > 0 ? (
    <>
      <div>
        <input
          onClick={() => navigate(`/update/${user.user_id}`)}
          className="profileImage"
          type="text"
          value={`${user.firstName.charAt(0).toUpperCase()} ${user.lastName.charAt(0).toUpperCase()}`}
        />
      </div>
      <button className="user-actions" onClick={handleLogout}>
        Logout
      </button>
    </>
  ) : (
    <>
      <button className="user-actions" onClick={() => navigate("/signup")}>
        Signup
      </button>
      <button className="user-actions" onClick={handleLogin}>
        Login
      </button>
    </>
  )}
</div>

          
      </nav>
      {isLoggedIn ? (
        <div className="button">
          <button className="product" onClick={openModal}>
            Create product
          </button>
          {product && product.length > 0 ? (
            <div>
              {product.map((item, index) => (
                <div class="card" key={index}>
                  <img src={spice} class="img" alt="" />
                  <div class="card-body">
                    {category.map((categoryItem) => {
                      if (item.c_id === categoryItem.cat_id) {
                        return (
                          <h5 class="card-title" key={categoryItem.cat_id} >
                            Category: {categoryItem.Name}
                          </h5>
                        );
                      }
                      return null; // Return null for products without a matching category
                    })}
                    <h5 class="card-title">
                      Product Name: {item.product_name}
                    </h5>
                    <p class="card-title">Description: {item.description}</p>
                    <p class="card-title">Price: {item.price}</p>
                  </div>
                  <button onClick={() => handleBuyNow(item)}>
  Buy now
</button>
                </div>
              ))}
            </div>
          ) : (
            <p>No products available.</p>
          )}

          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h2>Create Product</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select
                      id="category"
                      className="form-control"
                      name="category"
                      value={modalData.category}
                      onChange={handlechange}
                    >
                      <option value="">Select a category</option>

                      {category && category.length > 0 ? (
                        category.map((categories, index) => {
                          if (categories.c_id === null) {
                            return (
                              <option
                                id="cat"
                                key={index}
                                value={categories.c_id}
                              >
                                {categories.Name}
                              </option>
                            );
                          }
                        })
                      ) : (
                        <option value="">no categories available</option>
                      )}
                    </select>
                  </div>
                  <br />

                  <div className="form-group">
                    <label htmlFor="product_name">product_name:</label>
                    <input
                      type="text"
                      id="product_name"
                      className="form-control"
                      name="product_name"
                      value={modalData.product_name}
                      onChange={handlechange}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="description">description:</label>
                    <input
                      type="text"
                      id="description"
                      className="form-control"
                      name="description"
                      value={modalData.description}
                      onChange={handlechange}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="c_id">price:</label>
                    <input
                      type="number"
                      id="price"
                      className="form-control"
                      name="price:"
                      value={modalData.price}
                      onChange={(e) => handlepricechange(e.target.value)}
                    />
                  </div>
                  <br />
                </form>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={closeModal}>
                    Close
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSaveProduct}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="button">
          <button className="product" onClick={handleclick}>
            Create product
          </button>
        </div>
      )}

      <footer>
        <div class="footer-content">
          <p>@copy; 2023 MATRIX MEDIA SOLUTION PVT. LTD.</p>
          <ul>
            <li>
              <a href="/">Privacy Policy</a>
            </li>
            <li>
              <a href="/">Terms of Service</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
