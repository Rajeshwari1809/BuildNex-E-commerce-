import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeliveryPersonHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-delivery"));
  console.log(user);

  const userLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-delivery");
    navigate("/");
    window.location.reload(true);
  };

  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5 text-color">
      <table><tr>
        <th>
        <div className="textc"> Hi Delivery Person : {user.firstName} <br></br> <strong>Guiding deliveries to success</strong><br></br> <strong>Ready ,set, delivered</strong></div>
        </th><th>
    
        </th>
        </tr></table>

      <li class="nav-item">
       
        <Link
          to="/user/delivery/myorders"
          class="nav-link active"
          aria-current="page"
        >
          <br></br>
          
          <b className="button1">My_Deliveries</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to="/user/admin/searchOrder"
          class="nav-link active"
          aria-current="page"
        ><br></br>
          <b className="button1">Update_Order</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={userLogout}
        ><br></br>
          <b className="button1">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default DeliveryPersonHeader;
