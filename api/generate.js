// export default async function handler(req, res) {
//   const response = await fetch("https://api.openai.com/v1/images", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.VITE_OPENAI_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: { prompt: "cat astronaut" },
//   });

//   const data = await response.json(response);
//   console.log("!", data);
//   res.status(200).json(response);
// }

import OpenAI from "openai";

export default async function handler(req, res) {
  const client = new OpenAI({
    apiKey: process.env.VITE_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
  });

  const result = await client.images.generate({
    // model: "gpt-image-1",
    prompt: "cat astronaut",
    size: "1024x1024",
  });
  return result?.data ? result.data[0].url : "";
}
