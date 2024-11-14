import { Link } from "react-router-dom";

const NormalHeader = () => {
  return (
    <div className=".navbar-with-background">
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li class="nav-item">
        <Link to="/user/register" class="nav-link active" aria-current="page">
          {/* <b className="text-color"></b> */}
          <button className="button1"><strong>Register</strong> </button>
        </Link>
      </li>

      <li class="nav-item">
        <Link to="/user/login" class="nav-link active" aria-current="page">
          {/* <b className="text-color"></b> */}
          <button className="button1"><strong>Login</strong> </button>
        </Link>
      </li>
    </ul>
    </div>
  );
};

export default NormalHeader;
