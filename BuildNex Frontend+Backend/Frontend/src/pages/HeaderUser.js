import React from "react"; // Make sure to import React if not already imported
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderUser = () => {
  let navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-user"));

  const userLogout = () => {
    toast.success("Logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-customer");
    sessionStorage.removeItem("active-user");
    navigate("/");
    window.location.reload(true);
  };

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li className="nav-item">
        <Link to="/user/mycart" className="nav-link active" aria-current="page">
          {/* Place any content here if needed */}
        </Link>
      </li>
       
      {user && (
        <table >
        <li className="nav-item">
          <b className="textc">Welcome : {user.firstName}</b>
          <div className="textc"><strong>Ready to shop You're all set!</strong></div>
        </li>
        </table>
      )}

      {user && (
        <li className="nav-item">
          <Link to="/user/mycart" className="nav-link active" aria-current="page">
            <button className="button1">
              <b className="text-color">My Cart</b>
            </button>
          </Link>
        </li>
      )}

      <li className="nav-item">
        <Link to="/user/myorder" className="nav-link active" aria-current="page">
          <button className="button1">
            <b className="text-color">My Order</b>
          </button>
        </Link>
      </li>

      {user && (
         <li className="nav-item">
         <Link to="/user/myorder" className="nav-link active" aria-current="page">
           <button className="btn btn-outline-secondary" onClick={userLogout}>
             <b className="textc">Logout</b>
           </button>
         </Link>
       </li>
 
      )}
      <ToastContainer />
    </ul>
  );
};

export default HeaderUser;
