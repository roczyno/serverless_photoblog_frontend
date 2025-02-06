import { useEffect, useState } from "react";
import Image from "../../components/image/Image";
import "./allImages.scss";
import axios from "axios";

const AllImages = () => {
  const jwt = JSON.parse(localStorage.getItem("userData")).idToken;
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [images, setImages] = useState([]);

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
      }
    };
    getAllImages();
  }, [BASE_URL, jwt]);
  return (
    <div className="allImages">
      <Image />
      <Image />
      <Image />
      <Image />
      <Image />
      <Image />
    </div>
  );
};

export default AllImages;
