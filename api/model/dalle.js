const OpenAI = require("openai");

module.exports = function handler(req, res) {
    try {
      if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
      }
      const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
  
      const { prompt } = JSON.parse(req.body);
  
      const result = await client.images.generate({
        model: "gpt-image-1",
        prompt,
        size: "1024x1024",
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
};
