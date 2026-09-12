"use client";

import { useState } from "react";

const QUESTIONS = [
  "What should the first image contain?",
  "What should the second image contain?",
  "What should the third image contain?",
];

type Step = "prompt" | "generating" | "preview" | "refine" | "finished";

export default function ImageFlow() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [step, setStep] = useState<Step>("prompt");

  const [prompt, setPrompt] = useState("");
  const [refinement, setRefinement] = useState("");

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Keep history of all generated images/prompts if you need it later.
  const [history, setHistory] = useState<
    {
      question: number;
      prompt: string;
      imageUrl: string;
    }[]
  >([]);

  async function generateImage(promptToGenerate: string, imageToEdit?: string) {
    setStep("generating");

    try {
      /*
       * Replace this with your API call.
       *
       * For example:
       *
       * const response = await fetch("/api/generate-image", {
       *   method: "POST",
       *   headers: {
       *     "Content-Type": "application/json",
       *   },
       *   body: JSON.stringify({
       *     prompt: promptToGenerate,
       *     imageUrl: imageToEdit,
       *   }),
       * });
       *
       * const data = await response.json();
       * const generatedImageUrl = data.imageUrl;
       */

      // MOCK
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const generatedImageUrl =
        "https://placehold.co/1024x1024?text=" +
        encodeURIComponent(promptToGenerate);

      setImageUrl(generatedImageUrl);

      setHistory((previous) => [
        ...previous,
        {
          question: questionIndex + 1,
          prompt: promptToGenerate,
          imageUrl: generatedImageUrl,
        },
      ]);

      setStep("preview");
    } catch (error) {
      console.error(error);
      setStep("prompt");
    }
  }

  async function handleInitialPrompt() {
    if (!prompt.trim()) return;

    await generateImage(prompt);
  }

  async function handleRefinement() {
    if (!refinement.trim() || !imageUrl) return;

    /*
     * Important:
     *
     * We send BOTH:
     *
     * 1. the existing image
     * 2. the user's requested change
     *
     * to the image generation API.
     */

    const refinementPrompt = `
Edit the provided image.

User requested:
${refinement}
`;

    await generateImage(refinementPrompt, imageUrl);

    setRefinement("");
  }

  function acceptImage() {
    const nextQuestion = questionIndex + 1;

    if (nextQuestion >= QUESTIONS.length) {
      setStep("finished");
      return;
    }

    // Move to next question
    setQuestionIndex(nextQuestion);

    // Reset question-specific state
    setPrompt("");
    setRefinement("");
    setImageUrl(null);

    setStep("prompt");
  }

  function startRefinement() {
    setRefinement("");
    setStep("refine");
  }

  if (step === "finished") {
    return (
      <main>
        <h1>Finished</h1>

        <p>All {QUESTIONS.length} questions have been completed.</p>

        <h2>Generated images</h2>

        {history.map((item, index) => (
          <div key={index}>
            <h3>Question {item.question}</h3>

            <p>{item.prompt}</p>

            <img
              src={item.imageUrl}
              alt={`Generated image ${index + 1}`}
              width={300}
            />
          </div>
        ))}
      </main>
    );
  }

  return (
    <main>
      <h1>
        Question {questionIndex + 1} / {QUESTIONS.length}
      </h1>

      {/* -------------------------------- */}
      {/* 1.1 / 2.1 / 3.1 ...              */}
      {/* -------------------------------- */}

      {step === "prompt" && (
        <section>
          <h2>{QUESTIONS[questionIndex]}</h2>

          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Describe what you want..."
            rows={6}
          />

          <br />

          <button onClick={handleInitialPrompt} disabled={!prompt.trim()}>
            Generate image
          </button>
        </section>
      )}

      {/* -------------------------------- */}
      {/* 1.2 / 2.2 / 3.2 ...              */}
      {/* -------------------------------- */}

      {step === "generating" && (
        <section>
          <h2>Generating image...</h2>

          {imageUrl && <img src={imageUrl} alt="Current image" width={400} />}

          <p>Please wait.</p>
        </section>
      )}

      {/* -------------------------------- */}
      {/* 1.3 / 2.3 / 3.3 ...              */}
      {/* -------------------------------- */}

      {step === "preview" && imageUrl && (
        <section>
          <h2>Generated image</h2>

          <img src={imageUrl} alt="Generated result" width={500} />

          <div>
            <h3>Are you happy with this image?</h3>

            <button onClick={startRefinement}>
              No, I want to change something
            </button>

            <button onClick={acceptImage}>Yes, continue</button>
          </div>
        </section>
      )}

      {/* -------------------------------- */}
      {/* 1.4.1.1 / 2.4.1.1 ...            */}
      {/* -------------------------------- */}

      {step === "refine" && (
        <section>
          <h2>What would you like to change?</h2>

          {imageUrl && <img src={imageUrl} alt="Current image" width={400} />}

          <br />

          <textarea
            value={refinement}
            onChange={(event) => setRefinement(event.target.value)}
            placeholder="Describe what should be changed..."
            rows={6}
          />

          <br />

          <button onClick={handleRefinement} disabled={!refinement.trim()}>
            Generate updated image
          </button>

          <button onClick={() => setStep("preview")}>Go back</button>
        </section>
      )}
    </main>
  );
}
