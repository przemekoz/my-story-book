export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    console.log(`sdxl prompt:`, req.body);
    const { prompt, image } = JSON.parse(req.body);
    console.log(`sdxl prompt:`, prompt, image);

    // upload image to temporary base64
    const buffer = Buffer.from(await image.arrayBuffer());
    const base64 = `data:image/png;base64,${buffer.toString("base64")}`;

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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "SDXL Image generation failed",
    });
  }
}
