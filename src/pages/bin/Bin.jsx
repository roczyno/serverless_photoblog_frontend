import { useEffect, useState } from "react";
import Image from "../../components/image/Image";
import "./bin.scss";
import axios from "axios";

const Bin = () => {
  const jwt = JSON.parse(localStorage.getItem("userData")).idToken;
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getAllImages = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/images/recycled`, {
          headers: {
            Authorization: `${jwt}`,
          },
        });
        console.log(res.data);
        setImages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllImages();
  }, [BASE_URL, jwt]);
  return (
    <div className="bin">
      {images.map((img) => (
        <Image
          key={img.imageId}
          src={img.imageUrl}
          type="recycled"
          showActions={true}
          onDelete={() => console.log("Permanently deleting", img.id)}
          onRestore={() => console.log("Restoring", img.id)}
        />
      ))}
    </div>
  );
};

export default Bin;
