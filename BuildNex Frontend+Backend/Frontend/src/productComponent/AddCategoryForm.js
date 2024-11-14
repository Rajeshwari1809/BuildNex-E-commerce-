import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
//import "./AddCategoryForm.css"; // Import your custom CSS file

const AddCategoryForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const saveCategory = () => {
    if (title.trim() === "" || description.trim() === "") {
      toast.error("Please fill Category & Discription.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    let data = { title, description };

    fetch("http://localhost:8080/api/category/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        toast.success("Category Added Successfully!!!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        result.json().then((res) => {
          console.log("response", res);
        });
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        console.error("Error adding category:", error);
        toast.error("An error occurred. Please try again later.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="add-category-form-container">
      <div className="mt-2 d-flex align-items-center justify-content-center">
        <div className="card form-card border-color custom-bg" style={{ width: "25rem" }}>
          <div className="card-header bg-color text-center custom-bg-text">
            <h5 className="card-title">Add Category</h5>
          </div>
          <div className="card-body text-color">
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  <b>Category Title</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter title..."
                  required
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  <b>Category Description</b>
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  placeholder="Enter description..."
                  required
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                />
              </div>

              <button
                type="button"
                onClick={saveCategory}
                className="btn bg-color custom-bg-text"
              >
                Add Category
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryForm;
