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
        console.log(res.data);
        setImages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllImages();
  }, [BASE_URL, jwt]);
  return (
    <div className="userImages">
      {images.map((img) => (
        <Image
          key={img.imageId}
          src={img.imageUrl}
          type="user"
          showActions={true}
          onDelete={() => console.log("Deleting", img.id)}
          onShare={() => console.log("Sharing", img.id)}
        />
      ))}
    </div>
  );
};

export default UserImages;
