"use client";
import { Record } from "openai/internal/builtin-types";
import { useState } from "react";

export const ModelsPage = () => {
  const [image, setImage] = useState<Blob | string>("");
  const [prompt, setPrompt] = useState(
    "a cute child character, illustrated in a children's book style, soft watercolor, pastel colors, clean outlines, disney style",
  );
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);

    // const models = ["dalle", "sdxl"];
    const models = ["sdxl"];

    const formData = new FormData();

    formData.append("image", image);
    formData.append("prompt", prompt);

    const responses = await Promise.all(
      models.map(async (model) => {
        const res = await fetch(`/api/model/${model}`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        return { model, ...data };
      }),
    );

    const mapped: Record<string, string> = {};
    responses.forEach((r) => {
      mapped[r.model] = r.image;
    });

    setResults(mapped);
    setLoading(false);
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>AI Image Comparison</h1>

      <input
        type="file"
        onChange={(e: any) => {
          setImage(e.target.files[0]);
        }}
      />

      <textarea
        placeholder="Enter prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", height: 100 }}
      />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        {Object.entries(results).map(([model, url]) => (
          <div key={model}>
            <h3>{model}</h3>
            <img src={url as string} width={512} alt="generated" />
          </div>
        ))}
      </div>
    </main>
  );
};
