export default async function handler(req, res) {
  const response = await fetch("https://api.openai.com/v1/images", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.VITE_OPENAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: { prompt: "cat astronaut" },
  });

  const data = await response.json(response);
  console.log("!", data);
  res.status(200).json(response);
}
