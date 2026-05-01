const Busboy = require("busboy");

module.exports = async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const busboy = Busboy({ headers: req.headers });

    let prompt = "";
    let fileBuffer = null;
    let mimeType = "";

    const chunks = [];

    busboy.on("file", (fieldname, file, info) => {
      mimeType = info.mimeType;

      file.on("data", (data) => {
        chunks.push(data);
      });

      file.on("end", () => {
        fileBuffer = Buffer.concat(chunks);
      });
    });

    busboy.on("field", (name, value) => {
      if (name === "prompt") prompt = value;
    });

    busboy.on("finish", async () => {
      const base64 = `data:${mimeType};base64,${fileBuffer.toString("base64")}`;

      const response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version: "stability-ai/sdxl", // use latest version ID in real app
          input: {
            prompt,
            image: base64,
            strength: 0.7,
            width: 512,
            height: 512,
          },
        }),
      });

      const prediction = await response.json();

      // polling (simple version)
      let result = prediction;
      while (result.status !== "succeeded") {
        await new Promise((r) => setTimeout(r, 1500));

        const poll = await fetch(
          `https://api.replicate.com/v1/predictions/${prediction.id}`,
          {
            headers: {
              Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
            },
          },
        );

        result = await poll.json();
      }

      return Response.json({
        image: result.output[0],
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "SDXL Image generation failed",
    });
  }
};
