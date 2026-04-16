import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { prompt } = req.body || {};

    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt: prompt || "cat astronaut",
      size: "1024x1024",
    });

    return res.status(200).json({
      image: result.data[0].url,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Image generation failed",
    });
  }
}
