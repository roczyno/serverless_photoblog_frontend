import "./image.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";

const Image = () => {
  return (
    <div className="image">
      <div className="container">
        <div className="top">
          <img
            src="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1937&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="bottom">
          <ShareIcon className="icon" />
          <DeleteIcon className="icon" />
        </div>
      </div>
    </div>
  );
};

export default Image;
