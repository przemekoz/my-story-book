import { Step } from "../CreateBook/steps";
import "./style.css";

interface Props {
  steps: Step[];
  stepActive: number;
}

export const Progress = ({ steps, stepActive }: Props) => {
  const dots = [];

  let index = 0;
  for (const { title } of steps) {
    dots.push(
      <li key={title} className="step-item">
        {/* Connector */}
        {index < steps.length - 1 && (
          <span
            className={`connector ${index < stepActive ? "done" : "pending"}`}
          ></span>
        )}

        {/* Dot */}
        <button
          //   onClick={() => setActive(i)}
          className={`dot ${
            index < stepActive
              ? "done"
              : index === stepActive
                ? "active"
                : "pending"
          }`}
        ></button>

        <span className="label">{title}</span>
      </li>,
    );
    index++;
  }

  return (
    <div className="stepper-wrapper">
      <ol className="stepper">{dots}</ol>
    </div>
  );
};
