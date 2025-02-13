/* eslint-disable react/prop-types */
import "./image.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import RestoreIcon from "@mui/icons-material/Restore";

const Image = ({
  src,
  type,
  showActions = true,
  onDelete,
  onShare,
  onRestore,
}) => {
  return (
    <div className="image">
      <div className="container">
        <div className="top">
          <img src={src} alt="Uploaded" />
        </div>
        {showActions && (
          <div className="bottom">
            {type !== "recycled" && (
              <ShareIcon className="icon" onClick={onShare} />
            )}
            {type === "recycled" ? (
              <RestoreIcon className="icon" onClick={onRestore} />
            ) : null}
            <DeleteIcon className="icon" onClick={onDelete} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Image;
