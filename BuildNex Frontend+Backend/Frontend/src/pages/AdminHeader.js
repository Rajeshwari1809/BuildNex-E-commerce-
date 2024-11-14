import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const AdminHeader = () => {
 const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("active-admin")));

  const adminLogout = () => {
    toast.success("Logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });


    sessionStorage.removeItem("active-admin");
    setUser(null);

    navigate("/");
    window.location.reload(true);
    
  };

  return (
    <table> 
       <tr>
        
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      {user && (
        <li className="nav-item">
          <span className="nav-link active">
            <b className="textc"> Hi : {user.firstName}</b>
          </span>
        </li>
      )}

      {user && (
        <DropdownButton id="admin-dropdown"  title="Admin Options" >
          <Dropdown.Item as={Link} to="/addcategory" className="bgr-color">
            <strong >
            Add Category
            </strong>
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/addproduct" className="bgr-color">
            <strong>
            Add Product
            </strong>
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/user/admin/allorder" className="bgr-color">
            <strong>
            All Orders
            </strong>
          </Dropdown.Item>
          
          <Dropdown.Item as={Link} to="/deleteproduct" className="bgr-color">
            <strong>
            Delete Product
            </strong>
          </Dropdown.Item>
          
          <Dropdown.Item as={Link} to="/deleteUser" className="bgr-color">
            <strong>
            Delete User
            </strong>
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/user/admin/assigndelivery" className="bgr-color">
            <strong>
            Assign Order Delivery
            </strong>
          </Dropdown.Item>
        </DropdownButton >
      )}

      {user ? (
        <Link to="/home">
          <li className="nav-item">
          <button class="button" onClick={adminLogout}>

  
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
</svg>


<div className="text">
  <strong className="textc">Logout</strong>

</div>

</button>
          </li>
        </Link>
      ) : null}
    
      <ToastContainer />
    </ul>
    </tr>      
        </table>
  );
};

export default AdminHeader;
