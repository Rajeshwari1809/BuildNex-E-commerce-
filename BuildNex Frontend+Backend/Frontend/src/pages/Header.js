import { Link } from "react-router-dom";
import RoleNav from "./RoleNav";
import logo from "../images/e_logo.gif";

const Header = () => {
  return (
    <div className=".navbar-with-background">
      <nav class="navbar  navbar-expand-lg custom-bg text-color">
        <div class="container-fluid text-color header-container">
          <img
            src={logo}
            width="35"
            height="35"
            class="d-inline-block align-top"
            alt=""
          />
          &nbsp;&nbsp;&nbsp;
         
          <Link to="/" class="navbar-brand">
            <i>
              <b className="textc">BuildNex</b>
            </i>
          </Link>
          
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link to="/about" class="nav-link active" aria-current="page">
                  <b className="textc">About Us</b>
                </Link>
              </li>

              <li class="nav-item">
                <Link to="/contact" class="nav-link active" aria-current="page">
                  <b className="textc">Contact Us</b>
                </Link>
              </li>
            </ul>

            <RoleNav />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
