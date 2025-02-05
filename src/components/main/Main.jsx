import { Link } from "react-router";
import "./main.scss";

const Main = () => {
  return (
    <div className="main">
      <div className="text">
        <h1>Explore your Capture</h1>
        <p>Share your capture with Photo Gallery</p>
        <Link to="/register">
          <button>Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default Main;
