import { useState } from "react";
import "./upload.scss";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState("");

  // Convert image to Base64
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBase64(reader.result);
        setImage(URL.createObjectURL(file)); // Preview
      };
      reader.onerror = (error) => console.error("Error: ", error);
    }
  };

  // Send Base64 to Backend
  const handleUpload = async () => {
    if (!base64) return alert("Please select an image first");

    try {
      const response = await fetch("https://your-backend.com/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await response.json();
      alert(`Upload successful: ${data.message}`);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="upload">
      <div className="container">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {image && <img src={image} alt="Preview" className="preview" />}
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default Upload;
