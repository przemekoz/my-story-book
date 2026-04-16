import { useState } from "react";

export const AboutPage = () => {
  const [image, setImage] = useState(null);

  const test = async () => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: "cat astronaut" }),
    });

    const data = await response.json();
    setImage(data.image);
  };

  return (
    <>
      About page <button onClick={test}>test /api/generate</button>
      {image && <img src={image} alt="" />}
    </>
  );
};
