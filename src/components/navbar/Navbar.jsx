import { Link, useNavigate } from "react-router";
import "./navbar.scss";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const user = userData ? userData.user : null;
  const navigate = useNavigate;

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
    window.location.reload();
  };
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
            <Link className="link" to="/upload">
              <span>Upload Images</span>
            </Link>
            <Link className="link" to="/all">
              <span>All Images</span>
            </Link>
            <Link className="link" to="/my">
              <span>My Images</span>
            </Link>
            <Link className="link" to="/bin">
              <span>Bin</span>
            </Link>
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
            <div className="profile">
              <LogoutIcon onClick={handleLogout} />
              <img
                className="dp"
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
