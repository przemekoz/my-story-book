"use client";
import { useState } from "react";

export const ModelsPage = () => {
  const [prompt, setPrompt] = useState(
    "a cute child character, illustrated in a children's book style, soft watercolor, pastel colors, clean outlines, disney style",
  );
  const [negativePrompt, setNegativePrompt] = useState(
    "realistic, photo, ugly, distorted",
  );
  const [results, setResults] = useState<{ model: string; image: string }[]>(
    [],
  );
  const [loading, setLoading] = useState(false);

  const models = [
    "fofr-face-to-many",
    "openai-gpt-image-2",
    "zsxkib-instant-id",
    "zsxkib-instant-id-ipadapter-plus-face",
    "lucataco-ip-adapter-faceid",
    "lucataco-ip_adapter-sdxl-face",
  ];

  const handleGenerate = async (model: string) => {
    if (!prompt) return;
    setLoading(true);

    const formData = new FormData();

    formData.append("prompt", prompt);
    formData.append("negativePrompt", negativePrompt);

    const res = await fetch(`/api/model/${model}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    const response = { model, ...data };

    setResults((prev) => [...prev, ...response]);
    setLoading(false);
  };

  console.log(Object.entries(results), results);

  return (
    <main style={{ padding: 20 }}>
      <h1>AI Image Comparison</h1>
      <b>Original (uploaded) image:</b>
      <br />
      <img
        src="https://lawliberty.org/app/uploads/2023/07/telly-savalas-kojak-color-5c01fb5e46e0fb000161404f-e1690400615286-1060x530.jpg"
        alt="Kojak's face"
        width="256"
      />
      <br />
      <br />
      <b>Prompt:</b>
      <br />
      <textarea
        placeholder="Enter prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", height: 100 }}
      />
      <b>Negative prompt:</b>
      <br />
      <textarea
        placeholder="Enter negative prompt..."
        value={negativePrompt}
        onChange={(e) => setNegativePrompt(e.target.value)}
        style={{ width: "100%", height: 100 }}
        rows={2}
      />
      <div style={{ display: "flex", gap: ".5rem" }}>
        {models.map((model) => (
          <button
            style={{ height: "80px", fontSize: "12px" }}
            key={model}
            onClick={() => handleGenerate(model)}
            disabled={loading}
          >
            {model}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 20,
          flexDirection: "column",
        }}
      >
        {results.map((item) => (
          <div key={item.model}>
            <h3>Model: {item.model}</h3>
            <img src={item.image} width={512} alt="generated" />
          </div>
        ))}
      </div>
    </main>
  );
};
