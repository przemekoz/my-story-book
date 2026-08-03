import { ReactNode } from "react";

interface Props {
  questions: string[];
  placeholders: string[];
  values: string[];
  title: string;
  description: string;
  changeAnswerCallback: (
    index: number,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
  disabled: boolean;
}
export const Step = ({
  questions,
  changeAnswerCallback,
  title,
  description,
  children,
  values,
  disabled,
  placeholders,
}: Props) => {
  return (
    <div className="form-card flex-column justify-content-between background-light-pink padding-lg box-shadow-container border-radius-md">
      <div className="question-container">
        <h3>{title}</h3>
        <p>{description}</p>
        {questions.map((question, index) => (
          <div key={question} className="form-group">
            <label htmlFor="answer">{question}</label>
            <input
              id="answer"
              type="text"
              disabled={disabled}
              onChange={changeAnswerCallback(index)}
              placeholder={placeholders[index]}
              value={values[index]}
            />
          </div>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
};
