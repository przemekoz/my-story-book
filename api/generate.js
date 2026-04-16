export default async function handler(req, res) {
  //   const response = await fetch("https://api.openai.com/v1/images", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(req.body),
  //   });

  const response = {
    message: "OK",
  };

  const data = await response.json();
  res.status(200).json(data);
}
