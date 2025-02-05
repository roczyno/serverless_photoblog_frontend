import { Link } from "react-router";
import "./navbar.scss";

const Navbar = () => {
  const user = true;
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" className="link">
          <div className="logo">PhotoHub</div>
        </Link>
      </div>
      <div className="center">
        {user && (
          <>
            <span>Upload Images</span>
            <span>All Images</span>
            <span>My Images</span>
            <span>Bin</span>
          </>
        )}
      </div>
      <div className="right">
        <div className="auth">
          {!user ? (
            <>
              <Link className="link" to="/login">
                <span className="login_btn">Login</span>
              </Link>
              <Link className="link" to="/register">
                <span>Register</span>
              </Link>
            </>
          ) : (
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
