const Busboy = require("busboy");

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
