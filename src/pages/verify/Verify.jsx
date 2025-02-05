import { useState } from "react";
import "./verify.scss";
import axios from "axios";

const Verify = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const handleVerification = async (e) => {
    try {
      e.preventDefault();
      console.log(email + code);
      const res = await axios.post(
        "https://x4wlipaom3.execute-api.eu-west-1.amazonaws.com/Prod/confirm",
        {
          email,
          code,
        }
      );
      console.log(res);
      console.log(email + code);
    } catch (error) {}
  };
  return (
    <div>
      <form onSubmit={handleVerification}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="verification code"
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">verify</button>
      </form>
    </div>
  );
};

export default Verify;
