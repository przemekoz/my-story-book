const Busboy = require("busboy");

module.exports = async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const busboy = Busboy({ headers: req.headers });

    let prompt = "";
    let fileBuffer = null;
    let mimeType = "";

    const chunks = [];

    busboy.on("file", (fieldname, file, info) => {
      console.log("1", fieldname, file, info);
      mimeType = info.mimeType;

      file.on("data", (data) => {
        chunks.push(data);
      });

      file.on("end", () => {
        fileBuffer = Buffer.concat(chunks);
      });
    });

    // handle text fields
    busboy.on("field", (name, value) => {
      if (name === "prompt") {
        prompt = value;
      }
    });

    // when done
    busboy.on("finish", async () => {
      if (prompt) {
        const base64 = fileBuffer
          ? `data:${mimeType};base64,${fileBuffer.toString("base64")}`
          : "";
        console.log("prompt", prompt);

        const response = await fetch(
          "https://api.replicate.com/v1/predictions",
          {
            method: "POST",
            headers: {
              Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              version: "openai/gpt-image-2",
              input: {
                input_images: [
                  "https://lawliberty.org/app/uploads/2023/07/telly-savalas-kojak-color-5c01fb5e46e0fb000161404f-e1690400615286-1060x530.jpg",
                ],
                prompt,
                negative_prompt: "realistic, photo, ugly, distorted",
                num_inference_steps: 30,
                guidance_scale: 7.5,
              },
            }),
          },
        );

        let result = await response.json();

        console.log("INIT:", result);

        // 👉 3. poll
        while (result.status !== "succeeded" && result.status !== "failed") {
          await new Promise((r) => setTimeout(r, 1500));

          const poll = await fetch(
            `https://api.replicate.com/v1/predictions/${result.id}`,
            {
              headers: {
                Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
              },
            },
          );

          result = await poll.json();
        }

        if (result.status === "failed") {
          console.error(result);
          return res.status(500).json({ error: "Generation failed" });
        }

        return res.status(200).json({
          image: result.output[0],
        });
      }
    });

    req.pipe(busboy);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "openai Image generation failed",
    });
  }
};
