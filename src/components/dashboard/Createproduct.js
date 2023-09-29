import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Createproduct = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [category, setCategory] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalData, setModalData] = useState({
    category: "",
    product_name: "",
    description: "",
    price: "",
  });
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
         navigate("/")
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

  useEffect(() => {
    setIsLoggedIn(true)
    setIsModalOpen(true)
  }, []);
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
  const handlechange = (e) => {
    const { name, value } = e.target;
    setModalData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handlepricechange = (price) => {
    const cost = parseInt(price);
    setModalData((prevData) => ({ ...prevData, price: cost }));
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
    {isLoggedIn && isModalOpen && (
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
  )
}

export default Createproduct