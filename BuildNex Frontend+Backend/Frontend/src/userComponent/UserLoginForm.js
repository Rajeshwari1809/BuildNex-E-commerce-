import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const UserLoginForm = () => {
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const spanStyle = {
    color: "red",
    fontWeight: "bold",
  };

  //const [loginError, setLoginError] = useState(null);

  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };
        
 
  
  const loginAction = (e) => {
    e.preventDefault();
     
    // Perform validation
    if (!loginRequest.emailId || !loginRequest.password || !loginRequest.role) {
      toast.error("Please fill in all required fields before logging in .....", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return; // Exit the function if validation fails
    }

    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    })
      .then((result) => result.json())

      
      .then((res) => {
        if (res.role === "Admin") {
          sessionStorage.setItem("active-admin", JSON.stringify(res));
        } else if (res.role === "Customer") {
          sessionStorage.setItem("active-user", JSON.stringify(res));
        } else if (res.role === "Delivery") {
          sessionStorage.setItem("active-delivery", JSON.stringify(res));
        }

        toast.success("Logged in successfully! Redirecting...", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        

        navigate("/home");
        window.location.reload(true);
      
      })
      .catch((error) => {
        document.getElementById("ss2").innerHTML =
          "Invalid credentials. Please check your Email.";
        document.getElementById("ss1").innerHTML =
          "Invalid credentials. Please check your password.";
        console.error("Login error:", error);
      });
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color text-center custom-bg-text">
            <h4 className="card-title">User Login</h4>
          </div>
          <div className="card-body">
            <form>
              {/* <div>
                {loginError && (
                  <div className="alert alert-danger" role="alert">
                    {loginError}
                  </div>
                )}
              </div> */}
              <div className="mb-3 text-color">
                <label htmlFor="role" className="form-label">
                  <b>User Role</b>
                  <span style={spanStyle}>*</span>
                </label>
                <select
                  onChange={handleUserInput}
                  className="form-control"
                  name="role"
                >
                  <option value="0" style={{ fontFamily: 'Verdana', fontWeight: 'bold' }}>----Select Role----</option>
                  <option value="Admin"> Admin </option>
                  <option value="Customer"> Customer </option>
                  <option value="Delivery"> Delivery Person </option>
                </select>
              </div>

              <div className="mb-3 text-color">
                <label htmlFor="emailId" className="form-label">
                  <b>Email Id</b>
                </label>
                <span> </span>
                <span style={spanStyle}>*</span>
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  onChange={handleUserInput}
                  value={loginRequest.emailId}
                  placeholder="Enter valid Email"
                />
                <span id="ss2" style={spanStyle}></span>
              </div>
              <div className="mb-3 text-color">
                <label htmlFor="password" className="form-label">
                  <b>Password</b>
                </label>
                <span> </span>
                <span style={spanStyle}>*</span>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleUserInput}
                  value={loginRequest.password}
                  placeholder="Enter password (8 to 14 characters)"
                  autoComplete="on"
                />

                <span id="ss1" style={spanStyle}></span>
              </div>
              <button
                type="submit"
                className="btn btn-info"
                onClick={loginAction}
              >
                Login
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/user/forgotpassword">Forgot Password</Link>

     
               <br></br>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="signup-link">

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Don't have an account?
        <Link to="/user/register">
        <a className="signup-link link"> Sign up now</a>
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

export default UserLoginForm;
