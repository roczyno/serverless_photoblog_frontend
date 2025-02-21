import "./userImages.scss";
import Image from "../../components/image/Image";
import { useEffect, useState } from "react";
import axios from "axios";

const UserImages = () => {
  const jwt = JSON.parse(localStorage.getItem("userData")).idToken;
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getAllImages = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/images/user`, {
          headers: {
            Authorization: `${jwt}`,
          },
        });
        setImages(res.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    getAllImages();
  }, [BASE_URL, jwt]);

  /** 🗑 Delete Image Function */
  const handleDelete = async (imageId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/images/${imageId}/recycle`, {
        headers: {
          Authorization: `${jwt}`,
        },
      });

      // Remove image from state
      setImages((prevImages) =>
        prevImages.filter((img) => img.imageId !== imageId)
      );

      alert("Image moved to recycle bin successfully!");
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image. Please try again.");
    }
  };

  /** 🔗 Share Image Function (Fetch Shareable Link) */
  const handleShare = async (imageId) => {
    try {
      const res = await axios.get(`${BASE_URL}/image/${imageId}/share`, {
        headers: {
          Authorization: `${jwt}`,
        },
      });

      const shareableLink = res.data.presignedUrl;
      navigator.clipboard.writeText(shareableLink);
      alert("Shareable link copied to clipboard!");
    } catch (error) {
      console.error("Error fetching shareable link:", error);
      alert("Failed to generate shareable link.");
    }
  };

  return (
    <div className="userImages">
      {images.length === 0 ? (
        <div>
          <p>You havent added any images yet</p>
        </div>
      ) : (
        images.map((img) => (
          <Image
            key={img.imageId}
            src={img.imageUrl}
            type="user"
            showActions={true}
            onDelete={() => handleDelete(img.imageId)}
            onShare={() => handleShare(img.imageId)}
          />
        ))
      )}
    </div>
  );
};

export default UserImages;
