/* eslint-disable react/prop-types */
import "./image.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RestoreIcon from "@mui/icons-material/Restore";
import Tooltip from "@mui/material/Tooltip"; // Import Tooltip from Material-UI

const Image = ({
  src,
  type,
  owner,
  uploadDate,
  showActions = true,
  onDelete,
  onShare,
  onRestore,
}) => {
  return (
    <div className="image">
      <div className="container">
        {/* Image Display */}
        <div className="top">
          <img src={src} alt="Uploaded" />
        </div>

        {/* Bottom Section (Actions or Details) */}
        <div className="bottom">
          {showActions ? (
            <>
              {type !== "recycled" && (
                <Tooltip title="Copy Shareable Link">
                  <ContentCopyIcon className="icon" onClick={onShare} />
                </Tooltip>
              )}
              {type === "recycled" ? (
                <Tooltip title="Restore Image">
                  <RestoreIcon className="icon" onClick={onRestore} />
                </Tooltip>
              ) : null}
              <Tooltip title="Delete Image">
                <DeleteIcon className="icon" onClick={onDelete} />
              </Tooltip>
            </>
          ) : (
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  color: "#007bff",
                  fontSize: "1.1em",
                  marginBottom: "5px",
                }}
              >
                📸 Uploaded by: {owner}
              </p>
              <p
                style={{
                  fontSize: "0.9em",
                  color: "#666",
                  fontStyle: "italic",
                }}
              >
                🕒 Uploaded on: {uploadDate}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Image;
