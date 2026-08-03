import "./style.css";
import PlaceholderImage from "./placeholder.png";
import { Link } from "react-router-dom";

interface Props {
  stepsLength: number;
  imageGenerating: boolean;
  stepActive: number;
  imageUrl: string[];
}

export const ProgressPreview = ({
  stepActive,
  stepsLength,
  imageGenerating,
  imageUrl,
}: Props) => {
  const images = [];

  console.log("2", imageUrl);

  for (let i = 0; i < stepsLength; i++) {
    const img = imageUrl[i] ? (
      <Link target="_blank" to={`/image-preview?image=${imageUrl[i]}`}>
        <img
          className="general-image"
          src={imageUrl[i]}
          width={100}
          alt="preview"
        />
      </Link>
    ) : (
      <img
        className="general-image"
        src={PlaceholderImage}
        alt="placeholder for preview"
      />
    );

    const element =
      stepActive === i && imageGenerating ? (
        <div className="spinner"></div>
      ) : (
        img
      );
    images.push(<li key={i}>{element}</li>);
  }

  return <ol className="progress-preview-container">{images}</ol>;
};
