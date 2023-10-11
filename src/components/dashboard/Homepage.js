import React from "react";
import "./file.css";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import ecomm from "../assets/ecomm.png";
import spice from "../assets/spice.jpeg";

const Homepage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [cartlist, setCartList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [alldata, setAllData] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [modalData, setModalData] = useState({
    category: "",
    product_name: "",
    description: "",
    price: "",
  });
  // State to track whether to show quantity controls
  const [errors, setErrors] = useState({
    category: "",
    product_name: "",
    description: "",
    price: "",
  });
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
    localStorage.removeItem("JWTtoken");
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
      .get("http://localhost:3300/user/getuser", {
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

  const handleSaveProduct = (event) => {
    event.preventDefault();

    if (!modalData.product_name || !modalData.description || !modalData.price) {
      // Set error messages for empty fields
      setErrors({
        category: !modalData.category ? "this is required field" : "",
        product_name: !modalData.product_name ? "this is required field" : "",
        description: !modalData.description ? "this is required field" : "",
        price: !modalData.price ? "this is required field" : "",
      });
      return; // Prevent form submission
    }
    // Validate required fields
    else {
      toast.success("submit the data succesfully");
    }
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
          productGet()
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
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // reset the errors when we type
    setModalData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handlepricechange = (price) => {
    const cost = parseInt(price);
    setErrors((prevErrors) => ({ ...prevErrors, price: "" }));
    setModalData((prevData) => ({ ...prevData, price: cost }));
  };
  useEffect(() => {
    productGet(); // update all the carts data
  }, []);


   const productGet=() => {
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    axios
      .get("http://localhost:3300/product/getAll", {
        headers: customHeaders,
      })
      .then((response) => {
        if (response.status === 200) {
          setAllData(response.data.data);
        } else {
          toast.error("user not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };
  // navigate to the cart interface
  const handleBuyNow = (product) => {
    navigate(`/cart/${product.product_id}/${product.c_id}`);
  };
  // call the function for filtering the data according to category and price
  const filter = (catIds, selectedOption) => {
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };

    axios
      .get(
        `http://localhost:3300/product/category_product?c_id=${catIds}&price=${selectedOption}`,
        {
          headers: customHeaders,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("filter the data");

          setFilteredData(response.data.data);
        } else {
          toast.error("user not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };
  // function for sorting the price
  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortByPrice(selectedOption);

    filter(selectedCategory, selectedOption); // Pass both selectedCategory and selectedOption
  };

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;

    setSelectedCategory(selectedValue);

    filter(selectedValue, sortByPrice); // Pass both selectedValue and sortByPrice
  };
  // function for searching
  const handleSearch = () => {
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    if (selectedCategory || (selectedCategory && sortByPrice)) {
      axios
        .get(
          `http://localhost:3300/product/category_product?c_id=${selectedCategory}&price=${sortByPrice}&Name=${searchQuery}`,
          {
            headers: customHeaders,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            toast.success("filterss the data");

            setFilteredData(response.data.data);
          } else {
            toast.error("user not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    } else {
      axios
        .get(`http://localhost:3300/product/getAll?Name=${searchQuery}`, {
          headers: customHeaders,
        })
        .then((response) => {
          if (response.status === 200) {
            setAllData(response.data.data);
          } else {
            toast.error("user not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    handleSearch(); // Calls the search function when the form is submitted
  };

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
            {isLoggedIn &&
              product.length > 0 && ( // Check if cartlist is not empty
                <div>
                  <svg
                    onClick={() => navigate(`/checkout`)}
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
                </div>
              )}
          </div>

          {isLoggedIn && Object.keys(user).length > 0 ? (
            <div>
              {user ? (
                // If a user exists, render the profile icon and logout button
                <div className="profile-container">
                  <input
                    className="profileImage"
                    type="text"
                    value={`${user.firstName
                      .charAt(0)
                      .toUpperCase()} ${user.lastName.charAt(0).toUpperCase()}`}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <p>{inputValue}</p>
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
        </nav>

        <Container
          fluid
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <Row>
            <Col xs={6}>
              <div className="button">
                <Button
                  className="product"
                  onClick={() => setIsModalOpen(true)}
                >
                  Create product
                </Button>
              </div>
            </Col>

            <Col xs={6}>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search..."
                />
                <button type="submit">Search</button>
              </form>
            </Col>
            <Col md={2}>
              <h3>Category</h3>
              <form>
                {category && category.length > 0 ? (
                  category.map((categories, index) => {
                    if (categories.c_id === null) {
                      return (
                        <div key={categories.cat_id}>
                          <input
                            type="radio"
                            id={`category_${categories.cat_id}`}
                            name="category" // Use the same name for all radio buttons in the group
                            value={categories.cat_id}
                            onChange={(event) => handleCategoryChange(event)}
                          />
                          <label htmlFor={`category_${categories.cat_id}`}>
                            {categories.Name}
                          </label>
                        </div>
                      );
                    }
                    return null;
                  })
                ) : (
                  <p>No categories available.</p>
                )}
              </form>
              <Form>
                <h1>Price</h1>
                <Form.Control as="select" onChange={handleSortChange}>
                  <option value="Select">Sorted by price</option>
                  <option value="DESC">High to Low</option>
                  <option value="ASC">Low to High</option>
                </Form.Control>
              </Form>
            </Col>
            <Col md={8}>
              <div>
                {selectedCategory ||
                (selectedCategory && searchQuery) ||
                (selectedCategory && sortByPrice)
                  ? filteredData.map((item, index) => {
                      // Find the corresponding category for the product
                      const productCategory = category.find(
                        (categoryItem) => item.c_id === categoryItem.cat_id
                      );

                      return (
                        <div className="card" key={index}>
                          <img src={spice} className="img" alt="" />
                          <div className="card-body">
                            <h5 className="card-title">
                              Category: {productCategory.Name}
                            </h5>
                            <h5 className="card-title">
                              Product Name: {item.product_name}
                            </h5>
                            <p className="card-title">
                              Description: {item.description}
                            </p>
                            <p className="card-title">Price: {item.price}</p>
                          </div>
                          <button onClick={() => handleBuyNow(item)}>
                            Buy now
                          </button>
                        </div>
                      );
                    })
                  : alldata.map((datas) => (
                      <div key={datas.Name}>
                        <h1>{datas.Name}</h1>
                        <div>
                          {datas.Products.map((product, index) => {
                            // Find the corresponding category for the product
                            const productCategory = category.find(
                              (categoryItem) =>
                                product.c_id === categoryItem.cat_id
                            );

                            return (
                              <div className="card" key={index}>
                                <img src={spice} className="img" alt="" />
                                <div className="card-body">
                                  <h5 className="card-title">
                                    Category: {productCategory.Name}
                                  </h5>
                                  <h5 className="card-title">
                                    Product Name: {product.product_name}
                                  </h5>
                                  <p className="card-title">
                                    Description: {product.description}
                                  </p>
                                  <p className="card-title">
                                    Price: {product.price}
                                  </p>
                                </div>
                                <button onClick={() => handleBuyNow(product)}>
                                  Buy now
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
              </div>
            </Col>
          </Row>
          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2 className="title">Create Product</h2>
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
                        <option>no categories available</option>
                      )}
                    </select>
                    <div className="validation">{errors.category}</div>
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
                    <div className="validation">{errors.product_name}</div>
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
                    <div className="validation">{errors.description}</div>
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
                    <div className="validation">{errors.price}</div>
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
        </Container>

        <footer>
          <div className="footer-content">
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
    </div>
  );
};

export default Homepage;
