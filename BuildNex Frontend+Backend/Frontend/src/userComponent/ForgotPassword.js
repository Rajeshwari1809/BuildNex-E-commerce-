import React from "react"
import { Link, useNavigate } from "react-router-dom";
const ForgotPassword  = () => {
          
    return (      
          <div className="mt-2 d-flex aligns-items-center justify-content-center ">
<div className="form1-container">
      <div className="logo-container">
        Forgot Password
      </div>

      <form className="form1">
        <div className="form1-group">
          <label for="email">Email</label>
          <input type="text" id="email" name="email" placeholder="Enter your email" required=""/>
        </div>

        <button className="form1-submit-btn" type="submit">Send Email</button>
      </form> 
     
    </div>
    </div>

    );
}
export default ForgotPassword;