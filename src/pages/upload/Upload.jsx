import { useState, useRef } from "react";
import axios from "axios";
import { UploadCloud, X } from "lucide-react";
import "./upload.scss";
import { useNavigate } from "react-router";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState("");
  const [uploadStatus, setUploadStatus] = useState("idle");
  const fileInputRef = useRef(null);
  // const userData = JSON.parse(localStorage.getItem("userData"));
  // const user = userData ? userData.user : null;
  const jwt = JSON.parse(localStorage.getItem("userData")).idToken;
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBase64(reader.result);
        setImage(URL.createObjectURL(file));
        setUploadStatus("idle");
      };
      reader.onerror = (error) => {
        console.error("Error: ", error);
        setUploadStatus("error");
      };
    }
  };

  const handleUpload = async () => {
    if (!base64) return;

    setUploadStatus("uploading");
    try {
      const response = await axios.post(
        "https://x4wlipaom3.execute-api.eu-west-1.amazonaws.com/Prod/image/upload",
        base64,
        {
          headers: {
            Authorization: `${jwt}`,
            "Content-Type": "text/plain",
          },
        }
      );

      console.log("Upload response:", response.data);
      console.log("this is base64", base64);
      setUploadStatus("success");
      navigate("/all");
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("error");
    }
  };

  const clearImage = () => {
    setImage(null);
    setBase64("");
    setUploadStatus("idle");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="upload">
      <div className="upload-container">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />

        <div onClick={triggerFileInput} className="upload-dropzone">
          {image ? (
            <div className="image-preview">
              <img src={image} alt="Preview" className="preview-image" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearImage();
                }}
                className="clear-button"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <div className="upload-placeholder">
              <UploadCloud size={48} className="upload-icon" />
              <p className="upload-text">
                Drag and drop or <span className="browse-text">browse</span> to
                upload
              </p>
            </div>
          )}
        </div>

        {image && (
          <div className="upload-actions">
            <button
              onClick={handleUpload}
              disabled={uploadStatus === "uploading"}
              className={`upload-button ${
                uploadStatus === "uploading" ? "uploading" : ""
              }`}
            >
              {uploadStatus === "uploading" ? "Uploading..." : "Upload Image"}
            </button>

            {uploadStatus === "success" && (
              <div className="status-message success">Upload successful!</div>
            )}

            {uploadStatus === "error" && (
              <div className="status-message error">
                Upload failed. Please try again.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
