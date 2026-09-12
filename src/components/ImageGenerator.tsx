import React, { useState } from "react";

import OpenAI from "openai";

export const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [generating, setGenerating] = useState(false);

  const generateImage = async () => {
    setGenerating(true);
    const client = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_KEY,
      dangerouslyAllowBrowser: true,
    });
    const result = await client.images.generate({
      // model: "gpt-image-1",
      prompt: `${prompt} in style of in`,
      size: "1024x1024",
    });
    setGenerating(false);
    setImageUrl(result?.data ? (result.data[0].url as string) : "");
  };

  return (
    <>
      <div className="form-card">
        <div className="form-group">
          <label htmlFor="prompt">Description of image (prompt)</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="put here description..."
          />
        </div>

        <button onClick={generateImage}>Generate an image</button>

        {generating && <div className="spinner"></div>}
      </div>
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </>
  );
};
