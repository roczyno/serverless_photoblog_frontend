import { useState } from "react";
import "./register.scss";
import axios from "axios";
import { Link } from "react-router";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/register`, {
        email,
        password,
        firstName,
        lastName,
      });

      console.log(res);
      if (res.data) {
        setMessage(true);
      }
    } catch (error) {
      setErrorMessage(error.response.data);
      setError(true);
    }
  };
  return (
    <div className="register">
      <div className="container">
        <div className="left">
          <img
            src="https://plus.unsplash.com/premium_photo-1667533288519-49d00a1620b2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="right">
          <form onSubmit={handleRegister}>
            <h2>Member Register</h2>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="firstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
            <button type="submit">register</button>
          </form>
          <Link to="/login">
            <div className="login_redirect">
              <span>Login into your account</span> <ArrowRightAltIcon />
            </div>
          </Link>
        </div>

        {message && (
          <span style={{ color: "green" }}>Registration successful.</span>
        )}
        {error && <span style={{ color: "red" }}>{errorMessage.message}</span>}
      </div>
    </div>
  );
};

export default Register;
