import { useEffect, useState } from "react";
import Image from "../../components/image/Image";
import "./allImages.scss";
import axios from "axios";

const AllImages = () => {
  const jwt = JSON.parse(localStorage.getItem("userData")).idToken;
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getAllImages = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/images`, {
          headers: {
            Authorization: `${jwt}`,
          },
        });
        console.log(res.data);
        setImages(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };
    getAllImages();
  }, [BASE_URL, jwt]);

  return (
    <div className="allImages">
      {loading ? (
        <div className="loader">Loading images...</div> // You can replace this with a spinner component
      ) : images.length === 0 ? (
        <div>
          <p>No Images have been uploaded</p>
        </div>
      ) : (
        images.map((img) => (
          <Image
            key={img.imageId}
            src={img.imageUrl}
            owner={img.firstName + " " + img.lastName}
            uploadDate={img.uploadDate}
            type="all"
            showActions={false}
          />
        ))
      )}
    </div>
  );
};

export default AllImages;
