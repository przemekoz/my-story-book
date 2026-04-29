import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    console.log(`dalle prompt:`, req.body);
    const { prompt } = JSON.parse(req.body);
    console.log(`dalle prompt:`, prompt);

    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "512x512",
    });

    const imageBase64 = result.data[0].b64_json;

    return res.status(200).json({
      image: `data:image/png;base64,${imageBase64}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Dalle Image generation failed",
    });
  }
}
