const OpenAI = require("openai");
const Busboy = require("busboy");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const busboy = Busboy({ headers: req.headers });

    let prompt = "";

    // handle text fields
    busboy.on("field", (name, value) => {
      if (name === "prompt") {
        prompt = value;
      }
    });

    // when done
    busboy.on("finish", async () => {
      console.log("Prompt:", prompt);

      if (prompt) {
        const result = await client.images.generate({
          model: "gpt-image-1",
          prompt,
          size: "1024x1024",
        });

        const imageBase64 = result.data[0].b64_json;

        return res.status(200).json({
          image: `data:image/png;base64,${imageBase64}`,
        });
      }
    });

    req.pipe(busboy);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Dalle Image generation failed",
    });
  }
};
