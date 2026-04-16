import { useState } from "react";

interface Props {
  title: string[];
  imageUrl: string[];
}
export const Preview = ({ title, imageUrl }: Props) => {
  const imageSrcLength = imageUrl.length;
  const [index, setIndex] = useState(0);

  const back = () => {
    setIndex((prev) => Math.max(0, prev - 1));
  };

  const next = () => {
    setIndex((prev) => Math.min(imageSrcLength - 1, prev + 1));
  };

  return (
    <div className="flex-column justify-content-center align-items-center background-light-pink padding-lg box-shadow-container border-radius-md">
      <h3>{title[index]}</h3>

      <div className="page-container">
        <div
          className="flex justify-content-center align-items-center"
          style={{ gap: "2rem" }}
        >
          <button onClick={back} disabled={index === 0}>
            Back
          </button>
          <img
            src={imageUrl[index]}
            width={512}
            height={512}
            alt={`for: ${title[index]}`}
          />
          <button onClick={next} disabled={index + 1 === imageSrcLength}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
