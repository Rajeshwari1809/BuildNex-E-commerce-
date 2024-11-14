// import Carousel from "./Carousel";
// import GetAllCategories from "../productComponent/GetAllCategories";
// import ProductCard from "../productComponent/AdminProductCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import { Routes, Route } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";



 
const DeleteProductPage = () => {
 
 // const user = JSON.parse(sessionStorage.getItem("active-admin"));
  // const [totatPrice, setTotalPrice] = useState("");
  const [myProductData, setMyProductData] = useState([]);
 // const navigate = useNavigate();
  useEffect(() => {
    const getMyProduct = async () => {
      const myProduct = await retrieveAllProducts();
      if (myProduct) {
        console.log("myProduct data is present :)");
        console.log(myProduct.title);
        //console.log(myProduct.product.category.id);
        // setTotalPrice(myProduct.price);
        setMyProductData(myProduct);
      }
    };
    getMyProduct();
  }, []);
  sessionStorage.removeItem("active-admin");
  const [myProduct, setProducts] = useState([]);

  const { categoryId } = useParams();

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await retrieveAllProducts();
      if (allProducts) {
        setProducts(allProducts);
      }
    };

    const getProductsByCategory = async () => {
      const allProducts = await retrieveProductsByCategory();
      if (allProducts) {
        setProducts(allProducts);
      }
    };

    if (categoryId == null) {
      console.log("Category Id is null");
      getAllProducts();
    } else {
      console.log("Category Id is NOT null");
      getProductsByCategory();
    }
  }, [categoryId]);

  const retrieveAllProducts = async () => {
    const response = await axios.get("http://localhost:8080/api/product/all");

    return response.data;
  };

  const retrieveProductsByCategory = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/product/category?categoryId=" + categoryId
    );
    
    return response.data;
  };

 
  const deleteProduct = async (id) => {
    
    try {
      const response = await axios.delete(
        "http://localhost:8080/api/product/delete/" + id
      );
      console.log(response);
  
      // Update product data after deletion
      const updatedProductData = myProductData.filter((product) => product.id !== id);
      setMyProductData(updatedProductData);
      
      toast.success("Product deleted successfully!", {
        position: "top-center",
        autoClose: 2000,
    
      });
    
    } catch (error) {
      console.error("Error deleting product:", error);
    }
 
  };
  

  return (
    <div className="mt-3">
     <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color"
        style={{
          height: "45rem",
        }}
      >
        <div className="card-header text-center bg-color custom-bg-text">
          <h2>Product List</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover custom-bg-text text-center">
              <thead className="bg-color table-bordered border-color">
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="text-color">
                {myProductData.map((productData) => {
                  console.log(productData); // log each productData object
                  return (
                    <tr>
                      <td>
                        <img
                          src={
                            "http://localhost:8080/api/product/" +
                            productData.imageName
                          }
                          class="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <b>{productData.title}</b>
                      </td>
                      <td>
                        <b>{productData.description}</b>
                      </td>
                      <td>
                        <b>{productData.quantity}</b>
                      </td>
                      <td>
                    
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => deleteProduct(productData.id)}
                        >
                          Remove product
                        </button>
                       
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
           
            <ToastContainer />
          </div>
        </div>
        <div className="card-footer custom-bg">
          <div className="float-right"></div>
        </div>
      </div>
    </div>
  );
};
export default DeleteProductPage;
