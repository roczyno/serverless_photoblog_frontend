import { useEffect, useState } from "react";
import Image from "../../components/image/Image";
import "./bin.scss";
import axios from "axios";

const Bin = () => {
  const jwt = JSON.parse(localStorage.getItem("userData")).idToken;
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getAllImages = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/images/recycled`, {
          headers: {
            Authorization: `${jwt}`,
          },
        });
        setImages(res.data);
      } catch (error) {
        console.error("Error fetching recycled images:", error);
      } finally {
        setLoading(false); // Stop loading once the request completes
      }
    };
    getAllImages();
  }, [BASE_URL, jwt]);

  /** 🗑 Permanently Delete Image */
  const handleDelete = async (imageId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this image? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/images/${imageId}/permanent-delete`, {
        headers: {
          Authorization: `${jwt}`,
        },
      });

      // Remove image from state after successful deletion
      setImages((prevImages) =>
        prevImages.filter((img) => img.imageId !== imageId)
      );

      alert("Image permanently deleted!");
    } catch (error) {
      console.error("Error permanently deleting image:", error);
      alert("Failed to delete image. Please try again.");
    }
  };

  /** 🔄 Restore Image */
  const handleRestore = async (imageId) => {
    try {
      await axios.put(
        `${BASE_URL}/images/${imageId}/restore`,
        {},
        {
          headers: {
            Authorization: `${jwt}`,
          },
        }
      );

      // Remove restored image from state
      setImages((prevImages) =>
        prevImages.filter((img) => img.imageId !== imageId)
      );

      alert("Image restored successfully!");
    } catch (error) {
      console.error("Error restoring image:", error);
      alert("Failed to restore image. Please try again.");
    }
  };

  return (
    <div className="bin">
      {loading ? (
        <div className="loader">Loading images...</div> // Display loader while fetching
      ) : images.length === 0 ? (
        <p className="empty-message">No images in the bin.</p>
      ) : (
        images.map((img) => (
          <Image
            key={img.imageId}
            src={img.recycledImageUrl}
            type="recycled"
            showActions={true}
            onDelete={() => handleDelete(img.imageId)}
            onRestore={() => handleRestore(img.imageId)}
          />
        ))
      )}
    </div>
  );
};

export default Bin;
