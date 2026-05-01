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
        const base64 = `data:${mimeType};base64,${fileBuffer.toString("base64")}`;

        console.log("image", base64);
        console.log("prompt", prompt);
        return res.status(200).json({
          image: `ok`,
        });
      }
    });

    req.pipe(busboy);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "sdxl Image generation failed",
    });
  }
};
