import { useEffect, useState } from "react";
import { Step, steps } from "./steps";
import { Step as StepComponent } from "./Step";
import { Progress } from "../Progress/Progress";
import { Preview } from "../Preview/Preview";
import { preparePrompt } from "../../utils/preparePrompt";
import { MASTER_TEXT_PROMPT } from "../../conf";
import { summarizePrompt } from "../../utils/summarizePrompt";
import { ProgressPreview } from "../ProgressPreview/ProgressPreview";
import { generateImage } from "../../utils/generateImage";

export const CreateBook = () => {
  const [imageGenerating, setImageGenerating] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);

  const step: Step = steps[stepNumber];
  const stepsLength = steps.length;
  const initCurrentStepAnswers = new Array(step.questions.length).fill("");

  const [isPreview, setIsPreview] = useState(false);
  const [imageUrl, setImageUrl] = useState<string[]>(
    new Array(stepsLength).fill(""),
  );

  const [answers, setAnswers] = useState<string[][]>(
    new Array(stepsLength).fill([]),
  );

  const [currentStepAnswers, setCurrentStepAnswers] = useState<string[]>(
    initCurrentStepAnswers,
  );

  useEffect(() => {
    if (answers[stepNumber].length) {
      setCurrentStepAnswers(answers[stepNumber]);
    } else {
      setCurrentStepAnswers(initCurrentStepAnswers);
    }
  }, [stepNumber]);

  const handleChangeAnswer =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentStepAnswers((prev) => {
        const newAns = [...prev];
        newAns[index] = e.target.value;
        return newAns;
      });
    };

  const prevStep = () => {
    setStepNumber((prev) => Math.max(0, prev - 1));
  };

  const nextStep = async () => {
    setAnswers((prev) => {
      const newAns = [...prev];
      newAns[stepNumber] = currentStepAnswers;
      return newAns;
    });
    console.log("answers", answers[stepNumber]);
    setImageGenerating(true);

    const prompt = preparePrompt(
      step.basePrompt,
      MASTER_TEXT_PROMPT,
      step.questions,
      currentStepAnswers,
    );

    console.log("--- ORIGINAL PROMPT ---", prompt);
    console.log("--- PROMPT LENGTH ---", prompt.length);

    const imagePrompt =
      prompt.length < 1000 ? prompt : await summarizePrompt(prompt);

    if (prompt.length > 1000) {
      console.log("--- IMAGE PROMPT ---", imagePrompt);
      console.log("--- PROMPT LENGTH ---", imagePrompt.length);
    }

    const imageUrl = await generateImage(imagePrompt);
    // const imageUrl = "";
    setImageUrl((prev) => {
      const newUrl = [...prev];
      newUrl[stepNumber] = imageUrl;
      return newUrl;
    });

    setImageGenerating(false);
    setStepNumber((prev) => Math.min(stepsLength - 1, prev + 1));
    if (stepNumber + 1 === stepsLength) {
      setIsPreview(true);
    }
  };

  return (
    <>
      <Progress stepActive={stepNumber} steps={steps} />
      <ProgressPreview
        stepActive={stepNumber}
        stepsLength={stepsLength}
        imageGenerating={imageGenerating}
        imageUrl={imageUrl}
      />
      {isPreview === false && (
        <>
          <h1>Answer a few questions to bring the story to life.</h1>
          <StepComponent
            title={step.title}
            description={step.description}
            questions={step.questions}
            placeholders={step.placeholders}
            changeAnswerCallback={handleChangeAnswer}
            values={currentStepAnswers}
            disabled={imageGenerating}
          >
            <div className="controls">
              {stepNumber !== 0 && (
                <button onClick={prevStep} disabled={imageGenerating}>
                  Back
                </button>
              )}
              {stepNumber === 0 && <span></span>}
              {stepNumber + 1 < stepsLength && (
                <button onClick={nextStep} disabled={imageGenerating}>
                  Next
                </button>
              )}
              {stepNumber + 1 === stepsLength && (
                <button onClick={nextStep} disabled={imageGenerating}>
                  Preview
                </button>
              )}
            </div>
          </StepComponent>
        </>
      )}
      {isPreview && (
        <Preview title={steps.map((item) => item.title)} imageUrl={imageUrl} />
      )}
    </>
  );
};
