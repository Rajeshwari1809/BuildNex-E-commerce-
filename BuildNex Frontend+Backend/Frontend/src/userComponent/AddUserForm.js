import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify"
import { Link } from "react-router-dom";
const AddUserForm = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phoneNo: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
  });
  

  const spanStyle = {
    color: "red",
    fontWeight: "bold",
  };

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    return password.length >= 8 && password.length <= 14;
  };

  const validateMobileNumber = (phoneNo) => {
    return /^[0-9]{10}$/.test(phoneNo);
  };

  const validatePincode = (pincode) => {
    return /^[0-9]{6}$/.test(pincode);
  };


  const saveUser = (event) => {
    event.preventDefault();
    if (!user.firstName || !user.lastName || !user.password || !user.emailId || !user.phoneNo || !user.street || !user.role || !user.city || !user.pincode) {
      toast.error("Please fill in all required fields before registering.....", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
     // Exit the function if validation fails
    return;
    }
    if (!validatePassword(user.password)) {
        
      toast.error("Password should be between 8 to 14 characters.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      toast.error("Please Try Again !!!!!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      return;
    }

    if (!validateMobileNumber(user.phoneNo)) {
      toast.error("Mobile number should be 10 digits.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      toast.error("Please Try Again !!!!!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!validatePincode(user.pincode)) {
      toast.error("Pincode should be 6 digits.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      toast.error("Please Try Again !!!!!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    
   


    event.preventDefault();
    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((result) => {


      console.log("******near toast thing");
      toast.success("Registered Successfully!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.warn("result", result);
      result
        .json()
        .then((res) => {
          console.log("response", res);

        })
        .catch((error) => {
          
          console.log("******", error);
          console.log(error);
        });
    })
    
    var resetFormFields = () => {
  setUser({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phoneNo: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
  });
};resetFormFields();

  };

  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          class="card form-card border-color text-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 class="card-title">Registration Form</h5>
          </div>
          <div class="card-body">
            <form onSubmit={saveUser}>
              <div class="mb-3 text-color">
                <label for="role" class="form-label">
                  <b>User Role</b>
                  <span style={spanStyle}> *</span>
                </label>
                <select
                  onChange={handleUserInput}
                  className="form-control"
                 
                  name="role"
                >
                  <option value="0" style={{ fontFamily: 'Verdana', fontWeight: 'bold' }}>----Select Role----</option>
                  {/* <option value="Admin"> Admin </option> */}
                  <option value="Customer"> Customer </option>
                  <option value="Delivery"> Delivery Person </option>
                </select>
              </div>

              <div class="mb-3 text-color">
                <label for="title" class="form-label">
                  <b> First Name</b>
                  <span style={spanStyle}> *</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="firstName"
                  name="firstName"
                  onChange={handleUserInput}
                  value={user.firstName}
                  placeholder="Enter first name"
                />
              </div>
              <div class="mb-3 text-color">
                <label for="description" class="form-label">
                  <b>Last Name</b>
                  <span style={spanStyle}> *</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="lastName"
                  name="lastName"
                  
                  onChange={handleUserInput}
                  value={user.lastName}
                  placeholder="Enter last name"
                />
              </div>

              <div className="mb-3 text-color">
                <b>
                  <label className="form-label">Email Id</label>
                  <span style={spanStyle}> *</span>
                </b>
                <input
                  type="email"
                  class="form-control"
                  id="emailId"
                  name="emailId"
                 
                  onChange={handleUserInput}
                  value={user.emailId}
                  placeholder="Enter Unique Email"
                />
              </div>

              <div class="mb-3 mt-1">
                <label for="quantity" class="form-label">
                  <b>Password</b>
                  <span style={spanStyle}> *</span>
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                 
                  onChange={handleUserInput}
                  value={user.password}
                  placeholder="Enter password (8 to 14 characters)"
                />
              </div>

              <div class="mb-3">
                <label for="price" class="form-label">
                  <b>Mobile No</b>
                  <span style={spanStyle}> *</span>
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="phoneNo"
                  name="phoneNo"
                  
                  onChange={handleUserInput}
                  value={user.phoneNo}
                  placeholder="Enter mobile number (10 digits)"
                  pattern="[0-9]{10}"
                />
              </div>

              <div class="mb-3">
                <label for="description" class="form-label">
                  <b> Street</b>
                  <span style={spanStyle}> *</span>
                </label>
                <textarea
                  class="form-control"
                  id="street"
                  name="street"
                  rows="3"
                  
                  onChange={handleUserInput}
                  value={user.street}
                  placeholder="Enter Your Permanent address"
                />
              </div>

              <div class="mb-3">
                <label for="price" class="form-label">
                  <b>City</b>
                  <span style={spanStyle}> *</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="city"
                  name="city"
                 
                  onChange={handleUserInput}
                  value={user.city}
                  placeholder="Enter city"
                />
              </div>

              <div class="mb-3">
                <label for="pincode" class="form-label">
                  <b>Pincode</b>
                  <span style={spanStyle}> *</span>
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="pincode"
                  name="pincode"
                  
                  onChange={handleUserInput}
                  value={user.pincode}
                  placeholder="Enter pincode (6 digits)"
                  pattern="[0-9]{6}"
                />
              </div>

              <input
                type="submit"
                class="btn btn-info"
                value="Register User"
               
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               

               <div class="signup-link"><br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Already? have an account?
        <Link to="/user/login">
        <a href="#" class="signup-link link"> Sign In now</a>
        </Link>
      </div>
               
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
