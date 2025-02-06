import { useState } from "react";
import "./login.scss";
import axios from "axios";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      console.log(res.data);
      localStorage.setItem("userData", JSON.stringify(res.data));
      if (res.data) {
        navigate("/all");

        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="left">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
