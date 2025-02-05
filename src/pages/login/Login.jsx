import { useState } from "react";
import "./login.scss";
import axios from "axios";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://x4wlipaom3.execute-api.eu-west-1.amazonaws.com/Prod/login",
        {
          email,
          password,
        }
      );
      console.log(res.data);
      console.log(email + password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="left">
          <img
            src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png"
            alt=""
          />
        </div>
        <div className="right">
          <form onSubmit={handleLogin}>
            <h2>Member Login</h2>
            <input
              type="email"
              name=""
              id=""
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <button type="submit">login</button>
          </form>
          <Link to="/register">
            <div className="register_redirect">
              <span>Create your account</span> <ArrowRightAltIcon />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
