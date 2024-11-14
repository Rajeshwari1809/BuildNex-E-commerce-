import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const GetAllCategories = () => {
  const [categories, setCategories] = useState([]);

  const retrieveAllCategories = async () => {
    const response = await axios.get("http://localhost:8080/api/category/all");
    return response.data;
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const allCategories = await retrieveAllCategories();
      if (allCategories) {
        setCategories(allCategories);
      }
    };

    getAllCategories();
  }, []);

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle bg-color custom-bg-text"
        type="button"
        id="categoryDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <strong>All Categories</strong>
        
      </button>
      <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
        <li>
          <Link
            to="/home/all/product/categories"
            className="dropdown-item"
          >
            <b>All Product </b>
          </Link>
        </li>
        {categories.map((category) => {
          return (
            <li key={category.id} style={{ fontFamily: 'Verdana', fontWeight: 'bold' }}>
              <Link
                to={`/home/product/category/${category.id}/${category.title}`}
                className="dropdown-item"
              >
                {category.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GetAllCategories;
